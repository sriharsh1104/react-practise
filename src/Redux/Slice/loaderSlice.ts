import { createSlice } from "@reduxjs/toolkit";

interface loaderState {
  loader: boolean;
}
const initialState: loaderState = {
  loader: false,
};

export const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    setLoader: (state, action) => {
        console.log('action', action)
      state.loader = action.payload;
    },
  },
});
export const { setLoader } = loaderSlice.actions;
