import React, { useState, useEffect } from "react";
import "react-native-gesture-handler";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import {
  useFonts as useLato,
  Lato_400Regular,
  Lato_700Bold_Italic,
} from "@expo-google-fonts/lato";
import { theme } from "./src/infrastructure/theme";
import { Navigation } from "./src/infrastructure/navigation/index";

import { RestaurantsContextProvider } from "./src/services/restaurants/restaurants.context";
import { LocationContextProvider } from "./src/services/location/location.context";
import { FavouritesContextProvider } from "./src/services/favourites/favourites.context";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDuZsXE10A0-9cy7wIYxyVg3dApf5_o258",
  authDomain: "mealsforyou-d1a77.firebaseapp.com",
  projectId: "mealsforyou-d1a77",
  storageBucket: "mealsforyou-d1a77.firebasestorage.app",
  messagingSenderId: "595776631693",
  appId: "1:595776631693:web:d9c4c89a0cc16772a903c4",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Correct way to get auth instance

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Then implement the useEffect
  useEffect(() => {
    setTimeout(() => {
      signInWithEmailAndPassword(auth, "valentin@shema.io", "test123")
        .then((u) => {
          setIsAuthenticated(true);
        })
        .catch((e) => {
          console.log("Sign-in error:", e);
        });
    }, 2000);
  }, []);

  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
    Lato_700Bold_Italic,
  });

  // Wait until both fonts are loaded
  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  // Let's now add a short hand
  if (!isAuthenticated) return null;

  return (
    <>
      <ThemeProvider theme={theme}>
        <FavouritesContextProvider>
          <LocationContextProvider>
            <RestaurantsContextProvider>
              <Navigation />
            </RestaurantsContextProvider>
          </LocationContextProvider>
        </FavouritesContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
