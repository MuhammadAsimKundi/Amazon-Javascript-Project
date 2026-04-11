function Cart(localStorageKey){
    const cart = {
        cartItems : undefined,

        // we created this method for jasmine test
        loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
        if(!this.cartItems){
            this.cartItems = [{
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity :  2,
                deliveryOptionId : '1'
            },
            {
                productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity :  1,
                deliveryOptionId : '2'

            }];
        }
        },

        saveToStorage(){
        localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        },

        addToCart(productId){
        let matchingItem;

        this.cartItems.forEach((CartItem) => {
            if(productId === CartItem.productId){
            matchingItem = CartItem;
            }
        });

        if(matchingItem){
            matchingItem.quantity += 1;
        }else{
            this.cartItems.push({
            productId,
            quantity: 1,
            deliveryOptionId : '1'
            });
        }

        this.saveToStorage();
        },

        
        removeFromCart(prodcutId){
            const newCart = [];

            this.cartItems.forEach((CartItem) => {
                if(CartItem.productId !== prodcutId){
                    newCart.push(CartItem)
                }
            });
            
            this.cartItems = newCart;

            this.saveToStorage();
        },

        // update the develivery option date through deliveryOptionId using function

        updateDeliveryOption(productId, deliveryOptionId){
        let matchingItem;

        this.cartItems.forEach((CartItem) => {
            if(productId === CartItem.productId){
            matchingItem = CartItem;
            }
        });

        matchingItem.deliveryOptionId = deliveryOptionId;

        this.saveToStorage();
        }
    };

    return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();


businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart)