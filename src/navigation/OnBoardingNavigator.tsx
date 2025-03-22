import React from "react";
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import {
  OnBoardingParams,
  OnBoardingScreen,
} from "./TwinLeavesNavigation.type";
import SignIn from "../screens/SignIn";

const Stack = createNativeStackNavigator<OnBoardingParams>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

export const OnBoardingNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name={OnBoardingScreen.SIGN_IN} component={SignIn} />
    </Stack.Navigator>
  );
};
