
import Dashboard from "../Private/Dashboard/Dashboard";
import Profile from "../Private/Profile/Profile";
import Login from "../Public/Login/Login";
import SignUp from "../Public/SignUp/SignUp";
import ForgetPassword from "../Public/ForgetPassword/ForgetPassword";
import LandingPage from "../Public/LandingPage/LandingPage";
import Settings from "../Private/Settings/Settings";
import ChangePassword from "../Private/ChangePassword/ChangePassword";

export const PrivatesRoutes = [
    {
      path: "dashboard",
      element: <Dashboard/>,
      label: "Dashboard",
    },
    {
      path: "profile",
      element: <Profile />,
      label: "Profile",
    },
    {
      path: "settings",
      element: <Settings />,
      label: "Settings",
    },  
    {
      path: "change-password",
      element: <ChangePassword />,
      label: "Change Password",
    },
  ];
  export const PublicRoutes: any = [
    {
      path: "/",
      element: <LandingPage />,
      label: "Home",
    },
    {
      path: "/login",
      element: <Login />,
      label: "Login",
    },
    {
      path: "signup",
      element: <SignUp />,
      label: "Sign Up",
    },
    {
      path: "forget-password",
      element: <ForgetPassword />,
      label: "Forget Password",
    },
  ];