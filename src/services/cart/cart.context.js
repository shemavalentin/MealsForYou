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

  // Setting a state to calculate the total
  const [sum, setSum] = useState(0);

  // persisting the carts
  const saveCart = async (rst, crt, uid) => {
    try {
      const jsonValue = JSON.stringify({ restaurant: rst, cart: crt });
      await AsyncStorage.setItem(`@cart-${uid}`, jsonValue);
    } catch (e) {
      console.log("Error storing", e);
    }
  };

  // Now loading the carts
  const loadCart = async (uid) => {
    try {
      const value = await AsyncStorage.get(`@cart-${uid}`);
      if (value !== null) {
        const { restaurant: rst, cart: crt } = JSON.parse(value);
        setRestaurant(rst);
        setCart(crt);
      }
    } catch (e) {
      console.log("Error storing", e);
    }
  };

  useEffect(() => {
    if (user && user.ui) {
      // if there is a user and has ui, save him with what he has
      loadCart(user.uid);
    }
  }, [user]);

  // Firing the function to save the cart
  useEffect(() => {
    if (user && user.ui) {
      // if there is a user and has ui, save him with what he has
      saveCart(restaurant, cart, user.uid);
    }
  }, [restaurant, cart, user]);

  // Run this useEffect when the user cart changes

  useEffect(() => {
    if (!cart.length) {
      setSum(0);
      return;
    }

    // Otherwise do the summation

    const newSum = cart.reduce((acc, { price }) => {
      return (acc += price);
    }, 0);
    setSum(newSum);
  }, [cart]);

  // Building the function that will add and remove from the cart
  const add = (item, rst) => {
    // rst here is short for restaurant
    if (!restaurant || restaurant.placeId !== rst.placeId) {
      setRestaurant(rst);
      setCart([item]);
    } else {
      // else add items to the cart
      setCart([...cart, item]);
    }
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
        sum,
      }}
    >
      {/* include children to render out everything subsquesntly */}
      {children}
    </CartContext.Provider>
  );
};
