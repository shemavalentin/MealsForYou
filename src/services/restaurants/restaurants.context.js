import React, { useState, createContext, useEffect, useMemo } from "react";

import { restaurantsRequest, restaurantTransform } from "./restaurants.service";

export const RestaurantsContext = createContext();

// creating the context provider function that will wrapp the app to provide it with certain state

export const RestaurantsContextProvider = ({ children }) => {
  return (
    <RestaurantsContext.Provider
      value={{
        restaurants: [1, 2, 3],
      }}
    >
      {/* what will it wrap? it's the children that is destructured off of the props */}

      {children}
    </RestaurantsContext.Provider>
  );
};
