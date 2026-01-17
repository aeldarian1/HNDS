import os
from PIL import Image

# Directory containing images
dir = os.path.join(os.path.dirname(__file__), '../public/images')

# Supported formats
exts = ['.jpg', '.jpeg', '.png']

# Walk through all files in the directory
for root, _, files in os.walk(dir):
    for file in files:
        ext = os.path.splitext(file)[1].lower()
        if ext in exts:
            path = os.path.join(root, file)
            try:
                img = Image.open(path)
                # Convert to WebP
                webp_path = os.path.splitext(path)[0] + '.webp'
                img.save(webp_path, 'webp', quality=80, method=6)
                # Convert to AVIF (if Pillow supports it)
                try:
                    avif_path = os.path.splitext(path)[0] + '.avif'
                    img.save(avif_path, 'avif', quality=80)
                except Exception:
                    pass
            except Exception as e:
                print(f'Error processing {path}: {e}')
