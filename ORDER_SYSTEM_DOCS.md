# E-Commerce Website - Order System Documentation

## Features Implemented

### 1. **Shopping Cart System**
- Add products to cart from shop pages
- View cart items with quantities
- Update item quantities
- Remove items from cart
- Cart data persists using localStorage

### 2. **Order Management**
- Place orders with customer details
- Order tracking by email
- Order status management (pending, confirmed, shipped, delivered)
- Order history

### 3. **Backend API Endpoints**

#### Order Endpoints:

**POST** `/api/orders/create`
- Create a new order
- **Body:**
  ```json
  {
    "customerName": "John Doe",
    "customerEmail": "artbyshobha@gmail.com",
    "customerPhone": "1234567890",
    "customerAddress": "123 Main St, City",
    "items": [
      {
        "id": "product-1",
        "name": "Black Jacket",
        "quantity": 2,
        "price": 1999
      }
    ],
    "totalPrice": 3998
  }
  ```

**GET** `/api/orders`
- Get all orders (admin view)

**GET** `/api/orders/:id`
- Get specific order by ID

**GET** `/api/orders/email/:email`
- Get all orders by customer email

**PUT** `/api/orders/:id`
- Update order status
- **Body:**
  ```json
  {
    "status": "confirmed"
  }
  ```

**DELETE** `/api/orders/:id`
- Delete an order

---

## How It Works

### 1. **Adding Products to Cart**
```javascript
// Automatically triggered by clicking "Add to Cart" button
const product = {
  id: "product-name",
  name: "Black Jacket",
  price: 1999,
  image: "image-url.jpg",
  quantity: 1
};

cart.addToCart(product);
```

### 2. **Cart Functions**

**View Cart:**
- Navigate to http://localhost:5000/cart.html

**Update Quantity:**
- Change the quantity input in the cart table
- Click outside the input to save

**Remove Item:**
- Click the "Remove" button next to any item

**Proceed to Checkout:**
- Click "Proceed to Checkout" button in cart summary

### 3. **Placing an Order**

**Process:**
1. Add items to cart
2. Go to Cart page
3. Click "Proceed to Checkout"
4. Fill in delivery details:
   - Full Name
   - Email Address
   - Phone Number
   - Delivery Address
5. Review order summary
6. Click "Place Order"

**After Order Placed:**
- Order is saved to MongoDB
- Customer receives confirmation
- Cart is automatically cleared
- Redirected to home page

### 4. **Cart Data Storage**

Cart data is stored in browser's **localStorage** under key: `urbanCrazeCart`

**Structure:**
```javascript
[
  {
    id: "product-1699999999999",
    name: "Black Jacket",
    price: 1999,
    image: "./Images&Logo/Male Dress/BlackJacket1.webp",
    quantity: 2
  }
]
```

---

## File Structure

```
├── cart.js                 // Cart & Order management logic
├── checkout.html           // Checkout page
├── cart.html              // Cart display page
├── backend/
│   ├── models/
│   │   └── Order.js       // Order MongoDB schema
│   └── routes/
│       └── orderRoutes.js // Order API endpoints
└── index.html, shop.html  // Include cart.js for "Add to Cart"
```

---

##  Testing the Orders

### Via Website:
1. Go to http://localhost:5000/shop.html
2. Click "Add to Cart" on any product
3. Navigate to cart
4. Proceed to checkout
5. Fill in details and place order

### Via API (Postman/Terminal):

**Create Order:**
```bash
curl -X POST http://localhost:5000/api/orders/create \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "John Doe",
    "customerEmail": "artbyshobha@gmail.com",
    "customerPhone": "1234567890",
    "customerAddress": "123 Main St, City",
    "items": [{
      "productId": "1",
      "productName": "Black Jacket",
      "quantity": 2,
      "price": 1999,
      "subtotal": 3998
    }],
    "totalPrice": 3998
  }'
```

**Get Orders by Email:**
```bash
curl http://localhost:5000/api/orders/email/artbyshobha@gmail.com
```

---

## MongoDB Order Schema

```javascript
{
  _id: ObjectId,
  customerName: String (required),
  customerEmail: String (required),
  customerPhone: String,
  customerAddress: String (required),
  items: [
    {
      productId: String,
      productName: String,
      quantity: Number,
      price: Number,
      subtotal: Number
    }
  ],
  totalPrice: Number (required),
  status: String (pending, confirmed, shipped, delivered),
  createdAt: Date
}
```

---

## Features Summary

✅ **Add to Cart** - Click cart icon on products
✅ **View Cart** - Dedicated cart page with all items
✅ **Update Quantities** - Change amount directly in cart
✅ **Remove Items** - Delete from cart before checkout
✅ **Checkout** - Collect customer details
✅ **Place Orders** - Save to MongoDB database
✅ **Order History** - View past orders by email
✅ **Order Status** - Track order status (admin updatable)
✅ **Local Storage** - Cart persists across sessions
✅ **Responsive Design** - Works on mobile & desktop

---

## Next Steps (Optional Enhancements)

- [ ] Add payment gateway (Stripe, Razorpay)
- [ ] Send order confirmation emails
- [ ] User authentication/login system
- [ ] Wishlist functionality
- [ ] Product reviews and ratings
- [ ] Admin dashboard for order management
- [ ] Inventory management
- [ ] Discount codes/coupons

---

**Version:** 1.0
**Last Updated:** March 5, 2026
