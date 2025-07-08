import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "@expo/vector-icons/Ionicons";

// Navigators
import { RestaurantsNavigator } from "./restaurants.navigator";
import { SettingsNavigator } from "./settings.navigator";

// Screens
import { MapScreen } from "../../features/map/screens/map.screen";
import { CheckoutScreen } from "../../features/checkout/screens/checkout.screen";
import { RestaurantDetailScreen } from "../../features/restaurants/screens/restaurant-detail.screen";

// Context Providers
import { RestaurantsContextProvider } from "../../services/restaurants/restaurants.context";
import { LocationContextProvider } from "../../services/location/location.context";
import { FavouritesContextProvider } from "../../services/favourites/favourites.context";

import { CameraScreen } from "../../features/settings/screens/camera.screen";

// Navigators
const Tab = createBottomTabNavigator();
const AppStack = createStackNavigator();

const TAB_ICON = {
  Restaurants: "restaurant",
  Map: "map",
  Checkout: "cart-sharp",
  Settings: "settings",
};

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];

  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
    headerShown: false,
  };
};

// Bottom tab navigator
const BottomTabNavigator = () => (
  <Tab.Navigator
    screenOptions={createScreenOptions}
    tabBarOptions={{
      activeTintColor: "tomato",
      inactiveTintColor: "gray",
    }}
  >
    <Tab.Screen name="Restaurants" component={RestaurantsNavigator} />
    <Tab.Screen name="Checkout" component={CheckoutScreen} />
    <Tab.Screen name="Map" component={MapScreen} />
    <Tab.Screen name="Settings" component={SettingsNavigator} />
  </Tab.Navigator>
);

// App root navigator with global RestaurantDetail screen
export const AppNavigator = () => (
  <FavouritesContextProvider>
    <LocationContextProvider>
      <RestaurantsContextProvider>
        <AppStack.Navigator screenOptions={{ headerShown: false }}>
          {/* Main Tabs */}
          <AppStack.Screen name="Main" component={BottomTabNavigator} />

          {/* Global Restaurant Detail Screen */}
          <AppStack.Screen
            name="RestaurantDetail"
            component={RestaurantDetailScreen}
          />

          <AppStack.Screen name="CameraScreen" component={CameraScreen} />
        </AppStack.Navigator>
      </RestaurantsContextProvider>
    </LocationContextProvider>
  </FavouritesContextProvider>
);
