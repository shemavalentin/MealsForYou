import React from "react";
import { Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export const AccountNavigator = () => (
  <Stack.Navigator headerMode="none">
    {/* Deciding how screens will be stacked */}
    <Stack.Screen
      name="Main"
      options={{ headerShown: false }}
      component={() => (
        <View>
          <Text>Account Screen</Text>
        </View>
      )}
    />

    <Stack.Screen
      name="Login"
      component={() => (
        <View>
          <Text>Login Screen</Text>
        </View>
      )}
    />
  </Stack.Navigator>
);
