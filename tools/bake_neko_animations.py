"""Bake clean humanoid animation clips onto the detailed neko skeleton rig.

The rig's bind pose is a T-pose with arms along world +/-X and legs down -Z
(Blender Z-up world). We pose bones with RIGID rotations about world axes, which
avoids the bone-roll/twist ambiguity that made hand-tuned JS rotations look
crooked. Each clip is named after the matching pose id so the viewer's
AnimationMixer can select it.
"""
import math
from pathlib import Path

import bpy
from mathutils import Vector, Matrix

ROOT = Path(__file__).resolve().parents[1]
INPUT = ROOT / "public" / "assets" / "models" / "neko-mask-character-skeleton.glb"
OUTPUT = ROOT / "public" / "assets" / "models" / "neko-mask-character-animated.glb"

# After Blender(Z-up) -> glTF(Y-up) export, the character FRONT (toward the
# three.js camera) is Blender -Y. Positive body-lean (+X rot) already tips the
# torso toward the front, so lean/tilt use plain positive signs; only the
# horizontal "point forward" needs the front = -Y direction baked in.

ORDER = [
    "root", "body", "body_top0", "body_top1", "body_top2", "neck", "head",
    "shoulder_left", "arm_left_top", "arm_left_bot",
    "shoulder_right", "arm_right_top", "arm_right_bot",
    "leg_left_top", "leg_left_bot", "leg_left_foot",
    "leg_right_top", "leg_right_bot", "leg_right_foot",
]
CONTROLLED = [n for n in ORDER if n != "root"]

AXES = {"X": Vector((1, 0, 0)), "Y": Vector((0, 1, 0)), "Z": Vector((0, 0, 1))}


# ---- pose builders (fill a dict: bone_name -> list of (axis_char, degrees)) ----

def set_leg(pd, side, hip, knee, out=0.0):
    # out spreads the thigh laterally (relaxed/seated look) via the front axis.
    yd = out if side == "left" else -out
    pd[f"leg_{side}_top"] = [("X", hip), ("Y", yd)]
    pd[f"leg_{side}_bot"] = [("X", hip + knee), ("Y", yd)]  # child carries parent rot


def set_arm(pd, side, mode, raise_deg=90, swing=0.0, elbow=0.0):
    # raise_deg controls how far the arm drops from the T-pose: 90 = straight
    # down, smaller = held further out from the body (A-pose / V-pose).
    top, bot = f"arm_{side}_top", f"arm_{side}_bot"
    if mode == "down":
        yd = raise_deg if side == "left" else -raise_deg
        pd[top] = [("Y", yd), ("X", swing)]
        pd[bot] = [("Y", yd), ("X", swing + elbow)]
    elif mode == "raise":  # arms up; raise_deg 90 = straight up, less = out (V)
        yd = -raise_deg if side == "left" else raise_deg
        pd[top] = [("Y", yd), ("X", swing)]
        pd[bot] = [("Y", yd), ("X", swing + elbow)]
    elif mode == "forward":  # extend the arm horizontally toward the front (-Y)
        zd = -90 if side == "left" else 90
        pd[top] = [("Z", zd), ("X", swing)]
        pd[bot] = [("Z", zd), ("X", swing + elbow)]


def body(pd, lean=0.0, twist=0.0):
    rl = []
    if lean:
        rl.append(("X", lean))  # +lean tips torso toward the front
    if twist:
        rl.append(("Z", twist))
    if rl:
        pd["body"] = rl


def head(pd, tilt=0.0, turn=0.0):
    rl = []
    if tilt:
        rl.append(("X", tilt))
    if turn:
        rl.append(("Z", turn))
    if rl:
        pd["head"] = rl


# ---- pose application via world-axis rigid rotation -------------------------

