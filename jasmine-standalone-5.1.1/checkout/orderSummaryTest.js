import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import {loadFromStorage, cart} from '../../data/cart.js';
import { loadProducts } from "../../data/products.js";

// Integration Test : It tests many units/pieces of code working together

describe('test suite: renderOrderSummary', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d'

    // beforeAll (its js hook) it runs this and done() waits for it to finished. 
    // done() let us control when to go to next step
    // we can use done() inside beforeEach and it.
    beforeAll((done) => {
        loadProducts(() => {
            done();
        });
    });

    beforeEach(() => {
        spyOn(localStorage, 'setItem');

        document.querySelector('.js-test-container').innerHTML = `
        <div class="js-header-content"></div>
        <div class="js-order-summary"></div>
        <div class="js-payment-summary"></div>
        `;

        //mock is a fake method to overright real method to a fake method
        spyOn(localStorage, 'getItem').and.callFake(() => {
            //we wanted to getItem return empty arr
            return JSON.stringify([{
            productId: productId1,
            quantity :  2,
            deliveryOptionId : '1'
        },
        {
            productId: productId2,
            quantity :  1,
            deliveryOptionId : '2'

        }]);
        });
        loadFromStorage();

        renderOrderSummary();
    })

    //two things we are testing 
    //how the page looks
    //how the page behaves
    it('displays the cart,', () => {
        
        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(2);
        expect(
            document.querySelector(`.js-product-quantity-${productId1}`).innerText
        ).toContain('Quantity: 2');
        expect(
            document.querySelector(`.js-product-quantity-${productId2}`).innerText
        ).toContain('Quantity: 1');

        document.querySelector('.js-test-container').innerHTML = '';
    });


    it('removes a product', () => {
        document.querySelector(`.js-delete-link-${productId1}`).click();
        expect(
            document.querySelectorAll('.js-cart-item-container').length
        ).toEqual(1);
        expect(
             document.querySelector(`.js-cart-item-container-${productId1}`)
        ).toEqual(null);
        expect(
             document.querySelector(`.js-cart-item-container-${productId2}`)
        ).not.toEqual(null);
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId2)

        // some html clean up at the end of test
        document.querySelector('.js-test-container').innerHTML = '';

    })
});