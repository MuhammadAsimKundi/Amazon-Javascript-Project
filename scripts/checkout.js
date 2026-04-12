//import'../data/backend-practice.js';
import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import { loadProducts, loadProductsFetch } from '../data/products.js';
import { loadCart } from '../data/cart.js';
// to run all the code from this file
// commented it to update Cart class everywhere.
//import '../data/cart-class.js';

//async await
//async make a function return a promise
//async let us use await feature. await let us wait for a promise to finish befor going to next line.
async function loadPage(){

    //await  will wait to finish this line loadproductsfetch line before going to next line. instead of using .then
    await loadProductsFetch();

    const value = await new Promise((resolve) => {
        loadCart(() => {
            resolve('value3');
        })
    });

    renderOrderSummary();
    renderPaymentSummary();

}
loadPage()

/*
//promise.all gonna wait for all the promises to finish before going to the next step
Promise.all([
    //loadproductsFetch return a promise
    loadProductsFetch(),
    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        })
    })

]).then((values) => {
    console.log(values)
    renderOrderSummary();
    renderPaymentSummary();
})
*/

/*
//its a built in class and when we create promise we give it function
new Promise((resolve) => {
    //we wait for loadProducts to finish and then cal resolve to go to next step
    loadProducts( () => {
        resolve('value1');
    });

}).then((value) => {
    console.log(value)

    return new Promise((resolve) => {
        loadCart(() => {
            resolve();
        })
    });

}).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
})
*/

//here promise and callback doing same thing.  as multiple callback cause alot of nesting 

//this gonna save this function inside the parameter fun on product.js. 
// and then after loading all the things we will call the fun.
/*
loadProducts(() => {
    //nesting is callback problem. it make our code difficult
    loadCart(() => {
        renderOrderSummary();
        renderPaymentSummary();
    });
});
*/
