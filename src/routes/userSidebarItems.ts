import Bookings from "@/pages/user/Bookings";
import type { ISidebarItem } from "@/types";

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "Bookings",
    items: [
      {
        title: "Bookings",
        url: "bookings",
        component: Bookings,
      },
    ],
  },
];
