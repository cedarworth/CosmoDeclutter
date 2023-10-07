import React, { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import axios from "axios";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
import "../styles.css";
import { useCart } from "../providers/CartProvider";
import Footer from "../components/layout/Footer";

const Homepage = () => {
  const navigate = useNavigate();
  const { cart, setCart } = useCart();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://cosmodeclutter-api.onrender.com/api/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="home-top">
        <img src="" alt="" />
      </div>
      <div className="shop" id="shop">
        {products.map((product) => {
          return (
            <ProductCard
              key={product._id}
              product={transformProductObject(product)}
            />
          );
        })}
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Homepage;

function transformProductObject(product) {
  return {
    id: product._id,
    name: product.name,
    price: product.price,
    description: product.description,
    image: product.imgLink,
    location: product.location,
  };
}
