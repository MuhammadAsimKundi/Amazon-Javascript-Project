// data/order.js

export let orders = JSON.parse(localStorage.getItem('orders')) || [];

// We now enforce ONLY ONE order (ACTIVE ORDER SYSTEM)
const ACTIVE_ORDER_ID = "ACTIVE_ORDER";

// Add or update order (NO DUPLICATES EVER)
export function addOrder(order) {

  // Force single order ID system
  order.id = ACTIVE_ORDER_ID;

  const index = orders.findIndex(o => o.id === ACTIVE_ORDER_ID);

  if (index !== -1) {
    // ✅ UPDATE existing order (same container updated)
    orders[index] = order;
  } else {
    // ✅ FIRST TIME only
    orders = [order];
  }

  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

// Reload from storage
export function loadOrdersFromStorage() {
  const savedOrders = JSON.parse(localStorage.getItem('orders'));

  if (savedOrders && savedOrders.length > 0) {
    orders = savedOrders;

    // enforce single order rule even on reload
    orders = [orders[0]];
  }
}