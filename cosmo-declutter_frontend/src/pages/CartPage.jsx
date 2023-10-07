import React, { useState } from "react";
import Navbar from "../components/layout/Navbar";
import { useCart } from "../providers/CartProvider";
import { Link } from "react-router-dom";
import {Button} from "@adobe/react-spectrum"


let nairaString = Intl.NumberFormat("en-US", {
  style: 'currency',
  currency: 'NGN',
  minimumFractionDigits: 2,
})

const CartPage = () => {
  const { cart, clearCart } = useCart();

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
          <>
            <h1>Here are your selected items for purchase</h1>
            <Button variant={"accent"} style={"outline"} onPress={clearCart}>Clear Cart</Button>
            {cart.map((i, index) => (
            <React.Fragment key={i.item.id}>
              <div className="cart-grid">
                <div className="cart-inner">
                  <div className="cart_item_img">
                    <img
                      className="cart_item-img"
                      src={i.item.image}
                      alt="Product"
                    />
                  </div>
                  <div key={index} className="cart-item">
                    <h3>{i.item.name}</h3>
                    <p>Price: {nairaString.format(i.item.price)}</p>

                    <p>Quantity: {i.quantity}</p>

                    <p>Total: {nairaString.format(i.price)}</p>
                  </div>
                </div>
              </div>
            </React.Fragment>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
