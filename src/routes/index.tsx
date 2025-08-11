import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Verify from "@/pages/Verify";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";
import { withAuth } from "@/utils/withAuth";
import Unauthorized from "@/pages/Unauthorized";
import { role } from "@/constants/constants";
import type { TRole } from "@/types";

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
    Component: DashboardLayout,
    children: generateRoutes(adminSidebarItems),
  },
  {
    path: "/user",
    Component: DashboardLayout,
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
    path: '/unauthorized',
    Component: Unauthorized
  }
]);

export default router;
