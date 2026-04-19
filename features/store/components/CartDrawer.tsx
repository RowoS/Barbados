"use client";

import { useEffect, useRef } from "react";
import { X, Minus, Plus, Trash2, ShoppingBag, ExternalLink } from "lucide-react";
import Link from "next/link";
import { CartDrawerProps } from "../types/types";

export default function CartDrawer({
    isOpen,
    onClose,
    items,
    total,
    count,
    onUpdateQty,
    onClearCart,
    onCheckout,
    storeName,
}: CartDrawerProps) {
    const drawerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) onClose();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [isOpen, onClose]);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    const deliveryFee = 49;
    const orderTotal = total + deliveryFee;

    return (
        <>
            <div
                onClick={onClose}
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
            />

            {/* Drawer */}
            <div
                ref={drawerRef}
                className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Your Order</h2>
                        {storeName && (
                            <p className="text-xs text-gray-400 mt-0.5">from {storeName}</p>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        {items.length > 0 && (
                            <button
                                onClick={onClearCart}
                                className="text-xs text-gray-400 hover:text-red-500 transition-colors px-2 py-1 rounded-md hover:bg-red-50"
                            >
                                Clear all
                            </button>
                        )}
                        <button
                            onClick={onClose}
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-500"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center">
                            <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center">
                                <ShoppingBag size={32} className="text-orange-300" />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-700">Your cart is empty</p>
                                <p className="text-sm text-gray-400 mt-1">Add items from the menu to get started</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="mt-2 px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-full transition-colors"
                            >
                                Browse Menu
                            </button>
                        </div>
                    ) : (
                        <div className="px-6 py-4 space-y-3">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-3 bg-gray-50 rounded-xl p-3"
                                >
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                                        />
                                    ) : (
                                        <div className="w-14 h-14 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0">
                                            <span className="text-gray-400 text-xl font-bold">
                                                {item.name.charAt(0)}
                                            </span>
                                        </div>
                                    )}

                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-gray-900 text-sm truncate">{item.name}</p>
                                        <p className="text-orange-500 text-sm font-semibold mt-0.5">
                                            ₱{(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-1.5 flex-shrink-0">
                                        <button
                                            onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                                            className="w-7 h-7 rounded-full border border-gray-200 bg-white hover:border-orange-400 hover:text-orange-500 flex items-center justify-center transition-colors text-gray-600"
                                        >
                                            {item.quantity === 1 ? <Trash2 size={12} /> : <Minus size={12} />}
                                        </button>
                                        <span className="w-5 text-center text-sm font-semibold text-gray-800">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                                            className="w-7 h-7 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center transition-colors"
                                        >
                                            <Plus size={12} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="border-t border-gray-100 px-6 py-5 space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm text-gray-500">
                                <span>Subtotal ({count} {count === 1 ? "item" : "items"})</span>
                                <span>₱{total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-500">
                                <span>Delivery fee</span>
                                <span>₱{deliveryFee.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t border-gray-100">
                                <span>Total</span>
                                <span>₱{orderTotal.toFixed(2)}</span>
                            </div>
                        </div>

                        <button
                            onClick={onCheckout}
                            className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white font-semibold rounded-xl transition-all duration-150 flex items-center justify-center gap-2"
                        >
                            <ShoppingBag size={18} />
                            Place Order · ₱{orderTotal.toFixed(2)}
                        </button>

                        {/* View all orders — bottom-left link back to SearchTestPage cart tab */}
                        <div className="flex justify-start pt-1">
                            <Link
                                href="/customer?tab=cart"
                                onClick={onClose}
                                className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-orange-500 transition-colors group"
                            >
                                <ExternalLink size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                View all orders
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
