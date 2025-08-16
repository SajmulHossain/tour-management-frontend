import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { role } from "@/constants/constants";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Unauthorized from "@/pages/Unauthorized";
import Verify from "@/pages/Verify";
import type { TRole } from "@/types";
import { generateRoutes } from "@/utils/generateRoutes";
import { withAuth } from "@/utils/withAuth";
import { createBrowserRouter } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";
import Home from "@/pages/Home";
import SingleTour from "@/components/modules/tours/SingleTour";
import Tours from "@/pages/Tours";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "tours",
        Component: Tours
      },
      {
        path: "tours/:id",
        Component: SingleTour
      }
    ],
  },
  {
    path: "/admin",
    Component: withAuth(DashboardLayout, role.superAdmin as TRole),
    children: generateRoutes(adminSidebarItems),
  },
  {
    path: "/user",
    Component: withAuth(DashboardLayout, role.user as TRole),
    children: generateRoutes(userSidebarItems),
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/verify",
    Component: Verify,
  },
  {
    path: "/unauthorized",
    Component: Unauthorized,
  },
]);

export default router;
