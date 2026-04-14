// scripts/orders.js

import { orders, loadOrdersFromStorage } from '../data/order.js';
import { getProduct, loadProductsFetch } from '../data/products.js';
import { renderHeader } from './renderHeader.js';

// ✅ Render ONLY ONE order (ACTIVE ORDER)
function renderOrders() {
  const ordersGrid = document.querySelector('.orders-grid');
  if (!ordersGrid) return;

  loadOrdersFromStorage();

  if (!Array.isArray(orders) || orders.length === 0 || !orders[0]) {
    ordersGrid.innerHTML = `
      <p style="text-align:center;padding:60px;font-size:18px;color:#555;">
        No active order found.
      </p>
    `;
    return;
  }

  const order = orders[0]; // ✅ ONLY ACTIVE ORDER

  let productsHTML = '';

  order.products.forEach((item) => {
    const product = getProduct(item.productId);

    let productName = `Product (ID: ${String(item.productId).slice(0, 8)}...)`;
    let productImage = 'images/icons/placeholder.png';

    if (product) {
      productName = product.name || productName;
      productImage = product.image || productImage;
    }

    const deliveryDate = new Date(item.estimatedDeliveryTime);
    const formattedDelivery = deliveryDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric'
    });

    productsHTML += `
      <div class="product-image-container">
        <img src="${productImage}" alt="${productName}">
      </div>

      <div class="product-details">
        <div class="product-name">${productName}</div>
        <div class="product-delivery-date">
          Arriving on: ${formattedDelivery}
        </div>
        <div class="product-quantity">
          Quantity: ${item.quantity}
        </div>

        <button class="buy-again-button button-primary">
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        </button>
      </div>

      <div class="product-actions">
        <a href="tracking.html?orderId=${order.id}&productId=${item.productId}">
          <button class="track-package-button button-secondary">
            Track package
          </button>
        </a>
      </div>
    `;
  });

  const orderDate = new Date(order.orderTime);
  const formattedOrderDate = orderDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric'
  });

  ordersGrid.innerHTML = `
    <div class="order-container">
      <div class="order-header">

        <div class="order-header-left-section">

          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${formattedOrderDate}</div>
          </div>

          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>$${(order.totalCostCents / 100).toFixed(2)}</div>
          </div>

        </div>

        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${order.id}</div>
        </div>

      </div>

      <div class="order-details-grid">
        ${productsHTML}
      </div>
    </div>
  `;
}

// ✅ INIT
async function init() {
  try {
    await loadProductsFetch();

    renderHeader();
    renderOrders();

  } catch (error) {
    console.error('Error loading products:', error);
  }
}

document.addEventListener('DOMContentLoaded', init);