// authentication.context.js

import React, { useEffect, createContext, useState } from "react";
import { loginRequest, registerRequest } from "./authentication.service";

// create context
export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const onLogin = (email, password) => {
    setIsLoading(true);
    loginRequest(email, password)
      .then((u) => {
        setUser(u);
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
  };

  // Setting Up the Registration

  const onRegister = (email, password, repeatedPassword) => {
    setError(null);
    if (password !== repeatedPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    registerRequest(email, password)
      .then((u) => {
        setUser(u.user);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  };
  /*
  // Track auth state
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((usr) => {
      if (usr) {
        setUser(usr);
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);
*/
  const isAuthenticated = !!user;

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        error,
        onLogin,
        onRegister,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
