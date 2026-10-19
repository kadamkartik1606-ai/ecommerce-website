# E-Commerce Website - Setup & Run Guide

## Prerequisites
- **Node.js** installed (Download from https://nodejs.org/)
- **MongoDB** (Optional - using free cloud MongoDB Atlas)

## Quick Start

### For Windows Users:
Simply **double-click** `START.bat` file to run everything automatically!

### For Mac/Linux Users:
```bash
node REORGANIZE.js
cd backend
npm install
npm start
```

## What Happens:
1. ✓ Folder structure automatically reorganized (first run only)
2. ✓ Backend dependencies installed automatically  
3. ✓ Server starts on `http://localhost:5000`
4. ✓ Frontend files served automatically from `/frontend`

## Access the Website:
Once the server is running, open your browser and go to:
- **http://localhost:5000/** - Home page
- **http://localhost:5000/shop.html** - Shop
- **http://localhost:5000/about.html** - About
- **http://localhost:5000/blog.html** - Blog
- **http://localhost:5000/contact.html** - Contact
- **http://localhost:5000/cart.html** - Cart

## API Endpoints:
- **GET** `/api/products` - Get all products
- **POST** `/api/products/add` - Add new product
- **POST** `/api/orders/create` - Place a new order
- **GET** `/api/orders` - Get all orders (admin)
- **GET** `/api/orders/:id` - Get specific order
- **GET** `/api/orders/email/:email` - Get customer orders
- **PUT** `/api/orders/:id` - Update order status
- **DELETE** `/api/orders/:id` - Delete order

## MongoDB Setup (if needed):
The `.env` file already has a test connection. If you want to use your own:
1. Create free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster and get connection string
3. Replace the `MONGO_URI` in `backend/.env` with your connection string

## Troubleshooting:

### Port 5000 already in use:
Edit `backend/server.js` line 27 and change `5000` to another port (like `5001`)

### MongoDB connection failed:
Make sure your internet connection is stable, or use a local MongoDB instance

### Dependencies not installing:
Delete `backend/node_modules` folder and try again
```bash
cd backend
npm install
```

## New Features - Order & Cart System

### How to Use:
1. **Add Products to Cart** - Click the cart icon on any product
2. **View Cart** - Go to http://localhost:5000/cart.html
3. **Checkout** - Fill in delivery details and place order
4. **Order Placed** - Order is saved to MongoDB and cart clears automatically

### Cart Features:
- ✓ Add/Remove items
- ✓ Update quantities
- ✓ Cart persists in browser (localStorage)
- ✓ Real-time total calculation
- ✓ Checkout form with validation

### For More Details:
See `ORDER_SYSTEM_DOCS.md` for complete API documentation and features

## Project Structure:
```
├── frontend/
│   ├── index.html, about.html, shop.html, etc
│   ├── style.css (Styling)
│   ├── script.js, merge_frontend.js (Frontend scripts)
│   └── Images&Logo/ (Product images)
├── backend/
│   ├── server.js (Express server)
│   ├── .env (Configuration)
│   ├── models/ (MongoDB schemas)
│   └── routes/ (API endpoints)
├── START.bat (Launcher)
└── REORGANIZE.js (Folder reorganization script)
```

## Stop the Server:
Press `Ctrl + C` in the terminal/command prompt

---

**Enjoy your E-Commerce Website!** 🛒
