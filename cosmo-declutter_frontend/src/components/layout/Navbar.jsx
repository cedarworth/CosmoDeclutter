import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import "../../styles.css";
import { useCart } from "../../providers/CartProvider";
import { useUser } from "../../providers/UserProvider";

const Navbar = () => {
  const { cart, setCart } = useCart(0);
  const { user, setUser, setIsAuthenticated, isAuthenticated } = useUser();

  // console.log(user);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/home">
          <img
            id="nav-img"
            src="../assets/logo_4.png"
            width="250"
            height="150"
            alt=""
          />
        </Link>
      </div>
      <div className="container">
        <div className="cart" id="cartLoads">
          <Link to="/cart">
            <i className="bi bi-cart2"></i>
            <div id="cartAmount" className="cartAmount">
              {cart.length}
            </div>
          </Link>
        </div>
        <div id="menu" className="menu-list">
          {!isAuthenticated ? (
            <>
              <div className="nav-item">
                <input type="radio" name="nav" id="e" />
                <label htmlFor="e">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </label>
              </div>
            </>
          ) : (
            <>
              <div className="nav-item">
                <input type="radio" name="nav" id="e" />
                <label htmlFor="e">
                  <Link to={`/profile`} onClick={()=>{setUser({user}); setIsAuthenticated(true)}} className="nav-link">
                    Profile
                  </Link>
                </label>
              </div>
              <div className="nav-item">
                <input type="radio" name="nav" id="f" />
                <label htmlFor="f">
                  <Link to="/login" className="nav-link" onClick={()=>{setUser({}); setIsAuthenticated(false)}}>
                    Logout
                  </Link>
                </label>
              </div>
            </>
          )}
        </div>{" "}
        {/* Closing tag for "menu-list" div */}
        <Sidebar user={user} />
      </div>{" "}
      {/* Closing tag for "container" div */}
    </header>
  );
};

export default Navbar;
