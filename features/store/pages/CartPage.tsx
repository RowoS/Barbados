"use client";

import { Trash2, Plus, Minus, ShoppingCart, ArrowLeft } from "lucide-react";
import { useCart } from "../hooks/useCart";
import Link from "next/link";

export default function CartPage({ storeId }: { storeId: string }) {
    const { items, removeItem, updateQty, total, count, clearCart } = useCart(storeId);

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
                <ShoppingCart size={48} className="text-gray-300" />
                <p className="text-gray-500 font-medium">Your cart is empty</p>
                <Link
                    href="/"
                    className="text-orange-500 hover:text-orange-600 text-sm font-medium flex items-center gap-1"
                >
                    <ArrowLeft size={14} />
                    Browse stores
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-2xl mx-auto px-4 py-8">

                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <Link href="/" className="text-gray-400 hover:text-gray-600">
                        <ArrowLeft size={20} />
                    </Link>
                    <h1 className="text-xl font-bold text-gray-900">Your Cart</h1>
                    <span className="text-sm text-gray-400">({count} items)</span>
                </div>

                {/* Items */}
                <div className="bg-white rounded-xl divide-y divide-gray-100 mb-4">
                    {items.map((item) => (
                        <div key={item.id} className="p-4 flex gap-3 items-center">
                            {item.image ? (
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                                />
                            ) : (
                                <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                                    <span className="text-gray-300 text-xl font-bold">
                                        {item.name.charAt(0)}
                                    </span>
                                </div>
                            )}

                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 truncate">{item.name}</p>
                                <p className="text-orange-500 font-semibold text-sm mt-0.5">
                                    ₱{(item.price * item.quantity).toFixed(2)}
                                </p>
                            </div>

                            {/* Qty controls */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => updateQty(item.id, item.quantity - 1)}
                                    className="w-7 h-7 rounded-full border border-gray-300 hover:border-orange-400 flex items-center justify-center text-gray-500 hover:text-orange-500 transition-colors"
                                >
                                    <Minus size={12} />
                                </button>
                                <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                                <button
                                    onClick={() => updateQty(item.id, item.quantity + 1)}
                                    className="w-7 h-7 rounded-full border border-gray-300 hover:border-orange-400 flex items-center justify-center text-gray-500 hover:text-orange-500 transition-colors"
                                >
                                    <Plus size={12} />
                                </button>
                            </div>

                            <button
                                onClick={() => removeItem(item.id)}
                                className="text-gray-300 hover:text-red-400 transition-colors ml-2"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Clear cart */}
                <button
                    onClick={clearCart}
                    className="text-xs text-gray-400 hover:text-red-400 underline mb-6"
                >
                    Clear cart
                </button>

                {/* Order summary */}
                <div className="bg-white rounded-xl p-4 mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-3">Order Summary</p>
                    <div className="flex justify-between text-sm text-gray-500 mb-2">
                        <span>Subtotal</span>
                        <span>₱{total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 mb-3">
                        <span>Delivery fee</span>
                        <span className="text-gray-400">TBD</span>
                    </div>
                    <div className="border-t border-gray-100 pt-3 flex justify-between font-semibold text-gray-900">
                        <span>Total</span>
                        <span>₱{total.toFixed(2)}</span>
                    </div>
                </div>

                {/* Checkout button */}
                <button className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-semibold text-sm uppercase tracking-wide transition-colors">
                    Place Order
                </button>
            </div>
        </div>
    );
}