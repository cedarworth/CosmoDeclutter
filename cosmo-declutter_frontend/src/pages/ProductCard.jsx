import React, { useState } from 'react';
import '../styles.css';
import { useCart } from '../providers/CartProvider';

function ProductCard({name, description, price, image, location, product}) {
  const {cart, setCart} = useCart()

  const [count, setCount] = useState(0);

    const addToCart = () => {
        setCount(count + 1);
        setCart([...cart, product])
        console.log(cart)
    };

    const removeFromCart = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

  return (
    <div className="card">
      <img src={`/assets/${image}`} alt="Product" />
      {/* {image && <img src={image} alt="Preview" />} */}
      <div className="info">
        <h2>{name}</h2>
        <p>{description}</p>
        <p>{price}</p>
        <p>{location}</p>
        <div className="buttons">
            <i class="bi bi-cart4">Add tocart:</i>
            <div className="quantity">
                <i class="bi bi-dash-lg" onClick={removeFromCart}></i>
                <span className="quantity">{count}</span>
                <i class="bi bi-plus-lg" onClick={addToCart}></i>
            </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
