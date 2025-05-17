/* The restaurant navigator is one that is going to be responsible for 
all the navigation that can occur within the restaurant tab
*/

import React from "react";

// createStackNavigator allow screen lay on the top of each other they are as on the stack
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { Platform } from "react-native";

import { RestaurantsScreen } from "../../features/restaurants/screens/restaurants.screen";

import { Text } from "react-native-paper";

const RestaurantStack = createStackNavigator();

export const RestaurantsNavigator = () => {
  return (
    // here I'm allowing the restaurant tab to render multiple screens

    // First screen
    <RestaurantStack.Navigator
      screenOptions={{
        headerShown: false,
        ...(Platform.OS === "ios"
          ? TransitionPresets.ModalPresentationIOS
          : TransitionPresets.ModalSlideFromBottomIOS),
      }}
    >
      {/* The RestaurantStack.Screen will need to consume the RestaurantScreen */}
      <RestaurantStack.Screen
        name="Restaurants"
        component={RestaurantsScreen}
        // options={{ headerShown: false }}
      />

      {/* second screen, 
      The RestaurantStack.Screen will need to consume the RestaurantScreen */}
      <RestaurantStack.Screen
        name="RestaurantDetail"
        component={() => <Text> Restaurant Detail</Text>}
        // options={{ headerShown: false }}
      />
    </RestaurantStack.Navigator>
  );
};
