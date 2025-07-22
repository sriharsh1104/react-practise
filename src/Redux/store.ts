import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./Slice/userSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import { loaderSlice } from "./Slice/loaderSlice";


const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user","loader"],
};

const rootReducer = combineReducers({
  user: userSlice.reducer,
  loader:loaderSlice.reducer
});
export const store = configureStore({
  devTools: false,
  reducer: persistReducer(persistConfig, rootReducer),

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
