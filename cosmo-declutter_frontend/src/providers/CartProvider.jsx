import React, { useState, useContext, createContext } from "react";

const CartContext = createContext(null);

class CartItem {
  constructor(item, quantity = 1) {
    this.item = item;
    this.quantity = quantity;
  }
  incrementQuantity() {
    this.quantity++;
  }
  decrementQuantity() {
    this.quantity--;
  }
  get price() {
    return this.item.price * this.quantity;
  }
}

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const existingCart = cart.find((i) => i.item.id === item.id);
    if (existingCart) {
      existingCart.incrementQuantity();
      setCart([...cart]);
      return;
    }
    const newCartItem = new CartItem(item);
    setCart([...cart, newCartItem]);
  };

  const removeFromCart = (item) => {
    const existingCart = cart.find((i) => i.item.id === item.id);
    if (existingCart && existingCart.quantity === 1) {
      setCart(cart.filter((i) => i.item.id !== item.id));
      return;
    } else if (existingCart) {
      existingCart.decrementQuantity();
      setCart([...cart]);
      return;
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export default CartProvider;
