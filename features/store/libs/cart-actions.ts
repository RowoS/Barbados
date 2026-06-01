'use client';

import { createClient } from "@/lib/supabase/client";
import { MenuItem } from "../types/types";

export async function getOrCreateCart(storeId: string) {
    const supabase = createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError) throw new Error(`Auth error: ${authError.message}`);
    if (!user) throw new Error("Not authenticated");

    const { data: cart, error } = await supabase
        .from("carts")
        .upsert(
            { customer_id: user.id, store_id: storeId },
            { onConflict: "customer_id,store_id", ignoreDuplicates: false }
        )
        .select("id")
        .single();

    if (error) throw new Error(`Cart upsert failed: ${error.message}`);

    return cart;
}

export async function getCartItems(cartId: string) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("cart_items")
        .select("*")
        .eq("cart_id", cartId);

    if (error) throw new Error(`Failed to fetch cart items: ${error.message} (${error.code})`);
    return data ?? [];
}

export async function insertCartItem(cartId: string, item: MenuItem, quantity: number = 1) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("cart_items")
        .insert({
            cart_id: cartId,
            item_id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity,
        })
        .select()
        .single();

    if (error) throw new Error(`Failed to insert cart item: ${error.message}`);
    return data;
}

export async function updateCartItemQty(cartItemId: string, qty: number) {
    const supabase = createClient();

    const { error } = await supabase
        .from("cart_items")
        .update({ quantity: qty })
        .eq("id", cartItemId);

    if (error) throw new Error(`Failed to update cart item qty: ${error.message} (${error.code})`);
}

export async function deleteCartItem(cartItemId: string) {
    const supabase = createClient();

    const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("id", cartItemId);

    if (error) throw new Error(`Failed to delete cart item: ${error.message} (${error.code})`);
}

export async function clearCartItems(cartId: string) {
    const supabase = createClient();

    const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("cart_id", cartId);

    if (error) throw new Error(`Failed to clear cart: ${error.message} (${error.code})`);
}

export async function getAllCartsForUser() {
    const supabase = createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) throw new Error("Not authenticated");
 
    const { data, error: fetchError } = await supabase
        .from("carts")
        .select(`
            id,
            store_id,
            stores ( store_name ),
            cart_items (
                id,
                item_id,
                name,
                price,
                image,
                quantity
            )
        `)
        .eq("customer_id", user.id);
    

    if (fetchError) throw new Error(fetchError.message);

    return data ?? [];
}