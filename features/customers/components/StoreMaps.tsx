"use client";

import dynamic from "next/dynamic";

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
};

export default function StoreMap({ stores, highlightedStoreId, hidden }: StoreMapProps) {
    if (hidden) return null;

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
            <div className="h-48 md:h-64">
                <BaybayMaps stores={stores} highlightedStoreId={highlightedStoreId} />
            </div>
        </div>
    );
}