def apply_pose(arm, pd):
    A3i = arm.matrix_world.to_3x3().inverted()
    for n in CONTROLLED:
        pb = arm.pose.bones.get(n)
        if pb:
            pb.matrix_basis = Matrix.Identity(4)
    bpy.context.view_layer.update()

    for n in ORDER:
        if n not in pd:
            continue
        pb = arm.pose.bones[n]
        R = pb.bone.matrix_local.to_3x3()
        for ax, deg in pd[n]:
            axis_arm = (A3i @ AXES[ax]).normalized()
            R = Matrix.Rotation(math.radians(deg), 3, axis_arm) @ R
        head_now = pb.matrix.to_translation()  # posed head (follows parent)
        pb.matrix = Matrix.Translation(head_now) @ R.to_4x4()
        bpy.context.view_layer.update()


def make_action(arm, name, keys):
    action = bpy.data.actions.new(name)
    action.use_fake_user = True
    arm.animation_data_create()
    arm.animation_data.action = action
    for frame, pd in keys:
        bpy.context.scene.frame_set(frame)
        apply_pose(arm, pd)
        for n in CONTROLLED:
            pb = arm.pose.bones.get(n)
            if not pb:
                continue
            pb.rotation_mode = "QUATERNION"
            pb.keyframe_insert("rotation_quaternion", frame=frame)
    # loop-friendly interpolation
    for fc in action.fcurves:
        for kp in fc.keyframe_points:
            kp.interpolation = "BEZIER"
    return action


# ---- the eight clips --------------------------------------------------------

# Sign convention (verified via QA renders): front = -Y.
#   leg hip: NEGATIVE = thigh forward, POSITIVE = thigh back. knee adds (coaxial).
#   arm swing: NEGATIVE = forward, POSITIVE = back. elbow NEGATIVE = forward fold.
#   raise_deg < 90 holds the arm out from the body.

def walk():
    a = {}
    body(a, lean=5, twist=7)
    set_leg(a, "left", -24, 22); set_leg(a, "right", 24, 22)  # left fwd, right back
    set_arm(a, "left", "down", raise_deg=74, swing=20, elbow=-16)   # left arm back
    set_arm(a, "right", "down", raise_deg=74, swing=-20, elbow=-16)  # right arm fwd
    c = {}
    body(c, lean=5, twist=-7)
    set_leg(c, "left", 24, 22); set_leg(c, "right", -24, 22)
    set_arm(c, "left", "down", raise_deg=74, swing=-20, elbow=-16)
    set_arm(c, "right", "down", raise_deg=74, swing=20, elbow=-16)
    return [(1, a), (13, c), (25, a)]


def run():
    a = {}
    body(a, lean=26, twist=8)
    set_leg(a, "left", -42, 30); set_leg(a, "right", 40, 55)
    set_arm(a, "left", "down", raise_deg=78, swing=40, elbow=-100)  # bent, pumping
    set_arm(a, "right", "down", raise_deg=78, swing=-40, elbow=-100)
    c = {}
    body(c, lean=26, twist=-8)
    set_leg(c, "left", 40, 55); set_leg(c, "right", -42, 30)
    set_arm(c, "left", "down", raise_deg=78, swing=-40, elbow=-100)
    set_arm(c, "right", "down", raise_deg=78, swing=40, elbow=-100)
    return [(1, a), (9, c), (17, a)]


def jump():
    a = {}
    body(a, lean=-8)
    set_leg(a, "left", -50, 70); set_leg(a, "right", -46, 70)  # knees tucked fwd/up
    set_arm(a, "left", "raise", raise_deg=86, elbow=-14)
    set_arm(a, "right", "raise", raise_deg=86, elbow=-14)
    b = {}
    body(b, lean=-10)
    set_leg(b, "left", -56, 74); set_leg(b, "right", -52, 74)
    set_arm(b, "left", "raise", raise_deg=90, elbow=-16)
    set_arm(b, "right", "raise", raise_deg=90, elbow=-16)
    return [(1, a), (24, b), (48, a)]


