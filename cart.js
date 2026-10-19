// ==================== CART Management ====================
class ShoppingCart {
  constructor() {
    this.cartKey = "urbanCrazeCart";
    this.loadCart();
  }

  // Load cart from localStorage
  loadCart() {
    const saved = localStorage.getItem(this.cartKey);
    this.items = saved ? JSON.parse(saved) : [];
  }

  // Save cart to localStorage
  saveCart() {
    localStorage.setItem(this.cartKey, JSON.stringify(this.items));
  }

  // Add item to cart
  addToCart(product) {
    const existingItem = this.items.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += (product.quantity || 1);
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: product.quantity || 1
      });
    }
    
    this.saveCart();
    this.showNotification(`${product.name} added to cart!`);
    return true;
  }

  // Remove item from cart
  removeFromCart(itemId) {
    this.items = this.items.filter(item => item.id !== itemId);
    this.saveCart();
    return true;
  }

  // Update quantity
  updateQuantity(itemId, quantity) {
    const item = this.items.find(item => item.id === itemId);
    if (item) {
      item.quantity = Math.max(1, quantity);
      this.saveCart();
      return true;
    }
    return false;
  }

  // Get total price
  getTotalPrice() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  // Get cart count
  getCartCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  // Clear cart
  clearCart() {
    this.items = [];
    this.saveCart();
  }

  // Show notification
  showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      background: #088178;
      color: white;
      padding: 15px 20px;
      border-radius: 5px;
      z-index: 1000;
      animation: slideIn 0.3s ease-in-out;
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 3000);
  }

  // Display cart items on cart page
  displayCart() {
    const cartContainer = document.querySelector('.cart-items');
    if (!cartContainer) return;

    if (this.items.length === 0) {
      cartContainer.innerHTML = '<h3 style="text-align:center; padding:40px;">Your cart is empty!</h3>';
      document.querySelector('.cart-summary').style.display = 'none';
      return;
    }

    let html = '<table style="width:100%; border-collapse:collapse;">';
    html += '<tr style="border-bottom:2px solid #cce7d0;"><th style="text-align:left;padding:10px;">Product</th><th style="text-align:center;">Price</th><th style="text-align:center;">Quantity</th><th style="text-align:center;">Total</th><th style="text-align:center;">Action</th></tr>';

    this.items.forEach(item => {
      const total = (item.price * item.quantity).toFixed(2);
      html += `
        <tr style="border-bottom:1px solid #e0e0e0; padding:10px;">
          <td style="padding:10px;">${item.name}</td>
          <td style="text-align:center;">₹${item.price}</td>
          <td style="text-align:center;">
            <input type="number" value="${item.quantity}" min="1" 
              onchange="cart.updateQuantity('${item.id}', this.value); location.reload();"
              style="width:50px; padding:5px;">
          </td>
          <td style="text-align:center;">₹${total}</td>
          <td style="text-align:center;">
            <button onclick="cart.removeFromCart('${item.id}'); location.reload();" 
              style="background:#dc3545; color:white; border:none; padding:5px 15px; border-radius:3px; cursor:pointer;">
              Remove
            </button>
          </td>
        </tr>
      `;
    });

    html += '</table>';
    cartContainer.innerHTML = html;

    // Update summary
    const summary = document.querySelector('.cart-summary');
    if (summary) {
      summary.style.display = 'block';
      summary.innerHTML = `
        <div style="background:#f5f5f5; padding:20px; border-radius:5px; margin-top:20px;">
          <h3>Order Summary</h3>
          <div style="display:flex; justify-content:space-between; margin:10px 0; border-bottom:1px solid #ccc; padding-bottom:10px;">
            <span>Subtotal:</span>
            <span>₹${this.getTotalPrice().toFixed(2)}</span>
          </div>
          <div style="display:flex; justify-content:space-between; margin:10px 0;">
            <span><strong>Total:</strong></span>
            <span><strong>₹${this.getTotalPrice().toFixed(2)}</strong></span>
          </div>
          <button onclick="cart.goToCheckout()" 
            style="width:100%; background:#088178; color:white; border:none; padding:15px; margin-top:20px; border-radius:5px; cursor:pointer; font-size:16px; font-weight:bold;">
            Proceed to Checkout
          </button>
        </div>
      `;
    }
  }

  // Go to checkout
  goToCheckout() {
    if (this.items.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    window.location.href = 'checkout.html';
  }
}

// Initialize cart
const cart = new ShoppingCart();

// ==================== ORDER Management ====================
class OrderManager {
  // Place order
  async placeOrder(orderData) {
    try {
      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('lastOrderId', data.orderId);
        cart.clearCart();
        return { success: true, orderId: data.orderId, message: data.message };
      } else {
        return { success: false, message: data.error };
      }
    } catch (error) {
      return { success: false, message: 'Error placing order: ' + error.message };
    }
  }

  // Get orders by email
  async getOrdersByEmail(email) {
    try {
      const response = await fetch(`/api/orders/email/${email}`);
      const orders = await response.json();
      return orders;
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  }

  // Get single order
  async getOrder(orderId) {
    try {
      const response = await fetch(`/api/orders/${orderId}`);
      const order = await response.json();
      return order;
    } catch (error) {
      console.error('Error fetching order:', error);
      return null;
    }
  }
}

const orderManager = new OrderManager();
 
document.addEventListener('DOMContentLoaded', function() {
  const cartButtons = document.querySelectorAll('.cart');
  cartButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const productCard = this.closest('.pro');
      if (productCard) {
        const productName = productCard.querySelector('h5')?.textContent || 'Product';
        const productPrice = parseFloat(productCard.querySelector('h4')?.textContent?.replace(/[^\d.]/g, '') || 0);
        const productImage = productCard.querySelector('img')?.src || '';
        
        const product = {
          id: productName + '-' + Date.now(),
          name: productName,
          price: productPrice,
          image: productImage,
          quantity: 1
        };
        
        cart.addToCart(product);
      }
    });
  });

  // Update cart count if cart badge exists
  const cartBadge = document.querySelector('.cart-count');
  if (cartBadge) {
    cartBadge.textContent = cart.getCartCount();
  }
});
