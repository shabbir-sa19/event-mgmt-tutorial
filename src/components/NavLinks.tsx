"use client"
import {
  ChevronRight, Calendar, HandPlatter,
  Image,
  IndianRupee,
  LayoutDashboard,
  LogIn,
  MapPin,
  SidebarClose,
  SidebarOpen,
  User,
  ContactRound,
  Utensils, type LucideIcon
} from "lucide-react"

import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "./ui/sidebar"
import Link from "next/link";
import { usePathname } from "next/navigation";

const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  User,
  Utensils,
  HandPlatter,
  IndianRupee,
  Image,
  MapPin,
  LogIn,
  Calendar,
  SidebarClose,
  SidebarOpen,
  ContactRound,
  // add more as needed
};
const pages = [
  { href: "/dashboard", label: "Dashboard", iconName: "LayoutDashboard" },
  { href: "/dashboard/profile", label: "My Profile", iconName: "ContactRound", adminOnly: false },
  { href: "/dashboard/clients", label: "Clients", iconName: "User", adminOnly: true },
  { href: "/dashboard/employees", label: "Employees", iconName: "HandPlatter", adminOnly: true },
  { href: "/dashboard/events", label: "Events", iconName: "Utensils", adminOnly: true },
  { href: "/dashboard/expenses", label: "Expenses", iconName: "IndianRupee", adminOnly: true },
  { href: "/dashboard/gallery", label: "Gallery", iconName: "Image", adminOnly: true },
  { href: "/dashboard/venues", label: "Venues", iconName: "MapPin", adminOnly: true },
  { href: "/dashboard/calendar", label: "Calendar", iconName: "Calendar", adminOnly: true },
];

const NavLinks = ({ role }: { role?: string }) => {
  const path = usePathname();
  const { setOpenMobile } = useSidebar()
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu className="">
        {pages.filter((page) => !page.adminOnly || role === "admin").map((page) => {
          const IconComponent = iconMap[page.iconName];
          return (
            <SidebarMenuItem key={page.href} >
              <SidebarMenuButton render={<Link href={page.href} onClick={() => setOpenMobile(false)} />} isActive={page.href === path}>
                {IconComponent ? <IconComponent /> : <ChevronRight />}
                <span>{page.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}

export default NavLinks