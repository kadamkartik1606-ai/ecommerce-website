# How to Change Product Images

## Current Product Categories:
- **Male Dress**: Jackets, Kurtas, Shirts, Suits, T-shirts
- **Female Dress**: Dresses, Kurtis, Traditional wear

## Step 1: Replace Images in Folders
Replace existing images in these directories:
- `Images&Logo/Male Dress/` (50+ images)
- `Images&Logo/Female Dress/` (50+ images)

## Step 2: Update HTML References
Update image paths in these files:
- `index.html` (featured products carousel)
- `shop.html` (all product listings)

## Step 3: Update Database Products
Use the backend API to update product data:
- Name, Price, Image path

## Example API Usage:
```javascript
fetch('/api/products/add', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    name: 'New Product Name',
    price: 999,
    image: './Images&Logo/Male Dress/new-image.jpg'
  })
});
```

## Quick Image Replacement:
1. Choose a product category (Male/Female)
2. Replace images with same names
3. Update HTML img src paths
4. Restart server

Would you like me to help you replace specific images or create a new product category?</content>
<parameter name="filePath">c:\Users\Lenovo\Downloads\E-Commerce-Website-master (2)\E-Commerce-Website-master\IMAGE_CHANGE_GUIDE.md