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
}

export interface ProfileDetailsProps {
    accountName: string;
    description: string;
    onAccountNameChange?: (newName: string) => void;
    onDescriptionChange?: (newDescription: string) => void;
}

export interface ProfileOverlayProps {
  onClose: () => void;
}
