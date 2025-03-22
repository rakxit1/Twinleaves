import { Image, StyleSheet } from "react-native";
import React, { useState } from "react";
import {
  GoogleSignin,
  GoogleSigninButton,
  isSuccessResponse,
} from "@react-native-google-signin/google-signin";
import { SafeAreaView } from "react-native-safe-area-context";
import { Images } from "../assets";
import { useDispatch } from "react-redux";
import { setUserSignIn } from "../store/slices/authSlice";

GoogleSignin.configure();

const SignIn = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const initiateSignIn = async () => {
    setIsLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        dispatch(setUserSignIn(response));
      }
    } catch (error) {
      alert(JSON.stringify(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={Images.LOGO} style={styles.logo} />
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={initiateSignIn}
        disabled={isLoading}
        style={styles.buttonStyle}
      />
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  buttonStyle: {
    marginBottom: 100,
  },
  logo: {
    width: "90%",
    resizeMode: "contain",
  },
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
