"use client";

import dynamic from "next/dynamic";
import { User, Bell } from "lucide-react";

const BaybayMaps = dynamic(() => import("@/features/maps/components/index"), { ssr: false });

type StoreMarker = {
    id: string;
    name: string;
    lat: number;
    lng: number;
};

type StoreMapProps = {
    stores: StoreMarker[];
    highlightedStoreId: string | null;
    hidden?: boolean;
    hiddenReason?: "profile" | "notifications" | null;
};

export default function StoreMap({ stores, highlightedStoreId, hidden, hiddenReason }: StoreMapProps) {
    if (hidden) {
        return (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
                <div className="h-[400px] flex flex-col items-center justify-center bg-gray-50">
                    {hiddenReason === "profile" ? (
                        <>
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                                <User className="w-8 h-8 text-orange-500" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Profile is Open</h3>
                            <p className="text-sm text-gray-500 text-center max-w-md">
                                Map is temporarily hidden while you view your profile. 
                                Close your profile to see nearby stores.
                            </p>
                        </>
                    ) : hiddenReason === "notifications" ? (
                        <>
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                <Bell className="w-8 h-8 text-blue-500" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Notifications Open</h3>
                            <p className="text-sm text-gray-500 text-center max-w-md">
                                Map is temporarily hidden while you view your notifications. 
                                Close notifications to see nearby stores.
                            </p>
                        </>
                    ) : (
                        <>
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Map Hidden</h3>
                            <p className="text-sm text-gray-500 text-center max-w-md">
                                Map is temporarily hidden. Close any open overlays to view stores.
                            </p>
                        </>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div 
            className="bg-white rounded-xl shadow-sm overflow-hidden mb-6"
        >
            <div style={{ height: "400px" }}>
                <BaybayMaps stores={stores} highlightedStoreId={highlightedStoreId} />
            </div>
        </div>
    );
}