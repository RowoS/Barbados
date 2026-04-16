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