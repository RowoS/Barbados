import { CartByStore } from "@/features/store/types/types";

export type Barangay = {
    id: string;
    barangay: string;
    city: string;
};

export type StoreResult = {
    id: string;
    store_name: string;
    store_description: string | null;
    store_logo: string | null;
    address: string;
    phone_numbers: string[];
    latitude?: number;
    longitude?: number;
    barangay_id?: string;
    barangay_name?: string;
};

export type Tab = "shops" | "delivery" | "cart";

export type TabBarProps = {
    activeTab: Tab;
    onChange: (tab: Tab) => void;
    rightSlot?: React.ReactNode;
};



export type SearchTabProps = {
    searchMode: "barangay" | "text";
    textQuery: string;
    barangays: Barangay[];
    selectedBarangay: Barangay | null;
    isLoadingBarangays: boolean;
    isLoadingStores: boolean;
    onModeSwitch: (mode: "barangay" | "text") => void;
    onSelectBarangay: (barangay: Barangay) => void;
    onClearSelection: () => void;
    onTextChange: (value: string) => void;
    onSearch: () => void;
};

export type StoreCardProps = {
    store: StoreResult;
    isFavorite: boolean;
    onToggleFavorite: (id: string) => void;
    onHover: (id: string) => void;
    onLeave: () => void;
};

export type CartsViewProps = {
    cartsByStore: CartByStore[];
    isLoading: boolean;
    totalItems: number;
};

export interface CustomerNavBarProps {
    onProfileOpenChange?: (open: boolean) => void;
}

export const barangayCache = { data: null as Barangay[] | null };