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
import TourDetails from "@/components/modules/tours/TourDetails";
import Tours from "@/pages/Tours";
import Booking from "@/pages/Booking";
import Payment from "@/pages/payment/Payment";
import PaymentSuccess from "@/pages/payment/PaymentSuccess";
import PaymentFailed from "@/pages/payment/PaymentFailed";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "tours",
        Component: Tours,
      },
      {
        path: "tours/:id",
        Component: TourDetails,
      },
      {
        path: "booking/:id",
        Component: Booking,
      },
      {
        path: "/payment",
        Component: Payment,
        children: [
          {
            path: "success",
            Component: PaymentSuccess,
          },
          {
            path: "fail",
            Component: PaymentFailed,
          },
          {
            path: "cancel",
            Component: PaymentFailed,
          },
        ],
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
