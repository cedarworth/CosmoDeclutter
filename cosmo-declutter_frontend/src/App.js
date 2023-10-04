import React, { useState } from "react";
import AppRoutes from "./app.routing";
import "./styles.css";
import CartProvider from "./providers/CartProvider";
import UserProvider from "./providers/UserProvider";
// import { useGetUser } from "./hooks/UseGetUser";

function App() {
  const [cartItems, setCartItems] = useState([]);
  //  global.useGetUser = useGetUser;
  return (
      <UserProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </UserProvider>
  );
}

export default App;
