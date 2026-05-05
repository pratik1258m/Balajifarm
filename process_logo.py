from PIL import Image
import numpy as np

img = Image.open('logo.png').convert('RGB')
arr = np.array(img, dtype=np.float32)

# Background color
bg_color = np.array([253, 243, 238])
# Text color
text_color = np.array([0, 50, 40])

# Calculate distance from background color
# Max distance is roughly the distance between bg and text
diff = arr - bg_color
dist = np.linalg.norm(diff, axis=2)
max_dist = np.linalg.norm(text_color - bg_color)

# Create alpha channel: 0 at bg_color, 255 at text_color
alpha = np.clip((dist / max_dist) * 255, 0, 255).astype(np.uint8)

# Instead of keeping the original colors (which might have cream fringes),
# let's just make the whole image the text color, and use the alpha channel for anti-aliasing!
# Wait, if there are other colors, we might want to keep them. Let's keep original colors but 
# where alpha is low, the color matters less.

rgba = np.zeros((arr.shape[0], arr.shape[1], 4), dtype=np.uint8)
rgba[:,:,0] = arr[:,:,0].astype(np.uint8)
rgba[:,:,1] = arr[:,:,1].astype(np.uint8)
rgba[:,:,2] = arr[:,:,2].astype(np.uint8)
rgba[:,:,3] = alpha

# To prevent cream fringes, we can set the RGB of all partially transparent pixels to the text color
# Only where alpha > 0
mask = alpha > 0
rgba[mask, 0] = text_color[0]
rgba[mask, 1] = text_color[1]
rgba[mask, 2] = text_color[2]

out = Image.fromarray(rgba)
out.save('logo_transparent.png')
print("Saved logo_transparent.png")
