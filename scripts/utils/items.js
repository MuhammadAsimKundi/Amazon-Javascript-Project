import { cart } from "../../data/cart.js";

export function cartItems(){
    let items = 0 ;
    
    
    cart.forEach((cartItem) => {

        items += cartItem.quantity
        
    });
    return items
}
