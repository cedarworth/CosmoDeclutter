const CartItem = require('../models/cartItem'); // import the CartItem mongoose model

class CartItemService {
    static async createCartItem(cartItem) {
        const newCartItem = new CartItem(cartItem);
        await newCartItem.save();
        return newCartItem;
    }
    static async updateCartItem(id, cartItem) {
        const updatedCartItem = await CartItem.findByIdAndUpdate(id, cartItem, {
            new: true
        });
        return updatedCartItem;
    }
    static async deleteCartItem(id) {
        const deletedCartItem = await CartItem.findByIdAndRemove(id);
        return deletedCartItem;
    }
    static async getCartItems() {
        return await CartItem.find();
    }
    static async getCartItem(id) {
        return await CartItem.findById(id);
    }
}

module.exports = CartItemService;