import {cart, addToCart} from '../data/cart.js';
import { products, loadProducts } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import { cartItems } from './utils/items.js';
import { renderHeader } from './renderHeader.js';

renderHeader();   // dynamic header


//loading the renderProductsGrid in loadproducts() in products.js that takes data from backend api
loadProducts(renderProductsGrid);

function renderProductsGrid(){

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
                src="${product.getStarsUrl()}">
              <div class="product-rating-count link-primary">
              ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
            $${product.getPrice()}
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

          
            ${product.extraInfoHTML()}

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

  //    Above we use polymorphism
  // // here we use polymorphism as we dont know it might be product class or clothing class
  //           // polymorphism: we can use a method without knowing what class it is.
  //           // we use polyphormism instead of if-else statement
  //           // in polyphormism the class itself determines what this method does
  //           ${product.extraInfoHTML()}

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
}
