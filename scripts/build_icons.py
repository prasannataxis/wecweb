"""Usage: python scripts/build_icons.py  (source artwork lives in ../logo/)

Builds the favicon set from the crowned gold "W" of the WEC emblem (the full
emblem is unreadable at 16-32px): app/favicon.ico, app/icon.png, app/apple-icon.png.
"""
import os
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "..", "..", "logo", "Regal Wec Chauffeur Emblem.png")
APP = os.path.join(HERE, "..", "app")
BG = (11, 11, 11, 255)

src = Image.open(SRC).convert("RGB")
crop = np.asarray(src.crop((292, 104, 812, 610))).astype(np.float32) / 255.0

mx, mn = crop.max(axis=2), crop.min(axis=2)
sat = np.where(mx > 1e-3, (mx - mn) / np.maximum(mx, 1e-3), 0)
lum = crop.mean(axis=2)
# keep the gold W + crown; drop the silver "e" and the black background
gold = np.clip((sat - 0.05) / 0.07, 0, 1)
gold = np.maximum(gold, np.clip((lum - 0.82) / 0.1, 0, 1))
gold = np.asarray(Image.fromarray((gold * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(3))).astype(np.float32) / 255.0
alpha = np.clip((mx - 0.12) / 0.3, 0, 1) * np.clip((gold - 0.3) / 0.3, 0, 1)

# Cut away everything right of the W's right arm (the silver "e" and the car swoosh).
# The arm's outer edge runs diagonally from about (505, 205) down to (385, 495) in crop coords.
h, w = alpha.shape
yy, xx = np.mgrid[0:h, 0:w]
edge_x = 505 - (np.clip(yy, 205, 495) - 205) * (120 / 290)
alpha = alpha * np.clip((edge_x + 6 - xx) / 6, 0, 1)
# the swoosh tip that crosses just above the W's top-right serif
alpha = alpha * np.where((yy < 204) & (xx > 420), 0, 1)

mark = np.zeros(crop.shape[:2] + (4,), dtype=np.uint8)
mark[..., :3] = (crop * 255).astype(np.uint8)
mark[..., 3] = (alpha * 255).astype(np.uint8)
mark = Image.fromarray(mark, "RGBA")
mark = mark.crop(mark.getbbox())


def tile(size, radius_frac=0.22, pad_frac=0.12):
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, size - 1, size - 1), radius=int(size * radius_frac), fill=255)
    canvas.paste(Image.new("RGBA", (size, size), BG), (0, 0), mask)
    inner = int(size * (1 - 2 * pad_frac))
    m = mark.copy()
    m.thumbnail((inner, inner), Image.LANCZOS)
    canvas.alpha_composite(m, ((size - m.width) // 2, (size - m.height) // 2))
    return canvas


tile(512).save(os.path.join(APP, "icon.png"), optimize=True)
apple = tile(180, radius_frac=0, pad_frac=0.14)  # iOS rounds the corners itself
apple.convert("RGB").save(os.path.join(APP, "apple-icon.png"), optimize=True)
tile(256, pad_frac=0.08).save(os.path.join(APP, "favicon.ico"), sizes=[(16, 16), (32, 32), (48, 48)])
print("icons written")
