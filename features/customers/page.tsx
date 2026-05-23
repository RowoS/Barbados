"use client";

import { useSearch } from "@/features/customers/hooks/useSearch";
import { useState} from "react";
import { useAllCarts } from "@/features/customers/hooks/useCartSection";
import { CustomerOrdersSection } from "../order/components/CustomerOrderSection";
import { CustomerChatList } from "../chat/components/CustomerChatList";
import { useFavorites } from "./hooks/useFavorites";
import { usePageTab } from "./hooks/usePageTabs";
import CustomerNavBar from "./components/CustomerNavBar";
import CartsView from "./components/CartView";
import TabBar from "./components/TabBar";
import StoreCard from "./components/storeCards";
import SearchTab from "./components/SearchTab";
import StoreMap from "./components/StoreMaps";

export default function CustomerHomePage(){
    const { activeTab, setActiveTab } = usePageTab();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { favorites, toggleFavorite } = useFavorites();
    const {cart_values, cart_functions} = useAllCarts(); 
    const [hoveredStoreId, setHoveredStoreId] = useState<string | null>(null);
    const { values, functions } = useSearch();

    const storeMarkers = values.stores
        .filter(s => s.latitude && s.longitude)
        .map(s => ({ id: s.id, name: s.store_name, lat: s.latitude!, lng: s.longitude! }));

    const isMapHidden = isProfileOpen || isDropdownOpen;

    return (
        <div className="min-h-screen bg-gray-50">
            <CustomerNavBar 
                onProfileOpenChange={setIsProfileOpen}
                onDropdownOpenChange={setIsDropdownOpen}
            />
            <main className="max-w-7xl mx-auto px-4 py-6 md:px-6 pt-20">
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
                    <div className="space-y-6">
                        <div className="w-full">
                            <StoreMap
                                stores={storeMarkers}
                                highlightedStoreId={hoveredStoreId}
                                hidden={isMapHidden}
                            />
                        </div>

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
                    </div>
                )}

                {activeTab === "chats" && (
                    <CustomerChatList />
                )}

                {activeTab === "delivery" && (
                    <CustomerOrdersSection />
                )}

                {activeTab === "cart" && (
                    <CartsView
                        cartsByStore={cart_values.cartsByStore}
                        isLoading={cart_values.isLoading}
                        totalItems={cart_values.totalItems}
                        onUpdateQty={cart_functions.updateItemQty}
                        onRemoveItem={cart_functions.removeItem}
                    />
                )}
            </main>
        </div>
    );
}