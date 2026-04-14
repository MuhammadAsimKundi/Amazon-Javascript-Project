// data/order.js

export let orders = JSON.parse(localStorage.getItem('orders')) || [];

// Add or update order (prevents duplicates)
export function addOrder(order) {
  const index = orders.findIndex(o => o.id === order.id);

  if (index !== -1) {
    // Update existing order
    orders[index] = order;
  } else {
    // Add new order at top
    orders.unshift(order);
  }

  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

// Reload from storage (optional safety)
export function loadOrdersFromStorage() {
  const savedOrders = JSON.parse(localStorage.getItem('orders'));
  if (savedOrders) {
    orders = savedOrders;
  }
}