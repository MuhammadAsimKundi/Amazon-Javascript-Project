import { orders } from '../data/order.js';
import { getProduct } from '../data/products.js';

function renderOrders() {

  let ordersHTML = '';

  orders.forEach((order) => {

    let productsHTML = '';

    order.products.forEach((product) => {

      const productDetails = getProduct(product.productId);

      if (!productDetails) return;

      productsHTML += `
        <div class="product-image-container">
          <img src="${productDetails.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${productDetails.name}
          </div>

          <div class="product-delivery-date">
            Arriving on: ${new Date(product.estimatedDeliveryTime).toDateString()}
          </div>

          <div class="product-quantity">
            Quantity: ${product.quantity}
          </div>

          <button class="buy-again-button button-primary">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span>Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html?orderId=${order.id}&productId=${product.productId}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `;
    });

    ordersHTML += `
      <div class="order-block">
        <div class="order-header">
          <div class="order-header-left-section">
            <div>
              <div class="order-header-label">Order Placed:</div>
              <div>${new Date(order.orderTime).toDateString()}</div>
            </div>
            <div>
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
  });

  document.querySelector('.js-orders-grid').innerHTML = `
    <div class="order-container">
      ${ordersHTML}
    </div>
  `;
}

renderOrders();