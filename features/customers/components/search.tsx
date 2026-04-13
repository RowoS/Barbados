"use client";

import { useSearch } from "@/features/customers/hooks/useSearch";
import { useState } from "react";
import { Search, MapPin, Heart, ShoppingCart, MessageCircle } from "lucide-react";
import dynamic from "next/dynamic";

const BaybayMaps = dynamic(() => import("@/features/maps/components/index"), { ssr: false });

export default function SearchTestPage() {
    const [activeTab, setActiveTab] = useState<"shops" | "delivery" | "cart">("shops");
    const [favorites, setFavorites] = useState<string[]>([]);
    const [hoveredStoreId, setHoveredStoreId] = useState<string | null>(null);
    const {
        values: {searchMode,textQuery, barangays, selectedBarangay, stores, isLoadingBarangays, isLoadingStores, error},
        functions: { handleSelectBarangay, handleClearSelection, handleModeSwitch, setTextQuery, handleTextSearch },
    } = useSearch();

    const storeMarkers = stores
    .filter(s => s.latitude && s.longitude)
    .map(s => ({ id: s.id, name: s.store_name, lat: s.latitude!, lng: s.longitude! }));

    const tabs = [
        { id: "shops", label: "Shops", icon: <MapPin className="w-4 h-4" /> },
        { id: "delivery", label: "Delivery", icon: null },
        { id: "cart", label: "Cart", icon: <ShoppingCart className="w-4 h-4" /> },
    ] as const;

    const toggleFavorite = (id: string) => {
        setFavorites(prev =>
        prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
        );
    };

    

    return (
        <div className="min-h-screen bg-gray-50">
        <main className="max-w-7xl mx-auto px-4 py-6 md:px-6">

            {/* Map */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
            <div className="h-48 md:h-64">
                <BaybayMaps
                stores={storeMarkers}
                highlightedStoreId={hoveredStoreId}
                />
            </div>
            </div>

            {/* Tabs + Search bar on the right */}
            <div className="mb-6">
            <div className="flex items-center border-b border-gray-200">
                {/* Tabs */}
                <div className="flex items-center gap-6 flex-1">
                {tabs.map(tab => (
                    <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`pb-3 px-2 font-medium transition-colors relative flex items-center gap-2 ${
                        activeTab === tab.id
                        ? "text-[#FF6B35]"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                    >
                    {tab.icon}
                    {tab.label}
                    {activeTab === tab.id && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6B35]" />
                    )}
                    </button>
                ))}
                </div>

                {/* Search — far right, only on shops tab */}
                {activeTab === "shops" && (
                <div className="flex items-center gap-2 pb-2">
                    {/* Mode toggle */}
                    <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
                    <button
                        onClick={() => handleModeSwitch("barangay")}
                        className={`px-3 py-1 rounded-md text-xs transition-colors ${
                        searchMode === "barangay"
                            ? "bg-white text-gray-800 shadow-sm"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        Barangay
                    </button>
                    <button
                        onClick={() => handleModeSwitch("text")}
                        className={`px-3 py-1 rounded-md text-xs transition-colors ${
                        searchMode === "text"
                            ? "bg-white text-gray-800 shadow-sm"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        Name
                    </button>
                    </div>

                    {/* Input */}
                    {searchMode === "barangay" ? (
                    <select
                        className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B35] w-44"
                        value={selectedBarangay?.id ?? ""}
                        onChange={(e) => {
                        const found = barangays.find(b => b.id === e.target.value);
                        if (found) handleSelectBarangay(found);
                        else handleClearSelection();
                        }}
                    >
                        <option value="">
                        {isLoadingBarangays ? "Loading..." : "Select barangay"}
                        </option>
                        {barangays.map(b => (
                        <option key={b.id} value={b.id}>{b.barangay}</option>
                        ))}
                    </select>
                    ) : (
                    <div className="flex gap-1">
                        <div className="relative">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                        <input
                            type="text"
                            value={textQuery}
                            onChange={(e) => setTextQuery(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleTextSearch()}
                            placeholder="Store name..."
                            className="pl-8 pr-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B35] w-44"
                        />
                        </div>
                        <button
                        onClick={handleTextSearch}
                        disabled={!textQuery.trim() || isLoadingStores}
                        className="px-3 py-1.5 bg-[#FF6B35] hover:bg-[#FF6B35]/90 disabled:opacity-50 text-white rounded-lg text-sm"
                        >
                        Go
                        </button>
                    </div>
                    )}
                </div>
                )}
            </div>
            </div>

            {/* Shops Tab */}
            {activeTab === "shops" && (
            <div>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                {!stores.length && !isLoadingStores && (
                <p className="text-gray-400 text-sm text-center py-12">
                    {searchMode === "barangay"
                    ? "Select a barangay to see stores"
                    : "Search for a store name above"}
                </p>
                )}

                {isLoadingStores && (
                <p className="text-gray-400 text-sm text-center py-12">Loading stores...</p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stores.map((store) => (
                    <div
                    key={store.id}
                    onMouseEnter={() => setHoveredStoreId(store.id)}
                    onMouseLeave={() => setHoveredStoreId(null)}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group cursor-pointer"
                    >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden bg-gray-100">
                        {store.store_logo ? (
                        <img
                            src={store.store_logo}
                            alt={store.store_name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <span className="text-gray-300 text-4xl font-bold">
                            {store.store_name.charAt(0)}
                            </span>
                        </div>
                        )}
                        <button
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(store.id); }}
                        className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                        >
                        <Heart
                            className={`w-4 h-4 ${
                            favorites.includes(store.id)
                                ? "fill-[#FF6B35] text-[#FF6B35]"
                                : "text-gray-400"
                            }`}
                        />
                        </button>
                        {store.barangay_name && (
                        <div className="absolute bottom-3 left-3 bg-black/50 text-white px-2 py-0.5 rounded text-xs">
                            {store.barangay_name}
                        </div>
                        )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                        <h3 className="font-bold text-gray-900 mb-1">{store.store_name}</h3>
                        {store.store_description && (
                        <p className="text-xs text-gray-500 line-clamp-1 mb-2">{store.store_description}</p>
                        )}
                        {store.address && (
                        <div className="flex items-center gap-1 mb-3">
                            <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                            <p className="text-xs text-gray-500 line-clamp-1">{store.address}</p>
                        </div>
                        )}
                        <button className="w-full bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white py-2 rounded-lg font-medium text-sm transition-colors">
                        Place Order
                        </button>
                    </div>
                    </div>
                ))}
                </div>
            </div>
            )}

            {activeTab === "delivery" && (
            <div className="text-center py-12">
                <p className="text-gray-500">No active deliveries</p>
            </div>
            )}

            {activeTab === "cart" && (
            <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Your cart is empty</p>
            </div>
            )}
        </main>

        <button className="fixed bottom-6 right-6 bg-[#FF6B35] hover:bg-[#FF6B35]/90 text-white w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center">
            <MessageCircle className="w-6 h-6" />
        </button>
        </div>
    );
}