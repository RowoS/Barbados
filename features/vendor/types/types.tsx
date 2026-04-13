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

export interface StoreFormData {
  storeName: string;
  storeDescription: string;
  address: string;
  phone: string;
  openingTime: string;
  closingTime: string;
  latitude: number | null; 
  longitude: number | null;
}
 
export const INITIAL_FORM: StoreFormData = {
  storeName: '',
  storeDescription: '',
  address: '',
  phone: '',
  openingTime: '',
  closingTime: '',
  latitude: null, 
  longitude: null, 
};

export interface StoreSetupProps {
  onComplete?: () => void;
  userId: string;
}