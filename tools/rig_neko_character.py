import math
from pathlib import Path

import bpy
from mathutils import Vector


ROOT = Path(__file__).resolve().parents[1]
INPUT = ROOT / "src" / "assets" / "models" / "neko-mask-character.glb"
OUTPUT = ROOT / "src" / "assets" / "models" / "neko-mask-character-rigged.glb"
BLEND_OUTPUT = ROOT / "src" / "assets" / "models" / "neko-mask-character-rigged.blend"


def clear_scene():
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete()


def import_model():
    bpy.ops.import_scene.gltf(filepath=str(INPUT))
    meshes = [obj for obj in bpy.context.scene.objects if obj.type == "MESH"]
    if not meshes:
        raise RuntimeError("No mesh found in GLB")

    model = meshes[0]
    bpy.context.view_layer.objects.active = model
    model.select_set(True)
    bpy.ops.object.transform_apply(location=False, rotation=True, scale=True)
    return model


def normalized_bounds(obj):
    world = obj.matrix_world
    points = [world @ Vector(corner) for corner in obj.bound_box]
    min_v = Vector((min(p.x for p in points), min(p.y for p in points), min(p.z for p in points)))
    max_v = Vector((max(p.x for p in points), max(p.y for p in points), max(p.z for p in points)))
    size = max_v - min_v
    return min_v, max_v, size


def make_armature(model):
    min_v, max_v, size = normalized_bounds(model)
    cx = (min_v.x + max_v.x) * 0.5
    cy = (min_v.y + max_v.y) * 0.5
    z_min = min_v.z

    def p(x, y, z):
        return (cx + size.x * x, cy + size.y * y, z_min + size.z * z)

    bpy.ops.object.armature_add(enter_editmode=True, location=(0, 0, 0))
    armature = bpy.context.object
    armature.name = "Neko_Mask_Rig"
    armature.data.name = "Neko_Mask_Armature"
    armature.show_in_front = True

    edit_bones = armature.data.edit_bones
    root = edit_bones[0]
    root.name = "root"
    root.head = p(0, 0, 0.02)
    root.tail = p(0, 0, 0.18)

    def bone(name, head, tail, parent=None, connected=False):
        b = edit_bones.new(name)
        b.head = head
        b.tail = tail
        if parent:
            b.parent = edit_bones[parent]
            b.use_connect = connected
        return b

    bone("hips", p(0, 0, 0.18), p(0, 0, 0.34), "root")
    bone("spine", p(0, 0, 0.34), p(0, 0, 0.54), "hips")
    bone("chest", p(0, 0, 0.54), p(0, 0, 0.70), "spine")
    bone("neck", p(0, 0, 0.70), p(0, 0, 0.78), "chest")
    bone("head", p(0, 0, 0.78), p(0, 0, 0.98), "neck")

    bone("upper_arm.L", p(-0.18, 0, 0.66), p(-0.34, 0, 0.62), "chest")
    bone("forearm.L", p(-0.34, 0, 0.62), p(-0.48, 0, 0.58), "upper_arm.L", True)
    bone("hand.L", p(-0.48, 0, 0.58), p(-0.56, 0, 0.56), "forearm.L", True)
    bone("upper_arm.R", p(0.18, 0, 0.66), p(0.34, 0, 0.62), "chest")
    bone("forearm.R", p(0.34, 0, 0.62), p(0.48, 0, 0.58), "upper_arm.R", True)
    bone("hand.R", p(0.48, 0, 0.58), p(0.56, 0, 0.56), "forearm.R", True)

    bone("thigh.L", p(-0.09, 0, 0.28), p(-0.12, 0, 0.14), "hips")
    bone("shin.L", p(-0.12, 0, 0.14), p(-0.12, 0, 0.04), "thigh.L", True)
    bone("foot.L", p(-0.12, 0, 0.04), p(-0.16, -0.09, 0.02), "shin.L", True)
    bone("thigh.R", p(0.09, 0, 0.28), p(0.12, 0, 0.14), "hips")
    bone("shin.R", p(0.12, 0, 0.14), p(0.12, 0, 0.04), "thigh.R", True)
    bone("foot.R", p(0.12, 0, 0.04), p(0.16, -0.09, 0.02), "shin.R", True)

    bone("tail.001", p(0.06, -0.10, 0.34), p(0.15, -0.18, 0.42), "hips")
    bone("tail.002", p(0.15, -0.18, 0.42), p(0.22, -0.22, 0.50), "tail.001", True)
    bone("tail.003", p(0.22, -0.22, 0.50), p(0.24, -0.18, 0.58), "tail.002", True)

    bpy.ops.object.mode_set(mode="OBJECT")
    return armature


