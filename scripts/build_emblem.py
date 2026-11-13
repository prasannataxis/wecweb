"""Usage: python scripts/build_emblem.py  (source artwork lives in ../logo/)

Split the WEC emblem (gold + silver on black) into theme-able alpha masks.

Outputs into scaffold-temp/public/brand/:
  emblem-gold.png      white, alpha = gold coverage (filled with the accent colour in CSS)
  emblem-silver.png    white, alpha = silver coverage (filled with a mode-dependent neutral)
  emblem-shine.png     white, alpha = specular highlights (restores the metallic look)
  emblem-original.png  original colours on a transparent background (reference / social use)
"""
import os
import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "..", "..", "logo", "Regal Wec Chauffeur Emblem.png")
OUT = os.path.join(HERE, "..", "public", "brand")
TARGET_W = 900

os.makedirs(OUT, exist_ok=True)
rgb = np.asarray(Image.open(SRC).convert("RGB")).astype(np.float32) / 255.0

mx = rgb.max(axis=2)
mn = rgb.min(axis=2)
sat = np.where(mx > 1e-3, (mx - mn) / np.maximum(mx, 1e-3), 0)

# Coverage: anything meaningfully brighter than the black background.
coverage = np.clip((mx - 0.06) / 0.5, 0, 1)

# Crop to the artwork with a small margin.
ys, xs = np.where(coverage > 0.05)
pad = 12
y0, y1 = max(ys.min() - pad, 0), min(ys.max() + pad, rgb.shape[0])
x0, x1 = max(xs.min() - pad, 0), min(xs.max() + pad, rgb.shape[1])
rgb, mx, sat, coverage = (a[y0:y1, x0:x1] for a in (rgb, mx, sat, coverage))

# Gold = saturated warm pixels; silver = low-saturation bright pixels.
# Gold highlights wash out to pale yellow (low but non-zero saturation), so use a
# low threshold, then smooth so small specular streaks follow their surroundings.
from PIL import ImageFilter
gold_raw = np.clip((sat - 0.05) / 0.07, 0, 1)
gold_img = Image.fromarray((gold_raw * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(4))
gold_w = np.clip((np.asarray(gold_img).astype(np.float32) / 255.0 - 0.35) / 0.3, 0, 1)
silver_w = 1 - gold_w

# Keep shading inside the masks: brightness drives opacity, but never below
# a floor so mid-tones stay solid on light backgrounds.
body = np.clip(0.35 + 0.65 * mx, 0, 1) * coverage
shine = np.clip((mx - 0.78) / 0.22, 0, 1) * coverage


def save_mask(alpha, name):
    h, w = alpha.shape
    img = np.zeros((h, w, 4), dtype=np.uint8)
    img[..., :3] = 255
    img[..., 3] = (np.clip(alpha, 0, 1) * 255).astype(np.uint8)
    im = Image.fromarray(img, "RGBA")
    im = im.resize((TARGET_W, round(h * TARGET_W / w)), Image.LANCZOS)
    im.save(os.path.join(OUT, name), optimize=True)
    return im.size


size = save_mask(body * gold_w, "emblem-gold.png")
save_mask(body * silver_w, "emblem-silver.png")
save_mask(shine, "emblem-shine.png")

orig = np.zeros(rgb.shape[:2] + (4,), dtype=np.uint8)
orig[..., :3] = (rgb * 255).astype(np.uint8)
orig[..., 3] = (coverage * 255).astype(np.uint8)
Image.fromarray(orig, "RGBA").resize(size, Image.LANCZOS).save(os.path.join(OUT, "emblem-original.png"), optimize=True)

print("emblem size", size, "aspect", round(size[0] / size[1], 4))
