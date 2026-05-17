"use client";

import { MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { StoreHeaderProps } from "../types/types";

export default function StoreHeader({ name, logo, description, rating, storeId }: StoreHeaderProps) {
    const router = useRouter();
    return (
        <div className="bg-white rounded-xl p-6 mb-6 flex gap-4 items-center">
            {logo ? (
                <img src={logo} alt={name} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
            ) : (
                <div className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-gray-300 text-3xl font-bold">{name.charAt(0)}</span>
                </div>
            )}
            <div>
                <h1 className="text-xl font-bold text-gray-900">{name}</h1>
                {description && <p className="text-sm text-gray-500 mt-0.5">{description}</p>}
                {rating != null && (
                    <p className="text-sm text-orange-500 font-medium mt-1">★ {rating.toFixed(1)}</p>
                )}
            </div>

            <button
                onClick={() => router.push(`/customer/store/${storeId}/chat`)}
                className="flex items-center gap-2 px-4 py-2 border border-orange-200 text-orange-500 hover:bg-orange-50 hover:border-orange-400 rounded-xl text-sm font-medium transition-colors flex-shrink-0"
            >
                <MessageCircle className="w-4 h-4" />
                Chat with Store
            </button>
        </div>
    );
}