def landing():
    a = {}
    body(a, lean=24)
    set_leg(a, "left", -55, 95); set_leg(a, "right", -55, 95)  # deep crouch
    set_arm(a, "left", "down", raise_deg=70, swing=-50, elbow=-24)  # arms fwd
    set_arm(a, "right", "down", raise_deg=70, swing=-50, elbow=-24)
    b = {}
    body(b, lean=21)
    set_leg(b, "left", -50, 90); set_leg(b, "right", -50, 90)
    set_arm(b, "left", "down", raise_deg=70, swing=-48, elbow=-22)
    set_arm(b, "right", "down", raise_deg=70, swing=-48, elbow=-22)
    return [(1, a), (24, b), (48, a)]


def sitting():
    # Seated: thighs forward to ~horizontal and spread, shins hanging down,
    # forearms resting forward on the thighs, torso reclined a touch.
    a = {}
    body(a, lean=-10)
    set_leg(a, "left", -90, 95, out=18); set_leg(a, "right", -90, 95, out=18)
    set_arm(a, "left", "down", raise_deg=66, swing=-42, elbow=-55)
    set_arm(a, "right", "down", raise_deg=66, swing=-42, elbow=-55)
    b = {}
    body(b, lean=-9)
    set_leg(b, "left", -90, 96, out=16); set_leg(b, "right", -90, 96, out=16)
    set_arm(b, "left", "down", raise_deg=66, swing=-44, elbow=-57)
    set_arm(b, "right", "down", raise_deg=66, swing=-44, elbow=-57)
    return [(1, a), (45, b), (90, a)]


def thinking():
    a = {}
    body(a, twist=-4)
    head(a, tilt=8, turn=6)
    set_leg(a, "left", 0, 4); set_leg(a, "right", 0, 4)
    set_arm(a, "left", "down", raise_deg=74, swing=-6, elbow=-16)
    set_arm(a, "right", "forward", swing=-22, elbow=-110)  # hand up to chin
    b = {}
    body(b, twist=-4)
    head(b, tilt=10, turn=6)
    set_leg(b, "left", 0, 4); set_leg(b, "right", 0, 4)
    set_arm(b, "left", "down", raise_deg=74, swing=-6, elbow=-16)
    set_arm(b, "right", "forward", swing=-24, elbow=-114)
    return [(1, a), (45, b), (90, a)]


def victory():
    a = {}
    body(a, twist=3)
    head(a, tilt=-5)
    set_leg(a, "left", 0, 4); set_leg(a, "right", 0, 4)
    set_arm(a, "left", "raise", raise_deg=70, elbow=-18)
    set_arm(a, "right", "raise", raise_deg=70, elbow=-18)
    b = {}
    body(b, twist=-3)
    head(b, tilt=-6)
    set_leg(b, "left", 0, 4); set_leg(b, "right", 0, 4)
    set_arm(b, "left", "raise", raise_deg=74, elbow=-22)
    set_arm(b, "right", "raise", raise_deg=74, elbow=-22)
    return [(1, a), (30, b), (60, a)]


def pointing():
    a = {}
    body(a, twist=-6)
    head(a, turn=-12)
    set_leg(a, "left", 0, 4); set_leg(a, "right", 0, 4)
    set_arm(a, "left", "down", raise_deg=72, swing=-6, elbow=-80)   # hand to waist
    set_arm(a, "right", "forward", swing=0, elbow=0)  # straight point forward
    b = {}
    body(b, twist=-6)
    head(b, turn=-12)
    set_leg(b, "left", 0, 4); set_leg(b, "right", 0, 4)
    set_arm(b, "left", "down", raise_deg=72, swing=-6, elbow=-80)
    set_arm(b, "right", "forward", swing=-3, elbow=2)
    return [(1, a), (45, b), (90, a)]


CLIPS = {
    "walk_cycle": walk, "run_sprint": run, "jump_airborne": jump,
    "landing": landing, "sitting_relax": sitting, "thinking": thinking,
    "victory": victory, "pointing": pointing,
}


