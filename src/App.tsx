import "./App.css";
import Router from "./components/AuthLayout/Router";
import Loader from "./components/Comman/Loader/Loader";
import CommanToast from "./components/Comman/Toaster/CommanToast";

function App() {
  return (
    <>
      <Loader />
      <Router />
      <CommanToast />
    </>
  );
}

export default App;
