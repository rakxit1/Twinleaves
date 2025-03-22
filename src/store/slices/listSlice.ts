import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ProductData, CartAction } from "../../types/types";

interface CartItem {
  id: number;
  qty: number;
}

interface InitialStateType {
  listData: ProductData | null;
  cart: CartItem[];
}

const initialState: InitialStateType = {
  listData: null,
  cart: [],
};

const listDataSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    setDataReset: () => initialState,
    setInitdData: (state, action: PayloadAction<ProductData>) => {
      state.listData = action.payload;
    },
    setCartItem: (state, action: PayloadAction<CartAction>) => {
      const { id, type } = action.payload;
      const existingCartItem = state?.cart?.find((item) => item.id === id);
      if (existingCartItem) {
        if (type === "INCREASE") {
          existingCartItem.qty += 1;
        } else if (type === "DECREASE" && existingCartItem.qty !== 0) {
          if (existingCartItem.qty === 1) {
            state.cart = state.cart.filter((item) => item.id !== id);
          } else {
            existingCartItem.qty -= 1;
          }
        }
      } else {
        state.cart.push({ id, qty: 1 });
      }
    },
  },
});

export const { setDataReset, setInitdData, setCartItem } =
  listDataSlice.actions;

export const selectListData = (state: RootState) => state.list.listData;
export const selectCart = (state: RootState) => state.list.cart;
export const selectTotalQty = (state: RootState) =>
  state.list.cart.reduce((sum, item) => sum + item.qty, 0);

export default listDataSlice.reducer;
