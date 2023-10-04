import React from "react";
import {Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductPage from "./pages/ProductPage";
import { useUser } from "./providers/UserProvider";
// import ProtectedRoute from "./components/hocs/ProtectedRoute";

const AppRoutes = () => {
  const { user} = useUser();
  // console.log(isAuthenticated);
  return (
    <Routes>
      <Route path={"/home"} element={<Homepage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/profile" element={<ProfilePage user={user} />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/product" element={<ProductPage user={user} />} />
      {/* <Route path='*' element={<h1>Error 404: Page not found</h1>} /> */}
    </Routes>
  );
};

export default AppRoutes;
