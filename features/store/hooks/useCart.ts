"use client";

import { useState, useEffect } from "react";
import { MenuItem } from "../types/types";
import {
    getOrCreateCart, getCartItems, insertCartItem,
    updateCartItemQty, deleteCartItem, clearCartItems
} from "../libs/cart-actions";
import { CartItem } from "../types/types";

export function useCart(storeId: string) {
    const [cartId, setCartId] = useState<string | null>(null);
    const [items, setItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!storeId) return;
        initCart();
    }, [storeId]);

    const initCart = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const cart = await getOrCreateCart(storeId);
            setCartId(cart.id);
            const cartItems = await getCartItems(cart.id);
            setItems(cartItems);
        } catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            console.error("Failed to init cart:", message);
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    const addItem = async (item: MenuItem) => {
        // If cart isn't ready yet, wait for it before giving up
        if (!cartId) {
            console.warn("addItem called before cart was initialized — skipping");
            return;
        }

        const existing = items.find(i => i.item_id === item.id);
        if (existing) {
            await updateQty(existing.id, existing.quantity + 1);
            return;
        }

        try {
            const newItem = await insertCartItem(cartId, item);
            setItems(prev => [...prev, newItem]);
        } catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            console.error("Failed to add item:", message);
        }
    };

    const removeItem = async (cartItemId: string) => {
        try {
            await deleteCartItem(cartItemId);
            setItems(prev => prev.filter(i => i.id !== cartItemId));
        } catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            console.error("Failed to remove item:", message);
        }
    };

    const updateQty = async (cartItemId: string, qty: number) => {
        if (qty <= 0) { await removeItem(cartItemId); return; }
        try {
            await updateCartItemQty(cartItemId, qty);
            setItems(prev => prev.map(i =>
                i.id === cartItemId ? { ...i, quantity: qty } : i
            ));
        } catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            console.error("Failed to update qty:", message);
        }
    };

    const clearCart = async () => {
        if (!cartId) return;
        try {
            await clearCartItems(cartId);
            setItems([]);
        } catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            console.error("Failed to clear cart:", message);
        }
    };

    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const count = items.reduce((sum, i) => sum + i.quantity, 0);

    return { items, addItem, removeItem, updateQty, clearCart, total, count, isLoading, error };
}
