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
  // add more as needed
};
type Props = {}
const pages = [
  { href: "/dashboard", label: "Dashboard", iconName: "LayoutDashboard" },
  { href: "/dashboard/clients", label: "Clients", iconName: "User" },
  { href: "/dashboard/employees", label: "Employees", iconName: "HandPlatter" },
  { href: "/dashboard/events", label: "Events", iconName: "Utensils" },
  { href: "/dashboard/expenses", label: "Expenses", iconName: "IndianRupee" },
  { href: "/dashboard/gallery", label: "Gallery", iconName: "Image" },
  { href: "/dashboard/venues", label: "Venues", iconName: "MapPin" },
  { href: "/dashboard/calendar", label: "Calendar", iconName: "Calendar" },
];

const NavLinks = () => {
  const path = usePathname();
  const { setOpenMobile } = useSidebar()
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu className="">
        {pages.map((page) => {
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