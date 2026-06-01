"use client";

import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { MenuGridProps, MenuItem } from "../types/types";
import { DescriptionModal } from "./MenuItemDescriptionModal";

export default function MenuGrid({categories,isLoading, searchQuery,activeTab,tabs,
    onSearchChange,onTabChange,onAddToCart}: MenuGridProps) {

    const [descItem, setDescItem] = useState<MenuItem | null>(null);

    return (
        <div className="bg-white rounded-xl p-4 mb-4">
            {/* Search */}
            <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-1 max-w-sm">
                    <Search
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                        type="text"
                        placeholder="Search in menu"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full pl-10 pr-4 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-4 pb-2">
                <div className="flex gap-6 overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => onTabChange(tab)}
                            className={`pb-2.5 px-1 text-xs font-medium transition-colors relative whitespace-nowrap ${
                                tab === activeTab
                                    ? "text-gray-900"
                                    : "text-gray-500 hover:text-gray-700"
                            }`}
                        >
                            {tab}
                            {tab === activeTab && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* States */}
            {isLoading && (
                <p className="text-gray-400 text-sm text-center py-8">
                    Loading menu...
                </p>
            )}

            {!isLoading && categories.length === 0 && (
                <p className="text-gray-400 text-sm text-center py-8">
                    No items found
                </p>
            )}

            {/* Items */}
            {categories.map((category) => (
                <div key={category.id} className="mb-4">
                    <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                        {category.name}
                    </h2>

                    <div className="grid grid-cols-3 gap-2">
                        {(category.items ?? []).map((item) => (
                            <div
                                key={item.id}
                                className={`border rounded-lg p-2 flex flex-col gap-1.5 ${
                                    item.is_available
                                        ? "border-gray-200"
                                        : "border-gray-100 opacity-60"
                                }`}
                            >
                                {/* Image */}
                                {item.image ? (
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-20 rounded-md object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-20 rounded-md bg-gray-100 flex items-center justify-center">
                                        <span className="text-gray-300 text-xl font-bold">
                                            {item.name.charAt(0)}
                                        </span>
                                    </div>
                                )}

                                {/* Name */}
                                <p className="font-medium text-xs text-gray-900 truncate">
                                    {item.name}
                                </p>

                                {/* Description */}
                                {item.description && (
                                    <button
                                        onClick={() => setDescItem(item)}
                                        className="text-left text-xs text-gray-400 hover:text-orange-500 transition-colors line-clamp-2 break-words"
                                    >
                                        {item.description}
                                    </button>
                                )}

                                {/* Price + Add button */}
                                <div className="flex items-center justify-between mt-auto pt-1">
                                    <p className="text-orange-500 font-semibold text-xs">
                                        ₱{item.price.toFixed(2)}
                                    </p>

                                    <button
                                        onClick={() => onAddToCart(item)}
                                        disabled={!item.is_available}
                                        className="w-6 h-6 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white rounded-md flex items-center justify-center transition-colors"
                                    >
                                        <Plus size={12} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {/* Description Modal */}
            {descItem && (
                <DescriptionModal
                    item={descItem}
                    onClose={() => setDescItem(null)}
                />
            )}
        </div>
    );
}