import {cart, addToCart} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import { cartItems } from './utils/items.js';


//Updatting the items count in topright cart icon
let topRightCartItem = `
  <a class="orders-link header-link" href="orders.html">
      <span class="returns-text">Returns</span>
      <span class="orders-text">& Orders</span>
    </a>

    <a class="cart-link header-link" href="checkout.html">
      <img class="cart-icon" src="images/icons/cart-icon.png">
      <div class="cart-quantity js-cart-quantity">${cartItems()}</div>
      <div class="cart-text">Cart</div>
    </a>
`
document.querySelector('.js-amazon-header-right-section').innerHTML = topRightCartItem;


let productsHTML = '';
products.forEach((product) => {
    productsHTML += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
            ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
           ${formatCurrency(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id= "${product.id}" >
            Add to Cart
          </button>
        </div>
    `;
});

document.querySelector('.js-product-grid').innerHTML = productsHTML

function updateCartQuantity(){
    let cartQuantity = 0;

    cart.forEach((CartItem) => {
      cartQuantity += CartItem.quantity;
    });

    //displaying cart quantity on dom
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity
}

document.querySelectorAll('.js-add-to-cart').forEach((button) =>{
  button.addEventListener('click', () => {

    // it gives all data attritube attached to element
    const productId= button.dataset.productId;
    addToCart(productId)
    
    updateCartQuantity()
  });
})

