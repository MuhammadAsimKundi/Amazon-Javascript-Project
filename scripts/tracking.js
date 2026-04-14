import { orders, loadOrdersFromStorage } from '../data/order.js';
import { getProduct, loadProductsFetch } from '../data/products.js';
import { renderHeader } from './renderHeader.js';


// -----------------------------
// URL PARAMS
// -----------------------------
function getUrlParams() {
  const url = new URL(window.location.href);

  return {
    orderId: url.searchParams.get('orderId'),
    productId: url.searchParams.get('productId')
  };
}


// -----------------------------
// STATUS LOGIC
// -----------------------------
function getStatus(estimatedDeliveryTime) {
  const now = new Date();
  const delivery = new Date(estimatedDeliveryTime);

  const diff = delivery - now;
  const oneDay = 24 * 60 * 60 * 1000;

  if (diff <= 0) {
    return { label: 'Delivered', step: 3, progress: 100 };
  }

  if (diff <= oneDay) {
    return { label: 'Shipped', step: 2, progress: 70 };
  }

  return { label: 'Preparing', step: 1, progress: 30 };
}


// -----------------------------
// FIND DATA
// -----------------------------
function getTrackingData(orderId, productId) {
  const order = orders.find(o => o.id === orderId);
  if (!order) return null;

  const productItem = order.products.find(
    p => p.productId === productId
  );

  if (!productItem) return null;

  const product = getProduct(productId);

  return { order, productItem, product };
}


// -----------------------------
// RENDER UI
// -----------------------------
function render(data) {
  const container = document.querySelector('.js-main');

  if (!container) return;

  const { productItem, product } = data;

  const deliveryDate = new Date(productItem.estimatedDeliveryTime)
    .toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });

  const status = getStatus(productItem.estimatedDeliveryTime);

  container.innerHTML = `
    <div class="order-tracking">

      <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>

      <div class="delivery-date">
        Arriving on ${deliveryDate}
      </div>

      <div class="product-info">
        ${product?.name || 'Unknown Product'}
      </div>

      <div class="product-info">
        Quantity: ${productItem.quantity}
      </div>

      <img class="product-image"
        src="${product?.image || 'images/icons/placeholder.png'}">

      <div class="progress-labels-container">
        <div class="progress-label ${status.step === 1 ? 'current-status' : ''}">
          Preparing
        </div>

        <div class="progress-label ${status.step === 2 ? 'current-status' : ''}">
          Shipped
        </div>

        <div class="progress-label ${status.step === 3 ? 'current-status' : ''}">
          Delivered
        </div>
      </div>

      <div class="progress-bar-container">
        <div class="progress-bar" style="width:${status.progress}%"></div>
      </div>

    </div>
  `;
}


// -----------------------------
// INIT
// -----------------------------
async function init() {
  try {
    console.log("Tracking page loaded");

    await loadProductsFetch();
    loadOrdersFromStorage();

    // safe header render (prevents crash)
    if (document.querySelector('.amazon-header')) {
      renderHeader();
    }

    const { orderId, productId } = getUrlParams();

    console.log("URL params:", orderId, productId);

    const container = document.querySelector('.js-main');

    if (!orderId || !productId) {
      container.innerHTML = "<p>Missing orderId or productId</p>";
      return;
    }

    const data = getTrackingData(orderId, productId);

    console.log("Tracking data:", data);

    if (!data) {
      container.innerHTML = "<p>Order or product not found</p>";
      return;
    }

    render(data);

  } catch (err) {
    console.error("Tracking init error:", err);

    const container = document.querySelector('.js-main');
    if (container) {
      container.innerHTML =
        "<p style='color:red'>Something went wrong. Check console.</p>";
    }
  }
}

document.addEventListener('DOMContentLoaded', init);