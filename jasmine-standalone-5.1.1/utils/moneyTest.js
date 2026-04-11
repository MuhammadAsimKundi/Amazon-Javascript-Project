import { formatCurrency } from "../../scripts/utils/money.js";

// to make a test suite we use describe() functioin

describe('test suite : formatCurrency', () => {
    //to create a test we use it() function in jasmine
    it('Convert cents into dollars', () => {
        // let us compare a vlaue to antoher value
        expect(formatCurrency(2095)).toEqual('20.95')
    })

    it('Works with zero', () => {
        // let us compare a vlaue to antoher value
        expect(formatCurrency(0)).toEqual('0.00')
    })

    it('rounds down to the nearst cent', () => {
        // let us compare a vlaue to antoher value
        expect(formatCurrency(2000.5)).toEqual('20.01')
    })
})