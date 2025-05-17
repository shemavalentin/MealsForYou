/* The restaurant navigator is one that is going to be responsible for 
all the navigation that can occur within the restaurant tab
*/

import React from "react";

// createStackNavigator allow screen lay on the top of each other they are as on the stack
import { createStackNavigator } from "@react-navigation/stack";

import { RestaurantsScreen } from "../../features/restaurants/screens/restaurants.screen";

const RestaurantStack = createStackNavigator();

export const RestaurantsNavigator = () => {
  return (
    <RestaurantStack.Navigator screenOptions={{ headerShown: false }}>
      {/* The RestaurantStack.Screen will need to consume the RestaurantScreen */}
      <RestaurantStack.Screen
        name="Restaurants"
        component={RestaurantsScreen}
        // options={{ headerShown: false }}
      />
    </RestaurantStack.Navigator>
  );
};
