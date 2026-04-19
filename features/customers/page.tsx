"use client";

import { useSearch } from "@/features/customers/hooks/useSearch";
import { useState} from "react";
import { useAllCarts } from "@/features/store/hooks/getAllCarts";
import { useFavorites } from "./hooks/useFavorites";
import { usePageTab } from "./hooks/usePageTabs";
import CartsView from "./components/CartView";
import TabBar from "./components/TabBar";
import StoreCard from "./components/storeCards";
import SearchTab from "./components/SearchTab";
import dynamic from "next/dynamic";

const BaybayMaps = dynamic(() => import("@/features/maps/components/index"), { ssr: false });

export default function StorePage(){
    const { activeTab, setActiveTab } = usePageTab();
    const { favorites, toggleFavorite } = useFavorites();
    const { cartsByStore, isLoading: cartsLoading, totalItems } = useAllCarts();
    const [hoveredStoreId, setHoveredStoreId] = useState<string | null>(null);
    const { values, functions } = useSearch();

    const storeMarkers = values.stores
        .filter(s => s.latitude && s.longitude)
        .map(s => ({ id: s.id, name: s.store_name, lat: s.latitude!, lng: s.longitude! }));

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-7xl mx-auto px-4 py-6 md:px-6">

                <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
                    <div className="h-48 md:h-64">
                        <BaybayMaps stores={storeMarkers} highlightedStoreId={hoveredStoreId} />
                    </div>
                </div>

                <TabBar
                    activeTab={activeTab}
                    onChange={setActiveTab}
                    rightSlot={
                        activeTab === "shops" && (
                            <SearchTab
                                searchMode={values.searchMode}
                                textQuery={values.textQuery}
                                barangays={values.barangays}
                                selectedBarangay={values.selectedBarangay}
                                isLoadingBarangays={values.isLoadingBarangays}
                                isLoadingStores={values.isLoadingStores}
                                onModeSwitch={functions.handleModeSwitch}
                                onSelectBarangay={functions.handleSelectBarangay}
                                onClearSelection={functions.handleClearSelection}
                                onTextChange={functions.setTextQuery}
                                onSearch={functions.handleTextSearch}
                            />
                        )
                    }
                />

                {activeTab === "shops" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {values.stores.map(store => (
                            <StoreCard
                                key={store.id}
                                store={store}
                                isFavorite={favorites.includes(store.id)}
                                onToggleFavorite={toggleFavorite}
                                onHover={setHoveredStoreId}
                                onLeave={() => setHoveredStoreId(null)}
                            />
                        ))}
                    </div>
                )}

                {activeTab === "delivery" && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No active deliveries</p>
                    </div>
                )}

                {activeTab === "cart" && (
                    <CartsView
                        cartsByStore={cartsByStore}
                        isLoading={cartsLoading}
                        totalItems={totalItems}
                    />
                )}
            </main>
        </div>
    );
}