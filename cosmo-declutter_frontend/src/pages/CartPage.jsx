import React, { useState } from "react";
import Navbar from "../components/layout/Navbar";
import { useCart } from "../providers/CartProvider";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  const { cart } = useCart();

  console.log(cart);

  const handleRemoveFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const uniqueCart = cart.filter((item, index) => {
    return cart.indexOf(item) === index;
  });

  const checkForDuplicates = (itemId) => {
    let count = 0;
    cart.forEach((item, index) => {
      if (item._id === itemId) {
        count++;
      }
    });
    return count;
  };

  return (
    <div>
    <Navbar />
    <div className="top-cart">
      {cart.length === 0 ? (
        <>
        <h3>Your cart is empty.</h3>
        <Link to="/home"><button className="top-cart-but">Return Home</button></Link>
        </>
      ) : (
        uniqueCart.map((item, index) => (
        <>
        <h1>Here are your selected items for purchase</h1>
        <div className="cart-grid">
            <div className="cart-inner">
            <div className="cart_item_img">
                <img className="cart_item-img" src={`/assets/${item.imgLink.filename}`} alt="Product" />
            </div>
            <div key={index} className="cart-item">
              <h3>{item.name}</h3>
              <p>Price: {item.price}</p>

              <p>Quantity: {checkForDuplicates(item._id)}</p>
              {checkForDuplicates(item._id) > 1 ? (
                <>
                <p>Total: {checkForDuplicates(item._id) * item.price}</p>
                <button onClick={() => handleRemoveFromCart(item.id)}>
                  Remove from CartPage 
                </button>
                </>
               ) : (
                <p>Total: {item.price}</p>
              )}
              
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
