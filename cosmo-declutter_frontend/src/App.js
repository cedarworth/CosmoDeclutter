import React, { useState } from "react";
import AppRoutes from "./app.routing";
import "./styles.css";
import CartProvider from "./providers/CartProvider";
import UserProvider from "./providers/UserProvider";
import { Provider, defaultTheme } from "@adobe/react-spectrum";
// import { useGetUser } from "./hooks/UseGetUser";

function App() {
  const [cartItems, setCartItems] = useState([]);
  //  global.useGetUser = useGetUser;
  return (
      <UserProvider>
        <CartProvider>
          <Provider theme={defaultTheme}>
          <AppRoutes />
          </Provider>
        </CartProvider>
      </UserProvider>
  );
}

export default App;
