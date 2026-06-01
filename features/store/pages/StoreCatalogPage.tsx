"use client";

import { useState } from "react";
import { useStorePage } from "../hooks/useStorePage";
import StoreHeader from "../components/StoreHeader";
import StoreReviewsSection from "../components/StoreReviewSection";
import MenuGrid from "../components/MenuGrid";
import { InlineCart } from "../components/CartDrawer";
import { AddToCartModal } from "../components/AddtoCartModal";
import { MenuItem } from "../types/types";

type StoreTab = "shop" | "reviews";

export default function StoreCatalogPage({ storeId }: { storeId: string }) {
    const [pendingItem, setPendingItem] = useState<MenuItem | null>(null);
    const [activeStoreTab, setActiveStoreTab] = useState<StoreTab>("shop");

    const {
        categories, isLoading, searchQuery, activeTab, tabs,
        storeInfo, setSearchQuery, setActiveTab, cart,
        submitReport, submittingReport,
    } = useStorePage(storeId);

    const handleAddToCart = async (item: MenuItem, quantity: number) => {
        const existing = cart.items.find(ci => ci.item_id === item.id);
        if (existing) {
            await cart.updateQty(existing.id, existing.quantity + quantity);
        } else {
            await cart.addItem(item, quantity);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 pt-20" style={{ marginTop: "-32px", position: "relative", zIndex: 10 }}>
                <StoreHeader
                    name={storeInfo.name ?? "Unknown Store"}
                    description={storeInfo.description ?? ""}
                    rating={storeInfo.rating ?? null}
                    storeId={storeId}
                    activeTab={activeStoreTab}
                    onTabChange={setActiveStoreTab}
                    onSubmitReport={submitReport}
                    isSubmittingReport={submittingReport}
                />
            </div>
            <div className="max-w-7xl mx-auto px-4 py-4">
                {activeStoreTab === "shop" ? (
                    <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                        <div style={{ flex: 7, minWidth: 0 }}>
                            <MenuGrid
                                categories={categories}
                                isLoading={isLoading}
                                searchQuery={searchQuery}
                                activeTab={activeTab}
                                tabs={tabs}
                                onSearchChange={setSearchQuery}
                                onTabChange={setActiveTab}
                                onAddToCart={(item) => setPendingItem(item)}
                            />
                        </div>
                        <div style={{ flex: 3, minWidth: 0 }}>
                            <InlineCart
                                items={cart.items}
                                total={cart.total}
                                count={cart.count}
                                storeName={storeInfo.name}
                                onUpdateQty={cart.updateQty}
                                onRemoveItem={cart.removeItem}
                                onClearCart={cart.clearCart}
                                onCheckout={() => {}}
                            />
                        </div>
                    </div>
                ) : (
                    <StoreReviewsSection storeId={storeId} />
                )}
            </div>

            {pendingItem && (
                <AddToCartModal
                    item={pendingItem}
                    onConfirm={handleAddToCart}
                    onClose={() => setPendingItem(null)}
                />
            )}

            
        </div>
    );
}