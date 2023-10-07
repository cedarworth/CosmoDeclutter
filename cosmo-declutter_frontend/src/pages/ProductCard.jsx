import React, { useState, useEffect } from "react";
import "../styles.css";
import { useCart } from "../providers/CartProvider";

function ProductCard({ product }) {
  const { addToCart, removeFromCart, cart } = useCart();
  const [count, setCount] = useState(0);

  useEffect(() => {
    const foundProduct = cart.find(i => i.item.id === product.id)
    if (!!foundProduct) {
      setCount(foundProduct.quantity)
    }
  }, [cart])

  return (
    <div className="card">
      <img src={product.image} alt="Product" />
      {/* {image && <img src={image} alt="Preview" />} */}
      <div className="info">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>{product.price}</p>
        <p>{product.location}</p>
        <div className="buttons">
          <i className="bi bi-cart4">Add tocart:</i>
          <div className="quantity">
            <i
              className="bi bi-dash-lg"
              onClick={() => {
                setCount((prevCount) => {
                  return prevCount < 1 ? 0 : prevCount - 1;
                });
                removeFromCart(product);
              }}
            ></i>
            <span className="quantity">{count}</span>
            <i
              className="bi bi-plus-lg"
              onClick={() => {
                setCount((prevCount) => {
                  return prevCount + 1;
                });
                addToCart(product);
              }}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
