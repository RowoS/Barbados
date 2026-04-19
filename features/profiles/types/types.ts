import { JSX } from "react";

export type StoreInfo = {
    id: string;
    store_name: string;
    store_description:string;
    store_logo: string | null;
    latitude: number;
    longitude: number;
    address: string;
    phone_numbers: string[];
    connected_accounts: string[];
    delivery_options: "Pick-up" | "Food-Delivery" | "both" | null;
    closing_time: string | null;
    opening_time: string | null;
}

export interface StoreDetailsTabProps {
  onUpdateLocation: () => void;
  storeInfo?: StoreInfo | null;
  onPhoneChange: (index: number, value: string) => void;
  onPhoneRemove: (index: number) => void;
  onAddPhone: () => void;
  onAccountChange: (index: number, value: string) => void;
  onAccountRemove: (index: number) => void;
  onDeliveryOptionChange: (value: "Pick-up" | "Food-Delivery" | "both") => void;
}

export interface ProfileDetailsProps {
    accountName: string;
    description: string;
    openingTime?: string | null;
    closingTime?: string | null;
    onAccountNameChange?: (value: string) => void;
    onDescriptionChange?: (value: string) => void;
    onOpeningTimeChange?: (value: string) => void;
    onClosingTimeChange?: (value: string) => void;
} 

export type DeliveryOption = "Pick-up" | "Food-Delivery" | "both";

export interface ProfileOverlayProps {
  onClose: () => void;
}
