"use client";

import { ShoppingCart, Store } from "lucide-react";
import Link from "next/link";
import { CartsViewProps } from "../types/types";

export default function CartsView({ cartsByStore, isLoading, totalItems }: CartsViewProps){
     if (isLoading) {
        return (
            <p className="text-gray-400 text-sm text-center py-12">Loading orders...</p>
        );
    }

    if (cartsByStore.length === 0) {
        return (
            <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No active orders</p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <p className="text-sm text-gray-400">
                {totalItems} item{totalItems !== 1 ? "s" : ""} across {cartsByStore.length} store{cartsByStore.length !== 1 ? "s" : ""}
            </p>

            {cartsByStore.map(cart => (
                <div key={cart.store_id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                    {/* Store header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                            <Store className="w-4 h-4 text-[#FF6B35]" />
                            <span className="font-semibold text-gray-900 text-sm">{cart.store_name}</span>
                        </div>
                        <Link
                            href={`/customer/store/${cart.store_id}`}
                            className="text-xs text-[#FF6B35] hover:underline"
                        >
                            Add more
                        </Link>
                    </div>

                    {/* Items */}
                    <div className="divide-y divide-gray-50">
                        {cart.items.map(item => (
                            <div key={item.id} className="flex items-center gap-3 px-4 py-3">
                                {item.image ? (
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                                    />
                                ) : (
                                    <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                                        <span className="text-gray-300 font-bold">{item.name.charAt(0)}</span>
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                                    <p className="text-xs text-gray-400">x{item.quantity}</p>
                                </div>
                                <p className="text-sm font-semibold text-[#FF6B35]">
                                    ₱{(item.price * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Subtotal + go to store */}
                    <div className="flex items-center justify-between px-4 py-3 bg-gray-50">
                        <span className="text-sm text-gray-500">
                            Subtotal:{" "}
                            <span className="font-semibold text-gray-900">
                                ₱{cart.subtotal.toFixed(2)}
                            </span>
                        </span>
                        <Link
                            href={`/customer/store/${cart.store_id}`}
                            className="px-4 py-1.5 bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white text-xs font-medium rounded-lg transition-colors"
                        >
                            Go to store
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}