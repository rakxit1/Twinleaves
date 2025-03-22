import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { NavStackParams, Screen } from "./TwinLeavesNavigation.type";
import List from "../screens/List";
import Cart from "../screens/Cart";
import Details from "../screens/Details";

const Stack = createNativeStackNavigator<NavStackParams>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

export const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={screenOptions}
      initialRouteName={Screen.LIST}>
      <Stack.Screen name={Screen.LIST} component={List} />
      <Stack.Screen name={Screen.CART} component={Cart} />
      <Stack.Screen name={Screen.DETAILS} component={Details} />
    </Stack.Navigator>
  );
};
