"use client";

import { useState } from "react";
import { useStorePage } from "../hooks/useStorePage";
import { ShoppingCart } from "lucide-react";
import StoreHeader from "../components/StoreHeader";
import StoreReviewsSection from "../components/StoreReviewSection";
import MenuGrid from "../components/MenuGrid";
import CartDrawer from "../components/CartDrawer";

export default function StoreCatalogPage({ storeId }: { storeId: string }) {
    const [isCartOpen, setIsCartOpen] = useState(false);

    const {
        categories, isLoading, searchQuery, activeTab, tabs,
        storeInfo,
        setSearchQuery, setActiveTab, cart,
    } = useStorePage(storeId);

    return (
        <div className="size-full flex flex-col">
            <div className="flex-1 bg-gray-50 overflow-auto">
                <div className="p-8">
                    <StoreHeader
                        name={storeInfo.name ?? "Unknown Store"}
                        logo={storeInfo.logo ?? "https://via.placeholder.com/150"}
                        description={storeInfo.description ?? "No description available."}
                        rating={storeInfo.rating ?? null}
                    />
                    <MenuGrid
                        categories={categories}
                        isLoading={isLoading}
                        searchQuery={searchQuery}
                        activeTab={activeTab}
                        tabs={tabs}
                        onSearchChange={setSearchQuery}
                        onTabChange={setActiveTab}
                        onAddToCart={(item) => {
                            cart.addItem(item);
                        }}
                    />
                    <StoreReviewsSection storeId={storeId} /> 
                </div>
            </div>

            <button
                onClick={() => setIsCartOpen(true)}
                className="fixed bottom-6 right-6 bg-orange-500 hover:bg-orange-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-colors"
            >
                <ShoppingCart size={22} />
                {cart.count > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                        {cart.count > 99 ? "99+" : cart.count}
                    </span>
                )}
            </button>
            
            {isCartOpen && (<CartDrawer
                isOpen={isCartOpen}
                onClose={() => setIsCartOpen(false)}
                items={cart.items}
                total={cart.total}
                count={cart.count}
                onUpdateQty={cart.updateQty}
                onRemoveItem={cart.removeItem}
                onClearCart={cart.clearCart}
                storeName={storeInfo.name}
            />)}
        </div>
    );
}
