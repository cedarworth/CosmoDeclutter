import React, { useState } from "react";
import Navbar from "../components/layout/Navbar";
import { useCart } from "../providers/CartProvider";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart } = useCart();

  console.log(cart);

  return (
    <div>
      <Navbar />
      <div className="top-cart">
        {cart.length === 0 ? (
          <>
            <h3>Your cart is empty.</h3>
            <Link to="/home">
              <button className="top-cart-but">Return Home</button>
            </Link>
          </>
        ) : (
          cart.map((i, index) => (
            <>
              <h1>Here are your selected items for purchase</h1>
              <div className="cart-grid">
                <div className="cart-inner">
                  <div className="cart_item_img">
                    <img
                      className="cart_item-img"
                      src={`/assets/${i.item.image}`}
                      alt="Product"
                    />
                  </div>
                  <div key={index} className="cart-item">
                    <h3>{i.item.name}</h3>
                    <p>Price: {i.item.price}</p>

                    <p>Quantity: {i.quantity}</p>
                    
                      <p>Total: {i.price}</p>
                    
                  </div>
                </div>
              </div>
            </>
          ))
        )}
      </div>
    </div>
  );
};

export default CartPage;
