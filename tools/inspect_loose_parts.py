from pathlib import Path

import bpy
from mathutils import Vector


ROOT = Path(__file__).resolve().parents[1]
INPUT = ROOT / "src" / "assets" / "models" / "neko-mask-character.glb"

bpy.ops.object.select_all(action="SELECT")
bpy.ops.object.delete()
bpy.ops.import_scene.gltf(filepath=str(INPUT))

meshes = [obj for obj in bpy.context.scene.objects if obj.type == "MESH"]
if not meshes:
    raise RuntimeError("No mesh found")

bpy.ops.object.select_all(action="DESELECT")
mesh = meshes[0]
mesh.select_set(True)
bpy.context.view_layer.objects.active = mesh
bpy.ops.object.mode_set(mode="EDIT")
bpy.ops.mesh.select_all(action="SELECT")
bpy.ops.mesh.separate(type="LOOSE")
bpy.ops.object.mode_set(mode="OBJECT")

parts = []
for obj in [obj for obj in bpy.context.scene.objects if obj.type == "MESH"]:
    world = obj.matrix_world
    points = [world @ Vector(corner) for corner in obj.bound_box]
    min_v = Vector((min(p.x for p in points), min(p.y for p in points), min(p.z for p in points)))
    max_v = Vector((max(p.x for p in points), max(p.y for p in points), max(p.z for p in points)))
    size = max_v - min_v
    center = (min_v + max_v) * 0.5
    parts.append(
        {
            "name": obj.name,
            "vertices": len(obj.data.vertices),
            "center": [round(center.x, 3), round(center.y, 3), round(center.z, 3)],
            "size": [round(size.x, 3), round(size.y, 3), round(size.z, 3)],
        }
    )

parts.sort(key=lambda item: item["vertices"], reverse=True)
print({"count": len(parts), "top": parts[:30]})
