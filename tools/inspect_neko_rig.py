from pathlib import Path

import bpy


ROOT = Path(__file__).resolve().parents[1]
INPUT = ROOT / "src" / "assets" / "models" / "neko-mask-character-rigged.glb"

bpy.ops.object.select_all(action="SELECT")
bpy.ops.object.delete()
bpy.ops.import_scene.gltf(filepath=str(INPUT))

meshes = [obj for obj in bpy.context.scene.objects if obj.type == "MESH"]
armatures = [obj for obj in bpy.context.scene.objects if obj.type == "ARMATURE"]
actions = [action.name for action in bpy.data.actions]
armature_modifiers = [
    modifier.name
    for mesh in meshes
    for modifier in mesh.modifiers
    if modifier.type == "ARMATURE"
]

print(
    {
        "meshes": [mesh.name for mesh in meshes],
        "armatures": [armature.name for armature in armatures],
        "actions": actions,
        "armature_modifiers": armature_modifiers,
        "vertex_groups": len(meshes[0].vertex_groups) if meshes else 0,
    }
)
