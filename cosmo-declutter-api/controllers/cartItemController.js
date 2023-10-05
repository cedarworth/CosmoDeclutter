const cartItemService = require("../services/cartItemService");

// Controller to get all cart items
exports.getAllCartItems = async (req, res) => {
    try {
        const cartItems = await cartItemService.getCartItems();
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to get a single cart item by id
exports.getCartItemById = async (req, res) => {
    try {
        const cartItem = await cartItemService.getCartItem(req.params.id);
        res.status(200).json(cartItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to create a new cart item
exports.createCartItem = async (req, res) => {
    try {
        const cartItem = await cartItemService.createCartItem(req.body);
        res.status(201).json(cartItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to update a cart item by id
exports.updateCartItemById = async (req, res) => {
    try {
        const cartItem = await cartItemService.updateCartItem(req.params.id, req.body);
        res.status(200).json(cartItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to delete a cart item by id
exports.deleteCartItemById = async (req, res) => {
    try {
        await cartItemService.deleteCartItem(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
