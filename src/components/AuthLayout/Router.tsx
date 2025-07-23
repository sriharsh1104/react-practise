import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import NoAuthGaurd from "../AuthGaurd/NoAuthGaurd";
import AuthGaurd from "../AuthGaurd/AuthGaurd";
import { PrivatesRoutes, PublicRoutes } from "./RoutesHelper";

const Router = () => {
 
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
