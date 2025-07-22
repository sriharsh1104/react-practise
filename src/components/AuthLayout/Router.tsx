import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Login from "../Public/Login/Login";
import SignUp from "../Public/SignUp/SignUp";
import ForgetPassword from "../Public/ForgetPassword/ForgetPassword";
import Dashboard from "../Private/Dashboard/Dashboard";
import Profile from "../Private/Profile/Profile";
import AuthGaurd from "../AuthGaurd/AuthGaurd";
import NoAuthGaurd from "../AuthGaurd/NoAuthGaurd";
import LandingPage from "../Public/LandingPage/LandingPage";

const Router = () => {
  const PrivatesRoutes = [
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "profile",
      element: <Profile />,
    },
  ];
  const PublicRoutes: any = [
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "signup",
      element: <SignUp />,
    },
    {
      path: "forget-password",
      element: <ForgetPassword />,
    },
  ];
  const routers = [
    {
      path: "/",
      element: <NoAuthGaurd />,
      children: [...PublicRoutes],
    },
    {
      path: "/auth",
      element: <AuthGaurd />,
      children: [...PrivatesRoutes],
    },
  ];
  const router = createBrowserRouter(routers);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default Router;
