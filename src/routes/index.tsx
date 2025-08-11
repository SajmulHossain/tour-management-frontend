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

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "about",
        Component: withAuth(About, role.superAdmin as TRole),
      },
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
