"use client";

import { Minus, Plus, Trash2, ShoppingBag, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { CartItem } from "../types/types";

interface InlineCartProps {
    items: CartItem[];
    total: number;
    count: number;
    storeName?: string;
    onUpdateQty: (id: string, qty: number) => void;
    onRemoveItem: (id: string) => void;
    onClearCart: () => void;
    onCheckout: () => void;
}

export function InlineCart({
    items, total, count, storeName,
    onUpdateQty, onRemoveItem, onClearCart, onCheckout,
}: InlineCartProps) {
    const deliveryFee = 49;
    const orderTotal = total + deliveryFee;

    return (
        <div className="bg-white rounded-xl shadow-sm sticky top-24 flex flex-col overflow-hidden border border-gray-100">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                    <ShoppingCart size={18} className="text-orange-500" />
                    <h2 className="font-bold text-gray-900">Your Order</h2>
                </div>
                <div className="flex items-center gap-2">
                    {storeName && <p className="text-xs text-gray-400">from {storeName}</p>}
                    {items.length > 0 && (
                        <button
                            onClick={onClearCart}
                            className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                        >
                            Clear
                        </button>
                    )}
                </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto max-h-80">
                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                        <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center mb-3">
                            <ShoppingBag size={24} className="text-orange-300" />
                        </div>
                        <p className="font-medium text-gray-700 text-sm">Your cart is empty</p>
                        <p className="text-xs text-gray-400 mt-1">Add items from the menu to get started</p>
                    </div>
                ) : (
                    <div className="px-4 py-3 space-y-3">
                        {items.map((item) => (
                            <div key={item.id} className="flex items-center gap-3 bg-gray-50 rounded-xl p-2.5">
                                {item.image ? (
                                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                                ) : (
                                    <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0">
                                        <span className="text-gray-400 font-bold">{item.name.charAt(0)}</span>
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-gray-900 text-xs truncate">{item.name}</p>
                                    <p className="text-orange-500 text-xs font-semibold mt-0.5">
                                        ₱{(item.price * item.quantity).toFixed(2)}
                                    </p>
                                </div>
                                <div className="flex items-center gap-1 flex-shrink-0">
                                    <button
                                        onClick={() => item.quantity === 1 ? onRemoveItem(item.id) : onUpdateQty(item.id, item.quantity - 1)}
                                        className="w-6 h-6 rounded-full border border-gray-200 bg-white hover:border-orange-400 hover:text-orange-500 flex items-center justify-center transition-colors"
                                    >
                                        {item.quantity === 1 ? <Trash2 size={10} /> : <Minus size={10} />}
                                    </button>
                                    <span className="w-4 text-center text-xs font-bold text-gray-800">{item.quantity}</span>
                                    <button
                                        onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                                        className="w-6 h-6 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center transition-colors"
                                    >
                                        <Plus size={10} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {items.length > 0 && (
                <div className="border-t border-gray-100 px-5 py-4 space-y-3">
                    <div className="space-y-1.5">
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>Subtotal ({count} {count === 1 ? "item" : "items"})</span>
                            <span>₱{total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>Delivery fee</span>
                            <span>₱{deliveryFee.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-gray-100">
                            <span>Total</span>
                            <span>₱{orderTotal.toFixed(2)}</span>
                        </div>
                    </div>
                    <button
                        onClick={onCheckout}
                        className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors text-sm"
                    >
                        <ShoppingBag size={15} />
                        Place Order · ₱{orderTotal.toFixed(2)}
                    </button>
                    <div className="flex justify-center">
                        <Link
                            href="/customer?tab=cart"
                            className="text-xs text-gray-400 hover:text-orange-500 transition-colors"
                        >
                            View all carts
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}