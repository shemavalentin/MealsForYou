// authentication.context.js

import React, { useEffect, createContext, useState } from "react";
import { loginRequest, registerRequest, auth } from "./authentication.service";
import { onAuthStateChanged, signOut } from "firebase/auth";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true); // initially true to wait for rehydration
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      console.log("✅ Firebase session rehydrated:", usr);
      setUser(usr || null);
      setIsLoading(false); // done after auth state is known
    });

    return unsubscribe;
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

  const onRegister = (email, password, repeatedPassword) => {
    setIsLoading(true);
    setError(null);
    if (password !== repeatedPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

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
        error,
        onLogin,
        onLogout,
        onRegister,
        isLoading, // this now reflects hydration as well
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