def setup_qa_camera(mesh):
    """Front-facing orthographic camera matching the three.js view.
    three.js sees the model front, which is Blender -Y, so we look from -Y."""
    scene = bpy.context.scene
    # Workbench renders reliably headless (no GPU/EEVEE context needed).
    scene.render.engine = "BLENDER_WORKBENCH"
    scene.display.shading.light = "STUDIO"
    scene.display.shading.show_shadows = True
    scene.render.resolution_x = 420
    scene.render.resolution_y = 480
    scene.render.film_transparent = False

    world = bpy.data.worlds.new("qa_world")
    world.use_nodes = True
    bg = world.node_tree.nodes.get("Background")
    if bg:
        bg.inputs[0].default_value = (0.92, 0.92, 0.93, 1.0)
        bg.inputs[1].default_value = 1.0
    scene.world = world

    corners = [mesh.matrix_world @ Vector(c) for c in mesh.bound_box]
    minv = Vector((min(c.x for c in corners), min(c.y for c in corners), min(c.z for c in corners)))
    maxv = Vector((max(c.x for c in corners), max(c.y for c in corners), max(c.z for c in corners)))
    center = (minv + maxv) * 0.5
    size = maxv - minv
    max_dim = max(size.x, size.z)

    cam_data = bpy.data.cameras.new("qa_cam")
    cam_data.type = "ORTHO"
    cam_data.ortho_scale = max_dim * 1.25
    cam = bpy.data.objects.new("qa_cam", cam_data)
    cam.location = (center.x, minv.y - max_dim * 2.0, center.z)
    cam.rotation_euler = (math.radians(90), 0, 0)  # look toward +Y at the front
    scene.collection.objects.link(cam)
    scene.camera = cam

    for ang, e in [((50, 10, 30), 4.0), ((40, -40, -20), 2.0)]:
        ld = bpy.data.lights.new("qa_sun", "SUN")
        ld.energy = e
        lo = bpy.data.objects.new("qa_sun", ld)
        lo.rotation_euler = tuple(math.radians(a) for a in ang)
        scene.collection.objects.link(lo)


def render_qa(arm, mesh):
    qa_dir = ROOT / "tools" / "qa"
    qa_dir.mkdir(exist_ok=True)
    setup_qa_camera(mesh)
    for name in CLIPS:
        action = bpy.data.actions.get(name)
        arm.animation_data.action = action
        mid = int((action.frame_range[0] + action.frame_range[1]) / 2)
        bpy.context.scene.frame_set(mid)
        bpy.context.view_layer.update()
        bpy.context.scene.render.filepath = str(qa_dir / f"{name}.png")
        bpy.ops.render.render(write_still=True)
        print("QA RENDER:", name, "frame", mid)


def main():
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete()
    bpy.ops.import_scene.gltf(filepath=str(INPUT))

    arm = next(o for o in bpy.context.scene.objects if o.type == "ARMATURE")

    # remove any stray non-character meshes (e.g. leftover Icosphere)
    for o in list(bpy.context.scene.objects):
        if o.type == "MESH" and not o.name.startswith("Copilot3D"):
            bpy.data.objects.remove(o, do_unlink=True)
    mesh = next(o for o in bpy.context.scene.objects if o.type == "MESH")

    bpy.context.scene.frame_set(1)
    for name, fn in CLIPS.items():
        make_action(arm, name, fn())

    if "--qa" in __import__("sys").argv:
        render_qa(arm, mesh)
        return

    arm.animation_data.action = bpy.data.actions.get("walk_cycle")

    bpy.ops.export_scene.gltf(
        filepath=str(OUTPUT),
        export_format="GLB",
        export_animations=True,
        export_animation_mode="ACTIONS",
        export_materials="EXPORT",
        export_yup=True,
    )
    print("EXPORTED:", OUTPUT, "actions:", [a.name for a in bpy.data.actions])


if __name__ == "__main__":
    main()
