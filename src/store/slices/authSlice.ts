import { SignInResponse } from "@react-native-google-signin/google-signin";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface InitialStateType {
  userInfo: SignInResponse | null;
}

const initialState: InitialStateType = { userInfo: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignOut: (state) => {
      state.userInfo = null;
    },
    setUserSignIn: (state, action: PayloadAction<SignInResponse>) => {
      state.userInfo = action.payload;
    },
  },
});

export const { setSignOut, setUserSignIn } = authSlice.actions;

export const selectUserInfo = (state: RootState) => state.auth.userInfo;

export default authSlice.reducer;
