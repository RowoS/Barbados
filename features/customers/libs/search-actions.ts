import { createClient } from "@/lib/supabase/client";
import { Barangay, StoreResult } from "../types/types";

export async function getBarangays(): Promise<Barangay[]> {
    const supabase = createClient();
    const { data, error } = await supabase
        .rpc("get_barangays");

    if (error) throw error;
    return data;
}

export async function getStoresInBarangay(barangayId: string): Promise<StoreResult[]> {
    const supabase = createClient();
    const { data, error } = await supabase
        .rpc("get_stores_with_barangay")
        .eq("barangay_id", barangayId);

    if (error) throw error;
    return data;
}

export async function searchStoresByName(query: string): Promise<StoreResult[]> {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("stores")
        .select("id, store_name, store_description, store_logo, address, phone_numbers")
        .ilike("store_name", `%${query}%`)
        .limit(20);

    if (error) throw error;
    return data;
}