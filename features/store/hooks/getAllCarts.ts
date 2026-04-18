"use client";
 
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { CartByStore, AllCartItem } from "../types/types";
import { getAllCartsForUser } from "../libs/cart-actions";

 

export function useAllCarts() {
    const [cartsByStore, setCartsByStore] = useState<CartByStore[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
 
    useEffect(() => {
        fetchAllCarts();
    }, []);
 
    const fetchAllCarts = async () => {
        setIsLoading(true);
        setError(null);
        const supabase = createClient();
 
        try {
            const { data: { user }, error: authError } = await supabase.auth.getUser();
            if (authError || !user) throw new Error("Not authenticated");
 
            const data = await getAllCartsForUser();

            const shaped: CartByStore[] = (data ?? [])
                .filter(cart => cart.cart_items && cart.cart_items.length > 0)
                .map(cart => {
                    const storeName = (cart.stores as any)?.store_name ?? "Unknown Store";
                    const items: AllCartItem[] = (cart.cart_items as any[]).map(ci => ({
                        id: ci.id,
                        cart_id: cart.id,
                        item_id: ci.item_id,
                        name: ci.name,
                        price: ci.price,
                        image: ci.image,
                        quantity: ci.quantity,
                        store_id: cart.store_id,
                        store_name: storeName,
                    }));
                    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
                    return { store_id: cart.store_id, store_name: storeName, items, subtotal };
                });
 
            setCartsByStore(shaped);
        } catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            console.error("Failed to fetch all carts:", message);
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };
 
    const totalItems = cartsByStore.reduce((sum, c) => sum + c.items.reduce((s, i) => s + i.quantity, 0), 0);
 
    return { cartsByStore, isLoading, error, totalItems, refetch: fetchAllCarts };
}