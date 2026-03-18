import {
  Home,
  Boxes,
  List,
  Coffee,
  Star,
  MessageCircle,
  LucideIcon
} from "lucide-react";

export type SidebarMenuItemType = {
  icon: LucideIcon;
  label: string;
  href: string;
};

export const data: SidebarMenuItemType[] = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: Boxes, label: "Catalog", href: "/dashboard/catalog" },
  { icon: List, label: "Orders", href: "/dashboard/orders" },
  { icon: Coffee, label: "Menu", href: "/dashboard/menu" },
  { icon: Star, label: "Reviews", href: "/dashboard/reviews" },
  { icon: MessageCircle, label: "Messages", href: "/dashboard/messages" },
];