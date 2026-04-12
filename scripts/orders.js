import { orders } from '../data/order.js';

function renderOrders() {
  let ordersHTML = '';

  ordersHTML += `
        <div class="order-header">
          <div class="order-header-left-section">
            <div>
              <div class="order-header-label">Order Placed:</div>
              <div>${order.date}</div>
            </div>
            <div>
              <div class="order-header-label">Total:</div>
              <div>$${order.total}</div>
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
    `;
    console.log(ordersHTML)

  orders.forEach((order) => {

    let productsHTML = '';

    order.products.forEach((product) => {
      productsHTML += `
        <div class="product-image-container">
          <img src="${product.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${product.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${product.deliveryDate}
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
          <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `;
    });

  });

  document.querySelector('.js-orders-grid').innerHTML = ordersHTML;
}

renderOrders();