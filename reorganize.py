import os
import shutil

root = r"c:\Users\Lenovo\Downloads\E-Commerce-Website-master (2)\E-Commerce-Website-master"
frontend = os.path.join(root, "frontend")

# Files to move
files = [
    'index.html', 'about.html', 'blog.html', 'cart.html', 'contact.html',
    'shop.html', 'sproduct.html', 'style.css', 'script.js', 'merge_frontend.js'
]

print("🔄 Moving files to frontend folder...\n")

for f in files:
    src = os.path.join(root, f)
    dst = os.path.join(frontend, f)
    if os.path.exists(src):
        try:
            shutil.move(src, dst)
            print(f"✓ {f}")
        except Exception as e:
            print(f"✗ {f}: {e}")

# Move Images&Logo
images_src = os.path.join(root, "Images&Logo")
images_dst = os.path.join(frontend, "Images&Logo")
if os.path.exists(images_src):
    try:
        shutil.move(images_src, images_dst)
        print(f"✓ Images&Logo")
    except Exception as e:
        print(f"✗ Images&Logo: {e}")

print("\n✅ Reorganization complete!")
