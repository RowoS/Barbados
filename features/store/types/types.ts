export type MenuVariant = {
    id: string;
    name: string;
    option: string;
    price_modifier: number;
};

export type MenuItem = {
    id: string;
    name: string;
    description: string | null;
    price: number;
    image: string | null;
    is_available: boolean;
    variants: MenuVariant[] | null;
};

export type MenuCategory = {
    id: string;
    name: string;
    display_order: number;
    items: MenuItem[] | null;
};

export interface StoreHeaderProps {
    name: string;
    logo: string | null;
    description: string | null;
    rating?: number | null;
}

export interface MenuGridProps {
    categories: MenuCategory[];
    isLoading: boolean;
    searchQuery: string;
    activeTab: string;
    tabs: string[];
    onSearchChange: (q: string) => void;
    onTabChange: (tab: string) => void;
    onAddToCart: (item: MenuItem) => void;
}

export type CartItem = {
    id: string;
    cart_id: string;
    item_id: string;
    name: string;
    price: number;
    image: string | null;
    quantity: number;
};

export interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    items: CartItem[];
    total: number;
    count: number;
    onUpdateQty: (cartItemId: string, qty: number) => void;
    onRemoveItem: (cartItemId: string) => void;
    onClearCart: () => void;
    onCheckout?: () => void;
    storeName?: string;
}

export type AllCartItem = {
    id: string;
    cart_id: string;
    item_id: string;
    name: string;
    price: number;
    image: string | null;
    quantity: number;
    store_id: string;
    store_name: string;
};
 
export type CartByStore = {
    store_id: string;
    store_name: string;
    items: AllCartItem[];
    subtotal: number;
};