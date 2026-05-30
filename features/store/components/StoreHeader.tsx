"use client";

import { useState } from "react";
import { MessageCircle, Flag } from "lucide-react";
import { useRouter } from "next/navigation";
import { StoreHeaderProps } from "../types/types";
import ReportModal from "./ReportModal";

export default function StoreHeader({ name, logo, description, rating, storeId, onSubmitReport, isSubmittingReport }: StoreHeaderProps) {
    const router = useRouter();
    const [isReportOpen, setIsReportOpen] = useState(false);

    return (
        <>
            <div className="bg-white rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between gap-4 mb-3">
                    <h1 className="text-xl font-bold text-gray-900">{name}</h1>
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                            onClick={() => router.push(`/customer/store/${storeId}/chat?from=store`)}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-500 text-gray-700 hover:border-orange-500 hover:text-green-600 hover:bg-orange-50 rounded-xl text-sm font-medium transition-all duration-200"
                        >
                            <MessageCircle className="w-4 h-4" />
                            Chat with Store
                        </button>

                        <button
                            onClick={() => setIsReportOpen(true)}
                            className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-500 text-gray-400 hover:border-orange-500 hover:text-red-500 hover:bg-orange-50 transition-all duration-200"
                            title="Report Store"
                        >
                            <Flag className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {logo ? (
                        <img src={logo} alt={name} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                    ) : (
                        <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-gray-300 text-2xl font-bold">{name.charAt(0)}</span>
                        </div>
                    )}
                    <div>
                        {description && <p className="text-sm text-gray-500">{description}</p>}
                        {rating != null && (
                            <p className="text-sm text-orange-500 font-medium mt-1">★ {rating.toFixed(1)}</p>
                        )}
                    </div>
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