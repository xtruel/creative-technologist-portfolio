"""Make everything outside the white glow ring transparent, keeping the circle
and its interior. Uses a geometric circular alpha mask (not colour keying) so
the dark areas inside the portrait are preserved."""
from pathlib import Path
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public" / "assets" / "images" / "ChatGPT Image Jun 28, 2026, 12_14_11 AM.png"
OUT = ROOT / "public" / "assets" / "images" / "eugenio_avatar_v2.png"
OUT_SRC = ROOT / "src" / "assets" / "images" / "eugenio_avatar_v2.png"

img = Image.open(SRC).convert("RGBA")
w, h = img.size
arr = np.asarray(img).astype(np.float32)
lum = arr[:, :, :3].mean(axis=2)
cx, cy = (w - 1) / 2.0, (h - 1) / 2.0

# Find the outer edge of the bright glow ring by scanning inward from each side
# along the centre lines; the first bright pixel is the outermost glow edge.
THRESH = 110
mid_y, mid_x = int(round(cy)), int(round(cx))
radii = []
row = lum[mid_y, :]
col = lum[:, mid_x]
# right
xs = np.where(row[mid_x:] > THRESH)[0]
if len(xs):
    radii.append(xs.max())  # distance from centre to furthest bright pixel right
# left
xs = np.where(row[:mid_x] > THRESH)[0]
if len(xs):
    radii.append(mid_x - xs.min())
# down
ys = np.where(col[mid_y:] > THRESH)[0]
if len(ys):
    radii.append(ys.max())
# up
ys = np.where(col[:mid_y] > THRESH)[0]
if len(ys):
    radii.append(mid_y - ys.min())

R = (max(radii) if radii else min(w, h) / 2.0) + 2.0
R = min(R, min(w, h) / 2.0)  # never exceed the image

yy, xx = np.mgrid[0:h, 0:w]
dist = np.sqrt((xx - cx) ** 2 + (yy - cy) ** 2)
feather = 1.5
alpha = np.clip((R - dist) / feather + 0.5, 0.0, 1.0) * 255.0

out = arr.copy()
out[:, :, 3] = np.minimum(out[:, :, 3], alpha)
Image.fromarray(out.astype(np.uint8), "RGBA").save(OUT)
Image.fromarray(out.astype(np.uint8), "RGBA").save(OUT_SRC)
print(f"size={w}x{h} detected_R={max(radii) if radii else 'n/a'} used_R={R:.1f} -> {OUT.name}")
