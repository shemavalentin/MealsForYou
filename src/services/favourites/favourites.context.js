import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthenticationContext } from "../../services/authentication/authentication.context";

export const FavouritesContext = createContext();

export const FavouritesContextProvider = ({ children }) => {
  const { user, isLoading: authLoading } = useContext(AuthenticationContext);
  const [favourites, setFavourites] = useState([]);

  const saveFavourites = async (value, uid = user?.uid) => {
    if (!uid) return;
    try {
      const key = `@favourites-${uid}`;
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      console.log("✅ Favourites saved for UID:", uid);
    } catch (e) {
      console.log("❌ Error saving favourites:", e);
    }
  };

  const loadFavourites = async (uid) => {
    try {
      const key = `@favourites-${uid}`;
      const jsonValue = await AsyncStorage.getItem(key);
      const loaded = jsonValue != null ? JSON.parse(jsonValue) : [];
      setFavourites(loaded);
      console.log("📦 Loaded favourites for UID:", uid, loaded);
    } catch (e) {
      console.log("❌ Error loading favourites:", e);
    }
  };

  const addToFavourites = (restaurant) => {
    const uid = user?.uid || user?.user?.uid;
    if (!uid) return;

    const updated = [...favourites, restaurant];
    setFavourites(updated);
    saveFavourites(updated, uid);
  };

  const removeFromFavourites = (restaurant) => {
    const uid = user?.uid;
    if (!uid) return;

    const updated = favourites.filter((x) => x.placeId !== restaurant.placeId);
    setFavourites(updated);
    saveFavourites(updated, uid);
  };

  // Wait for authentication to finish before reacting
  useEffect(() => {
    if (authLoading) return;

    if (user?.uid) {
      loadFavourites(user.uid);
    } else {
      setFavourites([]); // clear only when sure there’s no user
    }
  }, [authLoading, user]);

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        addToFavourites,
        removeFromFavourites,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
