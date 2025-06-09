// authentication.context.js

import React, { useEffect, createContext, useState } from "react";
import { loginRequest, registerRequest, auth } from "./authentication.service";
import { onAuthStateChanged, signOut } from "firebase/auth";

// create context
export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  // Set the Firebase Session persistance so that the when the user is logged in and there is a reload he will stay logged in.

  //  Check if user is already authenticated on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      if (usr) {
        setUser(usr);
      }
      setIsLoading(false);
    });

    return unsubscribe; // Clean up listener on unmount
  }, []);

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
    setIsLoading(true);
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

  // const onLogout = () => {
  //   signOut(auth)
  //     .then(() => {
  //       setUser(null);
  //     })
  //     .catch((error) => {
  //       // optionally handle error
  //       console.log("Logout error:", error);
  //     });
  // };

  const onLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthenticationContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        error,
        onLogin,
        onLogout,
        onRegister,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
