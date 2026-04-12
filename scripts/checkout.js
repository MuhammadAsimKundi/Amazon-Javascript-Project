//import'../data/backend-practice.js';
import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import { loadProducts } from '../data/products.js';
// to run all the code from this file
// commented it to update Cart class everywhere.
//import '../data/cart-class.js';

//this gonna save this function inside the parameter fun on product.js. 
// and then after loading all the things we will call the fun.
loadProducts(() => {
    renderOrderSummary();
    renderPaymentSummary();
});
