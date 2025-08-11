import * as React from "react"

import Logo from "@/assets/icons/Logo"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { getSidebarItems } from "@/utils/getSidebarItems"
import { Link } from "react-router"
import { authApi, useGetMeQuery, useLogoutMutation } from "@/redux/features/auth/auth.api"
import { Button } from "./ui/button"
import { useAppDispatch } from "@/redux/hooks"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {data: userInfo} = useGetMeQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const data = {
    navMain: getSidebarItems(userInfo?.data?.role),
  };

  const handleLogout = () => {
    logout(null);
    dispatch(authApi.util.resetApiState());
  }
  
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link to="/">
          <Logo />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        <Button onClick={handleLogout} className="mt-auto mx-2 mb-2" variant={"destructive"}>Logout</Button>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
