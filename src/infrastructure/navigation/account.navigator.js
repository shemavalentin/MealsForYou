import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { AccountScreen } from "../../features/account/screen/account.screen";
import { LoginScreen } from "../../features/account/screen/login.screen";
import { RegisterScreen } from "../../features/account/screen/register.screen";

const Stack = createStackNavigator();

export const AccountNavigator = () => (
  <Stack.Navigator headerMode="none">
    {/* Deciding how screens will be stacked */}
    <Stack.Screen
      name="Main"
      options={{ headerShown: false }}
      component={AccountScreen}
    />
    <Stack.Screen
      name="Login"
      options={{ headerShown: false }}
      component={LoginScreen}
    />
    <Stack.Screen
      name="Register"
      options={{ headerShown: false }}
      component={RegisterScreen}
    />
  </Stack.Navigator>
);