def bind_model(model, armature):
    model.parent = armature

    for group in list(model.vertex_groups):
        model.vertex_groups.remove(group)

    group_names = [
        "hips",
        "spine",
        "chest",
        "neck",
        "head",
        "upper_arm.L",
        "forearm.L",
        "hand.L",
        "upper_arm.R",
        "forearm.R",
        "hand.R",
        "thigh.L",
        "shin.L",
        "foot.L",
        "thigh.R",
        "shin.R",
        "foot.R",
        "tail.001",
        "tail.002",
        "tail.003",
    ]
    groups = {name: model.vertex_groups.new(name=name) for name in group_names}
    min_v, max_v, size = normalized_bounds(model)

    def norm(vertex):
        world = model.matrix_world @ vertex.co
        return (
            (world.x - min_v.x) / size.x if size.x else 0.5,
            (world.y - min_v.y) / size.y if size.y else 0.5,
            (world.z - min_v.z) / size.z if size.z else 0.5,
        )

    def add(index, name, weight):
        groups[name].add([index], max(0.0, min(1.0, weight)), "ADD")

    for vertex in model.data.vertices:
        nx, ny, nz = norm(vertex)
        side_left = nx < 0.5
        side = abs(nx - 0.5) * 2

        if nz > 0.78:
            add(vertex.index, "head", 0.9)
            add(vertex.index, "neck", 0.1)
        elif nz > 0.69:
            add(vertex.index, "neck", 0.55)
            add(vertex.index, "head", 0.2)
            add(vertex.index, "chest", 0.25)
        elif side > 0.42 and nz > 0.43:
            suffix = ".L" if side_left else ".R"
            if side > 0.82:
                add(vertex.index, f"hand{suffix}", 0.72)
                add(vertex.index, f"forearm{suffix}", 0.28)
            elif side > 0.62:
                add(vertex.index, f"forearm{suffix}", 0.72)
                add(vertex.index, f"upper_arm{suffix}", 0.28)
            else:
                add(vertex.index, f"upper_arm{suffix}", 0.72)
                add(vertex.index, "chest", 0.28)
        elif nz < 0.33 and side > 0.16:
            suffix = ".L" if side_left else ".R"
            if nz < 0.08:
                add(vertex.index, f"foot{suffix}", 0.78)
                add(vertex.index, f"shin{suffix}", 0.22)
            elif nz < 0.18:
                add(vertex.index, f"shin{suffix}", 0.78)
                add(vertex.index, f"thigh{suffix}", 0.22)
            else:
                add(vertex.index, f"thigh{suffix}", 0.78)
                add(vertex.index, "hips", 0.22)
        elif ny < 0.28 and 0.32 < nz < 0.64 and nx > 0.46:
            if nz > 0.52:
                add(vertex.index, "tail.003", 0.76)
                add(vertex.index, "tail.002", 0.24)
            elif nz > 0.42:
                add(vertex.index, "tail.002", 0.76)
                add(vertex.index, "tail.001", 0.24)
            else:
                add(vertex.index, "tail.001", 0.76)
                add(vertex.index, "hips", 0.24)
        elif nz > 0.55:
            add(vertex.index, "chest", 0.78)
            add(vertex.index, "spine", 0.22)
        elif nz > 0.38:
            add(vertex.index, "spine", 0.72)
            add(vertex.index, "chest", 0.18)
            add(vertex.index, "hips", 0.1)
        else:
            add(vertex.index, "hips", 0.75)
            add(vertex.index, "spine", 0.25)

    modifier = model.modifiers.new("Neko_Mask_Rig", "ARMATURE")
    modifier.object = armature
    modifier.use_vertex_groups = True
    model["rig_note"] = "Generated by Codex via Blender manual region weights"


