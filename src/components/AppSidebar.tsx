"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import NavLinks from "./NavLinks"
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "./ui/avatar"
import { authClient } from "@/lib/auth-client";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = authClient.useSession();
  const userName = session?.user.name || "User Name";
  const avatar = session?.user.image;
  return (
    <Sidebar collapsible="icon" variant="inset" {...props} className="">
      <SidebarHeader >
      </SidebarHeader>

      <SidebarContent>
        <NavLinks />
        <SidebarGroup>

        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
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
              <div className="">
                <span className="truncate font-medium">{userName}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />

    </Sidebar>
  )
}