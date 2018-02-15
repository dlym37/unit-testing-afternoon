const cart = require('./cart');
const cars = require('./data/cars');

describe('Cart Properties', () => {
    test('cart as empty array', () => {
        expect(cart.cart.length).toEqual(0)
        expect(Array.isArray(cart.cart)).toBeTruthy();
    })
    test('toal should be 0', () => {
        expect(cart.total).toEqual(0);
    })
})

describe('Cart Methods', () => {
    afterEach(function () {
        cart.cart = [];
        cart.total = 0;
    })
    test('addToCart method correctly adding', () => {
        cart.addToCart(cars[0]);
        cart.addToCart(cars[1]);
        
        expect(cart.cart.length).toEqual(2);
        expect(cart.cart[0]).toEqual(cars[0]);
        expect(cart.cart[1]).toEqual(cars[1]);
    })
    test('addToCart correctly increases total', () => {
        cart.addToCart(cars[0]);
        cart.addToCart(cars[1]);
        cart.addToCart(cars[3]);
        
        expect(cart.total).toEqual(cars[0].price + cars[1].price + cars[3].price);
    })
    test('removeFromCart length to decrease and order', ( ) => {
        cart.addToCart(cars[0]);
        cart.addToCart(cars[1]);
        cart.addToCart(cars[3]);
        cart.addToCart(cars[4]);

        cart.removeFromCart(0, cars[0].price); 
        cart.removeFromCart(2, cars[4].price); 

        expect(cart.cart.length).toEqual(2);
        expect(cart.cart[0]).toEqual(cars[1]);
        expect(cart.cart[1]).toBe(cars[3]);
    })
    test('removeFromCart total to decrease', () => {
        cart.addToCart(cars[0]);
        cart.addToCart(cars[1]);
        cart.addToCart(cars[3]);
        cart.addToCart(cars[4]);

        cart.removeFromCart(1, cars[1].price);

        expect(cart.total).toEqual(cars[0].price + cars[3].price + cars[4].price);
    })
    test('checkout going to empty', () => {
        cart.addToCart(cars[0]);
        cart.addToCart(cars[1]);
        cart.addToCart(cars[3]);
        cart.addToCart(cars[4]);

        cart.checkout();

        expect(cart.cart.length).toEqual(0)
        expect(cart.total).toEqual(0);
    })
})