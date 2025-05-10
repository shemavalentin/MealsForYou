import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import { Text } from "react-native";
import { RestaurantsScreen } from "./src/features/restaurants/screens/restaurants.screen";
import { ThemeProvider } from "styled-components/native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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

import { SafeArea } from "./src/components/utility/safe-area.component";

// Implementing the bottom navigation.
const Tab = createBottomTabNavigator();

const Settings = () => (
  <SafeArea>
    <Text></Text>{" "}
  </SafeArea>
);
const Map = () => (
  <SafeArea>
    <Text></Text>{" "}
  </SafeArea>
);

export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
    Lato_700Bold_Italic,
  });

  console.log("Fonts loading status:", oswaldLoaded, latoLoaded);

  // Wait until both fonts are loaded
  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  console.log("Fonts loaded. Rendering app.");

  return (
    <>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Restaurants" component={RestaurantsScreen} />
            <Tab.Screen name="Map" component={Map} />
            <Tab.Screen name="Settings" component={Settings} />
          </Tab.Navigator>
        </NavigationContainer>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
