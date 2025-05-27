/* 
This component is going to be storing our favirites
*/

import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const FavouritesContext = createContext();

// export the FavouritesContextProvider function that is going to
// to wrap the react tree or the app.js in order for us to be able to
// supply the favourites to the tree of react.

export const FavouritesContextProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  // Saving Favourites in the cash
  const saveFavourites = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      // the @favourites is the storage key here
      await AsyncStorage.setItem("@favourites", jsonValue);
    } catch (e) {
      console.log("Error storing", e);
    }
  };

  // Reading the Favourites from the storage
  const loadFavourites = async () => {
    try {
      const value = await AsyncStorage.getItem("@favourites");
      if (value !== null) {
        // value previously stored, then the JSON should perse it
        setFavourites(JSON.parse(value));
      }
    } catch (e) {
      // error reading value
      console.log("Error loading", e);
    }
  };

  // Each time a user decides that they want to add a favorite we need to set up something to add and remove favourite
  const add = (restauranat) => {
    setFavourites([...favourites, restauranat]);
  };

  const remove = (restaurant) => {
    const newFavourites = favourites.filter(
      (x) => x.placeId !== restaurant.placeId
    );

    setFavourites(newFavourites);
  };

  // Let's now on the very first mount of the context, make sure that we load the initial favourites.
  useEffect(() => {
    loadFavourites();
  }, []);

  // Let's now listen on Favourites and whenever there is any change on favourites, we store it
  useEffect(() => {
    saveFavourites(favourites);
  }, [favourites]);
  return (
    <FavouritesContext.Provider
      // Providing our provider the value that it is going to provide externally and that value is important because it is the shape that is going to go to the outside of the component
      value={{
        favourites,
        addToFavourites: add,
        removeFromFavourites: remove,
      }}
    >
      {/* Now inside here we are going to render our children */}

      {children}
    </FavouritesContext.Provider>
  );
};
