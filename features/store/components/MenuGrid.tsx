"use client";

import { Search, Plus } from "lucide-react";
import { MenuCategory, MenuItem, MenuGridProps } from "../types/types";

export default function MenuGrid({
    categories, isLoading, searchQuery, activeTab, tabs,
    onSearchChange, onTabChange, onAddToCart
}: MenuGridProps) {
    return (
        <div className="bg-white rounded-xl p-6 mb-6">
            {/* Search */}
            <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1 max-w-md">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search in menu"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
                <div className="flex gap-8 overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => onTabChange(tab)}
                            className={`pb-3 px-1 text-sm font-medium transition-colors relative whitespace-nowrap ${
                                tab === activeTab ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
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
            {isLoading && <p className="text-gray-400 text-sm text-center py-8">Loading menu...</p>}
            {!isLoading && categories.length === 0 && (
                <p className="text-gray-400 text-sm text-center py-8">No items found</p>
            )}

            {/* Items */}
            {categories.map((category) => (
                <div key={category.id} className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">{category.name}</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {(category.items ?? []).map((item) => (
                            <div
                                key={item.id}
                                className={`border rounded-xl p-4 flex gap-3 ${
                                    item.is_available ? "border-gray-200" : "border-gray-100 opacity-60"
                                }`}
                            >
                                {item.image ? (
                                    <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
                                ) : (
                                    <div className="w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                                        <span className="text-gray-300 text-2xl font-bold">{item.name.charAt(0)}</span>
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-gray-900 truncate">{item.name}</p>
                                    {item.description && (
                                        <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">{item.description}</p>
                                    )}
                                    <div className="flex items-center justify-between mt-2">
                                        <p className="text-orange-500 font-semibold">₱{item.price.toFixed(2)}</p>
                                        <button
                                            onClick={() => onAddToCart(item)}
                                            disabled={!item.is_available}
                                            className="w-7 h-7 bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white rounded-full flex items-center justify-center transition-colors"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}