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

export type DeliveryOption = "Pick-up" | "Food-Delivery" | "both";

export const data: SidebarMenuItemType[] = [
  { icon: Home, label: "Dashboard", href: "/vendor/dashboard" },
  { icon: Boxes, label: "Catalog", href: "/vendor/catalog" },
  { icon: List, label: "Orders", href: "/vendor/orders" },
  { icon: Coffee, label: "Menu", href: "/vendor/menu" },
  { icon: Star, label: "Reviews", href: "/vendor/reviews" },
  { icon: MessageCircle, label: "Messages", href: "/vendor/messages" },
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
  deliveryOptions: DeliveryOption;
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
  deliveryOptions: 'Pick-up',
};


export interface StoreSetupProps {
  onComplete?: () => void;
  onSkip?: () => void;
  userId: string;
}