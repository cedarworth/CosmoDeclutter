import React, { useState, useContext, createContext } from "react";

const CartContext = createContext(null);

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  return <CartContext.Provider value={{cart, setCart}}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);

export default CartProvider;