def set_pose_frame(armature, frame, transforms):
    bpy.context.view_layer.objects.active = armature
    armature.select_set(True)
    bpy.ops.object.mode_set(mode="POSE")

    for bone_name, rotation in transforms.items():
        bone = armature.pose.bones.get(bone_name)
        if not bone:
            continue
        bone.rotation_mode = "XYZ"
        bone.rotation_euler = tuple(math.radians(v) for v in rotation)
        bone.keyframe_insert(data_path="rotation_euler", frame=frame)

    armature.keyframe_insert(data_path="location", frame=frame)
    bpy.ops.object.mode_set(mode="OBJECT")


def make_action(armature, name, frames):
    action = bpy.data.actions.new(name)
    armature.animation_data_create()
    armature.animation_data.action = action

    for frame, transforms in frames:
        bpy.context.scene.frame_set(frame)
        set_pose_frame(armature, frame, transforms)

    if armature.animation_data.action:
        armature.animation_data.action.name = name
        nla_track = armature.animation_data.nla_tracks.new()
        nla_track.name = name
        strip = nla_track.strips.new(name, frames[0][0], armature.animation_data.action)
        strip.action_frame_start = frames[0][0]
        strip.action_frame_end = frames[-1][0]
        strip.repeat = 1
        strip.mute = False

    return action


def create_animations(armature):
    idle_a = {
        "spine": (2, 0, 0),
        "chest": (-2, 0, 1),
        "head": (0, 0, 0),
        "upper_arm.L": (0, 0, -8),
        "upper_arm.R": (0, 0, 8),
        "tail.001": (0, 8, 5),
        "tail.002": (0, 12, 8),
        "tail.003": (0, 18, 10),
    }
    idle_b = {
        "spine": (-2, 0, 0),
        "chest": (2, 0, -1),
        "head": (3, 4, 1),
        "upper_arm.L": (0, 0, 4),
        "upper_arm.R": (0, 0, -4),
        "tail.001": (0, -8, -5),
        "tail.002": (0, -12, -8),
        "tail.003": (0, -18, -10),
    }
    make_action(armature, "Idle", [(1, idle_a), (32, idle_b), (64, idle_a)])

    walk_a = {
        "spine": (-4, 0, 2),
        "head": (2, 0, -1),
        "upper_arm.L": (18, 0, 12),
        "upper_arm.R": (-18, 0, -12),
        "thigh.L": (20, 0, 0),
        "thigh.R": (-20, 0, 0),
        "tail.001": (0, 14, 8),
    }
    walk_b = {
        "spine": (-4, 0, -2),
        "head": (-1, 0, 1),
        "upper_arm.L": (-18, 0, -12),
        "upper_arm.R": (18, 0, 12),
        "thigh.L": (-20, 0, 0),
        "thigh.R": (20, 0, 0),
        "tail.001": (0, -14, -8),
    }
    make_action(armature, "Walk", [(1, walk_a), (18, walk_b), (36, walk_a)])

    victory = {
        "spine": (-3, 0, 0),
        "head": (-5, 0, 0),
        "upper_arm.L": (-55, 0, -80),
        "forearm.L": (-15, 0, -10),
        "upper_arm.R": (-55, 0, 80),
        "forearm.R": (-15, 0, 10),
        "tail.001": (0, 18, 12),
    }
    make_action(armature, "Victory", [(1, victory), (40, victory)])

    pointing = {
        "spine": (-4, 0, -5),
        "head": (0, -12, 0),
        "upper_arm.R": (-10, -8, -78),
        "forearm.R": (0, 0, -6),
        "upper_arm.L": (12, 0, 14),
        "tail.001": (0, -10, -5),
    }
    make_action(armature, "Pointing", [(1, pointing), (40, pointing)])

    armature.animation_data.action = bpy.data.actions.get("Idle")


def export_results():
    bpy.ops.wm.save_as_mainfile(filepath=str(BLEND_OUTPUT))
    bpy.ops.export_scene.gltf(
        filepath=str(OUTPUT),
        export_format="GLB",
        export_animations=True,
        export_nla_strips=True,
        export_materials="EXPORT",
    )


def main():
    clear_scene()
    model = import_model()
    armature = make_armature(model)
    bind_model(model, armature)
    create_animations(armature)
    export_results()


if __name__ == "__main__":
    main()
