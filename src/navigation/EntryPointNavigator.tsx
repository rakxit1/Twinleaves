import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { OnBoardingNavigator, AppNavigator } from ".";
import { selectUserInfo } from "../store/slices/authSlice";
import { useSelector } from "react-redux";

export const EntryPointNavigator = () => {
  const userInfo = useSelector(selectUserInfo);
  return (
    <NavigationContainer>
      {userInfo ? <AppNavigator /> : <OnBoardingNavigator />}
    </NavigationContainer>
  );
};
