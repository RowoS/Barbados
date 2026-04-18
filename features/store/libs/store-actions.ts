"use client";
import { createClient } from "@/lib/supabase/client";
import { MenuCategory } from "../types/types";
import { StoreInfo } from "@/features/profiles/types/types";

export async function getStoreMenu(storeId: string): Promise<MenuCategory[]> {
    const supabase = createClient();
    const { data, error } = await supabase
        .rpc("get_store_menu", { p_store_id: storeId });

    if (error) throw error;
    return data ?? [];
}

export async function getStoreInfo(storeId: string) {
    const supabase = await createClient();


    if (!storeId) throw new Error("User not authenticated");
   
    const response = await supabase.rpc('get_store_info', { store_id: storeId }).single<StoreInfo>();

    if (response.error) {
        throw new Error(response.error.message);
    }

    return {
        ...response.data,
    };
}