import React, { useState, useContext, createContext, useEffect } from "react";

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
    localStorage.setItem("cosmo-cart", JSON.stringify([...cart, newCartItem]));
  };

  const removeFromCart = (item) => {
    const existingCart = cart.find((i) => i.item.id === item.id);
    if (existingCart && existingCart.quantity === 1) {
      setCart(() => {
        const newCart = cart.filter((i) => i.item.id !== item.id);
        localStorage.setItem("cosmo-cart", JSON.stringify(newCart));
        return newCart;
      });
      return;
    } else if (existingCart) {
      existingCart.decrementQuantity();
      setCart([...cart]);
      return;
    }
  };

  const clearCart = () => {
    setCart([])
    localStorage.removeItem("cosmo-cart")
  }

  useEffect(() => {
    const cart = localStorage.getItem("cosmo-cart");
    const parsedCart = JSON.parse(cart) || [];
    const mappedCart = parsedCart.map(cartObj => {
      return new CartItem(cartObj.item, cartObj.quantity)
    })
    setCart(mappedCart)
  }, []);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export default CartProvider;
