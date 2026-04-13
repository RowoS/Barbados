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

export const barangayCache = { data: null as Barangay[] | null };