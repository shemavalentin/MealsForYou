import React, { useState, createContext, useEffect, useMemo } from "react";

import {
  restaurantsRequest,
  restaurantsTransform,
} from "./restaurants.service";

export const RestaurantsContext = createContext();

// creating the context provider function that will wrapp the app to provide it with certain state

export const RestaurantsContextProvider = ({ children }) => {
  //Defining states needed for the context
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // with the above three states defined above, we need to hook them up to be controlled.

  // defining the function that will retrieve restaurant when the component mounts

  const retrieveRestaurants = () => {
    // first of all it will show that it is loading
    setIsLoading(true);

    // then set timeout to wait. we are loading our local data there is no latency from outside in the API
    setTimeout(() => {
      restaurantsRequest()
        .then(restaurantsTransform)
        .then((results) => {
          // When we get restaurants, we need to set isLoading to false
          setIsLoading(false);
          setRestaurants(results);
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err);
        });
    }, 2000);
  };
  // Now when this component mount(RestaurantsContextProvider), we need to something
  useEffect(
    () => {
      retrieveRestaurants();
    },
    // this empty array means, run useEffect when the component mounts
    []
  );

  return (
    <RestaurantsContext.Provider
      value={{
        // restaurants: [1, 2, 3, 4, 5, 6, 7],
        restaurants,
        isLoading,
        error,
      }}
    >
      {/* what will it wrap? it's the children that is destructured off of the props */}

      {children}
    </RestaurantsContext.Provider>
  );
};
