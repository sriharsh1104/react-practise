import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";
import App from "./App.tsx";
import { persistor, store } from "./Redux/store.ts";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Loader from './components/Comman/Loader/Loader.tsx';
import CommanToast from './components/Comman/Toaster/CommanToast.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    
    <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Loader />
        <CommanToast/>
        <App />
      </PersistGate>
    </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
