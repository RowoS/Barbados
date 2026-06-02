"use client";

import { MessageCircle, Flag, Star } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { StoreHeaderProps } from "../types/types";
import ReportModal from "./ReportModal";

type StoreTab = "shop" | "reviews";

export default function StoreHeader({
    name, description, rating, storeId,
    activeTab, onTabChange,
    onSubmitReport, isSubmittingReport,
}: StoreHeaderProps & {
    activeTab: StoreTab;
    onTabChange: (tab: StoreTab) => void;
}) {
    const router = useRouter();
    const [isReportOpen, setIsReportOpen] = useState(false);

    return (
        <>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 px-6 pt-5 pb-0 mb-0">
                <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                    <div className="flex-1 min-w-0">
                        <h1 className="text-2xl md:text-3xl font-bold text-[#1D3557] mb-2 break-words">
                            {name}
                        </h1>
                        <div className="flex items-center gap-3 flex-wrap text-sm">
                            {rating != null && (
                                <div className="flex items-center gap-1 bg-orange-50 px-2.5 py-1 rounded-full">
                                    <Star className="w-4 h-4 fill-[#F4D35E] text-[#F4D35E]" />
                                    <span className="font-medium text-[#1D3557]">{rating.toFixed(1)}</span>
                                </div>
                            )}
                            {description && (
                                <span className="text-gray-500 text-sm line-clamp-1">{description}</span>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0 mt-1">
                        <button
                            onClick={() => setIsReportOpen(true)}
                            className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300 text-gray-400 hover:border-orange-400 hover:text-red-500 hover:bg-orange-50 transition-colors"
                        >
                            <Flag className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-1 border-t border-gray-100 pt-1">
                    {(["shop", "reviews"] as StoreTab[]).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => onTabChange(tab)}
                            className={`relative px-5 py-3 text-sm font-medium capitalize transition-colors ${
                                activeTab === tab
                                    ? "text-[#FF6B35]"
                                    : "text-gray-500 hover:text-gray-700"
                            }`}
                        >
                            {tab === "shop" ? "Shop" : "Reviews"}
                            {activeTab === tab && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6B35] rounded-t" />
                            )}
                        </button>
                        
                    ))}
                    <button
                            onClick={() => router.push(`/customer/store/${storeId}/chat?from=store`)}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-600 hover:border-orange-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg text-sm font-medium transition-colors"
                        >
                            <MessageCircle className="w-4 h-4" />
                            <span className="hidden sm:inline">Chat with Store</span>
                    </button>
                </div>
            </div>

            {isReportOpen && (
                <ReportModal
                    storeId={storeId ?? ""}
                    storeName={name ?? ""}
                    onClose={() => setIsReportOpen(false)}
                    onSubmit={onSubmitReport}
                    isSubmitting={isSubmittingReport}
                />
            )}
        </>
    );
}