export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order){
    //to add the order infront of the array
    orders.unshift(order);
    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem('orders', JSON.stringify(orders));
}