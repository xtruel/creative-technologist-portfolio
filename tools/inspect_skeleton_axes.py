"""Import the skeleton GLB and print each bone's world-space rest orientation
so we can author clean, roll-independent animations."""
from pathlib import Path
import bpy

ROOT = Path(__file__).resolve().parents[1]
INPUT = ROOT / "public" / "assets" / "models" / "neko-mask-character-skeleton.glb"

bpy.ops.object.select_all(action="SELECT")
bpy.ops.object.delete()
bpy.ops.import_scene.gltf(filepath=str(INPUT))

arm = next(o for o in bpy.context.scene.objects if o.type == "ARMATURE")
meshes = [o for o in bpy.context.scene.objects if o.type == "MESH"]
print("ARMATURE:", arm.name, "world_matrix:")
print(arm.matrix_world)
print("MESHES:", [(m.name, len(m.vertex_groups)) for m in meshes])
print("ACTIONS:", [a.name for a in bpy.data.actions])

names = [
    "root", "body", "body_top0", "body_top1", "neck", "head",
    "shoulder_left", "arm_left_top", "arm_left_bot", "arm_left_hand",
    "shoulder_right", "arm_right_top", "arm_right_bot", "arm_right_hand",
    "leg_left_top", "leg_left_bot", "leg_left_foot",
    "leg_right_top", "leg_right_bot", "leg_right_foot",
]
mw = arm.matrix_world
for n in names:
    b = arm.data.bones.get(n)
    if not b:
        print(f"{n:16} MISSING")
        continue
    head = mw @ b.head_local
    tail = mw @ b.tail_local
    d = (tail - head)
    dl = d.length or 1.0
    d = d / dl
    print(f"{n:16} dir_world=({d.x:+.2f},{d.y:+.2f},{d.z:+.2f}) head=({head.x:+.2f},{head.y:+.2f},{head.z:+.2f})")
