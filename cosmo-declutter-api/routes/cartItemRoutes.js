const router = require('express').Router();

const cartItemController = require('../controllers/cartItemController');

// GET /cart-items
router.get('/', cartItemController.getAllCartItems);

// GET /cart-items/:id
router.get('/:id', cartItemController.getCartItemById);

// POST /cart-items
router.post('/', cartItemController.createCartItem);

// PUT /cart-items/:id
router.put('/:id', cartItemController.updateCartItemById);

// DELETE /cart-items/:id
router.delete('/:id', cartItemController.deleteCartItemById);

module.exports = router;