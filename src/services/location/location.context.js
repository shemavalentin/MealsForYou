import React, { useState, useEffect } from "react";
import { locationRequest, locationTransform } from "./location.service";

export const LocationContext = React.createContext();

// creating the context provider function that will wrapp the app to provide it with certain state

export const LocationContextProvider = ({ children }) => {
  //Defining states needed for the context
  const [keyword, setKeyword] = useState(" ");
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // onSearch function to Perfom search
  const onSearch = (SearchKeyword) => {
    if (!SearchKeyword.length) return;

    setIsLoading(true);

    // Making sure we set the keyword of that search key word
    setKeyword(SearchKeyword);
  };

  // Setting the context determines when it is going to fire the request.
  useEffect(() => {
    const defaultCity = "Kigali";

    if (!keyword.trim().length) {
      // If nothing was typed, use the default

      setKeyword(defaultCity);
      // Don't do anything
      return;
    }

    // then trigger the locationRequest
    locationRequest(keyword.toLowerCase())
      .then(locationTransform)
      .then((result) => {
        setIsLoading(false);
        setLocation(result);
        //console.log(result);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  }, [keyword]);

  // It will return the created context with Provider and the wraps the children
  // and ultimetly allow us to interact with the location service.
  return (
    <LocationContext.Provider
      // then pass it a value
      value={{
        isLoading,
        error,
        location,
        search: onSearch,
        keyword,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
