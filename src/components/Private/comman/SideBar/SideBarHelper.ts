import { PrivatesRoutes } from "../../../AuthLayout/RoutesHelper";

export const withAuth = [
    {
      key: "dashboard",
      label: "Dashboard",
      to: PrivatesRoutes[0].path,
    },
    {
      key: "profile",
      label: "Profile",
      to: PrivatesRoutes[1].path,
    },
  ];