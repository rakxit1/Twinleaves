import type { RouteProp } from "@react-navigation/native";
import { Product } from "../types/types";

export enum Screen {
  CART = "CART",
  LIST = "LIST",
  DETAILS = "DETAILS",
}

export enum OnBoardingScreen {
  SIGN_IN = "SIGN_IN",
}

export type OnBoardingParams = {
  [OnBoardingScreen.SIGN_IN]: undefined;
};

export type NavStackParams = {
  [Screen.CART]: undefined;
  [Screen.LIST]: undefined;
  [Screen.DETAILS]: DetailsParam;
};

type DetailsParam = {
  productDetail: Product;
};

export type DetailsRoute = RouteProp<NavStackParams, Screen.DETAILS>;
