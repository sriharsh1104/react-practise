import { createSlice } from "@reduxjs/toolkit";

interface UserState {
    user: null | {
        id: string;
        name: string;
        email: string;
        token: string;
    };
}

const initialState = {
  user: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
        state.user = action.payload;
    },
    // logout: (state) => {
    //     state.user = null;
    // },
  },
});
export const { setUser } = userSlice.actions;