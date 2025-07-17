import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticationContext } from "../authentication/authentication.context";

// Storing the carts
export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  // Pulling the user off of the authentication context
  const { user } = useContext(AuthenticationContext);

  // Now we can use everything the user has
  const [cart, setCart] = useState([]);
  const [restaurant, setRestaurant] = useState(null);

  // Building the function that will add and remove from the cart
  const add = (item, rst) => {
    // rst here is short for restaurant
    if (!restaurant || restaurant.placeId !== rst.placeId) {
      setRestaurant(rst);
      setCart([item]);
    }

    // else add items to the cart
    setCart([...cart, item]);
  };

  // Building a clear fuction to clear the cart
  const clear = () => {
    setCart([]);
    setRestaurant(null);
  };

  return (
    <CartContext.Provider
      value={{
        addToCart: add,
        clearCart: clear,
        restaurant,
        cart,
      }}
    >
      {/* include children to render out everything subsquesntly */}
      {children}
    </CartContext.Provider>
  );
};
