import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";
import App from "./App.tsx";
import { persistor, store } from "./Redux/store.ts";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSelector((state: any) => state.theme.theme);
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
  return <>{children}</>;
}

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    
    <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
