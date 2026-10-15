"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import NavLinks from "./NavLinks"
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "./ui/avatar"
import { authClient } from "@/lib/auth-client";
import { Utensils } from "lucide-react";
import Link from "next/link";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = authClient.useSession();
  const userName = session?.user.name || "User Name";
  const userEmail = session?.user.email || "";
  const avatar = session?.user.image;
  const userRole = session?.user.role === "admin" ? "Administrator" : "Employee";
  return (
    <Sidebar collapsible="icon" variant="inset" {...props} className="">
      <SidebarHeader >
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton render={<Link href={"/"} />}>
              <Utensils />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{process.env.APP_NAME}</span>
                <span className="truncate text-xs">{ }</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavLinks role={session?.user.role} />
      </SidebarContent>

      <SidebarFooter className="m-0">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={avatar || ""}
                  alt="avatar"
                  className=""
                />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                <AvatarBadge className="bg-green-600 dark:bg-green-800" />
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{userName}</span>
                <span className="truncate text-xs">{userEmail}</span>
                <span className="truncate text-xs text-muted-foreground">{userRole}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />

    </Sidebar>
  )
}