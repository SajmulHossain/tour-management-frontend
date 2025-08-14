// import AddTour from "@/pages/admin/AddTour";
import AddDivision from "@/components/modules/admin/Division/AddDivision";
import AddTourType from "@/pages/admin/AddTourType";
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
      {
        title: "Add Tour Type",
        url: "add-tour-type",
        component: AddTourType
      },
      {
        title: "Add Division",
        url: "add-division",
        component: AddDivision
      }
    ],
  }
];
