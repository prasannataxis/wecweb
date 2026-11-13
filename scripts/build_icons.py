"""Usage: python scripts/build_icons.py  (source artwork lives in ../logo/)

Builds the favicon set from the crowned gold "W" of the WEC emblem (the full
emblem is unreadable at 16-32px), on a transparent background: app/favicon.ico,
app/icon.png, plus app/apple-icon.png on dark (iOS requires an opaque icon).
"""
import os
import numpy as np
from PIL import Image, ImageFilter

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


# Brighten/saturate a little: the shaded gold reads dull at 16-32px
rgb = np.asarray(mark).astype(np.float32)
lum = rgb[..., :3].mean(axis=2, keepdims=True)
rgb[..., :3] = np.clip(lum + (rgb[..., :3] - lum) * 1.25, 0, 255) * 1.12
mark = Image.fromarray(np.clip(rgb, 0, 255).astype(np.uint8), "RGBA")


def transparent_icon(size, pad=0.04, edge=True):
    """Crowned W on a transparent square, sharpened at the target size."""
    inner = max(1, round(size * (1 - 2 * pad)))
    m = mark.copy()
    m.thumbnail((inner, inner), Image.LANCZOS)
    if size <= 64:
        m = m.filter(ImageFilter.UnsharpMask(radius=0.6, percent=140, threshold=1))
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    x, y = (size - m.width) // 2, (size - m.height) // 2
    if edge:
        # hairline dark edge so the gold still separates from white tab bars
        a = m.split()[3].filter(ImageFilter.MaxFilter(3))
        halo = Image.new("RGBA", m.size, (20, 14, 4, 0))
        halo.putalpha(a.point(lambda v: int(v * 0.55)))
        canvas.alpha_composite(halo, (x, y))
    canvas.alpha_composite(m, (x, y))
    return canvas


def tile(size, pad_frac=0.12):
    canvas = Image.new("RGBA", (size, size), BG)
    inner = int(size * (1 - 2 * pad_frac))
    m = mark.copy()
    m.thumbnail((inner, inner), Image.LANCZOS)
    canvas.alpha_composite(m, ((size - m.width) // 2, (size - m.height) // 2))
    return canvas


transparent_icon(512, pad=0.03, edge=False).save(os.path.join(APP, "icon.png"), optimize=True)
tile(180).convert("RGB").save(os.path.join(APP, "apple-icon.png"), optimize=True)  # iOS needs an opaque icon
sizes = [16, 32, 48]
frames = [transparent_icon(n) for n in sizes]
frames[-1].save(os.path.join(APP, "favicon.ico"), sizes=[(n, n) for n in sizes], append_images=frames[:-1])
print("icons written")
