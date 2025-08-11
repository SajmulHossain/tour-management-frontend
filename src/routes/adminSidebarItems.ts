// import AddTour from "@/pages/admin/AddTour";
import Analytics from "@/pages/admin/Analytics";
import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const AddTour = lazy(() => import("@/pages/admin/AddTour"));

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "analytics",
        component: Analytics
      },
    ],
  },
  {
    title: "Tour Management",
    items: [
      {
        title: "Add Tour",
        url: "add-tour",
        component: AddTour
      },
    ],
  }
];
