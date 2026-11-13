"""Usage: python scripts/build_emblem.py  (source artwork lives in ../logo/)

Rebuilds the WEC emblem as theme-able layers in public/brand/:
  emblem-gold.png      white, alpha = gold shape (CSS fills it with the accent colour)
  emblem-silver.png    white, alpha = silver shape (CSS fills it with a mode-dependent neutral)
  emblem-shade.png     greyscale shading from the original art, multiplied over the fills
                       so every accent keeps the original metallic depth
  emblem-shine.png     white, alpha = specular highlights
  emblem-original.png  original colours on a transparent background
"""
import os
import numpy as np
from PIL import Image, ImageFilter

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "..", "..", "logo", "Regal Wec Chauffeur Emblem.png")
OUT = os.path.join(HERE, "..", "public", "brand")
TARGET_W = 900

os.makedirs(OUT, exist_ok=True)
rgb = np.asarray(Image.open(SRC).convert("RGB")).astype(np.float32) / 255.0

mx = rgb.max(axis=2)
mn = rgb.min(axis=2)
sat = np.where(mx > 1e-3, (mx - mn) / np.maximum(mx, 1e-3), 0)
lum = 0.299 * rgb[..., 0] + 0.587 * rgb[..., 1] + 0.114 * rgb[..., 2]

# Coverage: the artwork, minus the faint outer glow that smears on light backgrounds.
coverage = np.clip((mx - 0.10) / 0.30, 0, 1)

ys, xs = np.where(coverage > 0.05)
pad = 12
y0, y1 = max(ys.min() - pad, 0), min(ys.max() + pad, rgb.shape[0])
x0, x1 = max(xs.min() - pad, 0), min(xs.max() + pad, rgb.shape[1])
rgb, mx, sat, lum, coverage = (a[y0:y1, x0:x1] for a in (rgb, mx, sat, lum, coverage))


def blur(a, r):
    img = Image.fromarray((np.clip(a, 0, 1) * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(r))
    return np.asarray(img).astype(np.float32) / 255.0


# Gold vs silver. Hot specular glints are near-white everywhere, so treat them as
# gold (they sit on gold strokes); silver is only genuinely neutral mid/bright areas.
gold_raw = np.clip((sat - 0.05) / 0.07, 0, 1)
gold_raw = np.maximum(gold_raw, np.clip((lum - 0.82) / 0.1, 0, 1))
gold_w = np.clip((blur(gold_raw, 5) - 0.3) / 0.3, 0, 1)
silver_w = 1 - gold_w

# Shading: original luminance, normalised so the brightest strokes are white.
inside = coverage > 0.5
ref = np.percentile(lum[inside], 97)
shade = np.clip(lum / ref, 0, 1) ** 0.85
shade = 0.18 + 0.82 * shade  # keep the darkest folds from going pure black

shine = np.clip((lum - 0.80) / 0.2, 0, 1) * coverage


def resize(img):
    w, h = img.size
    return img.resize((TARGET_W, round(h * TARGET_W / w)), Image.LANCZOS)


def save_mask(alpha, name):
    h, w = alpha.shape
    img = np.zeros((h, w, 4), dtype=np.uint8)
    img[..., :3] = 255
    img[..., 3] = (np.clip(alpha, 0, 1) * 255).astype(np.uint8)
    im = resize(Image.fromarray(img, "RGBA"))
    im.save(os.path.join(OUT, name), optimize=True)
    return im.size


size = save_mask(coverage * gold_w, "emblem-gold.png")
save_mask(coverage * silver_w, "emblem-silver.png")
save_mask(shine, "emblem-shine.png")

shade_img = np.zeros(shade.shape + (4,), dtype=np.uint8)
shade_img[..., :3] = (shade[..., None] * 255).astype(np.uint8)
shade_img[..., 3] = (coverage * 255).astype(np.uint8)
resize(Image.fromarray(shade_img, "RGBA")).save(os.path.join(OUT, "emblem-shade.png"), optimize=True)

orig = np.zeros(rgb.shape[:2] + (4,), dtype=np.uint8)
orig[..., :3] = (rgb * 255).astype(np.uint8)
orig[..., 3] = (np.clip((mx - 0.06) / 0.5, 0, 1) * 255).astype(np.uint8)
resize(Image.fromarray(orig, "RGBA")).save(os.path.join(OUT, "emblem-original.png"), optimize=True)

print("emblem size", size, "aspect", round(size[0] / size[1], 4))
