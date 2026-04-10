import { formatCurrency } from "../scripts/utils/money.js";

// Group of related tests is call test suite. to group related tests
console.log('test suite: formateCurrency')

// situition testing is called test case
//converts cents into dollars
console.log('converts cents into dollars')
if (formatCurrency(2095) === '20.95'){
    console.log('passed');
}else{
    console.log('failed');
}

// works with zero
console.log('works with zero')


if (formatCurrency(0) === '0.00'){
    console.log('passed');
}else{
    console.log('failed');
}

//rounds down to the nearst cent
console.log('rounds down to the nearst cent')

if (formatCurrency(2000.5) === '20.01'){
    console.log('passed');
}else{
    console.log('failed');
}