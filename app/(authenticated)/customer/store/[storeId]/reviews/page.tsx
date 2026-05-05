import { use } from "react";
import { StoreAllReviewsPage } from "@/features/store/pages/StoreAllReviews";

export default function Page({ params }: { params: Promise<{ storeId: string }> }) {
    const { storeId } = use(params);
    return <StoreAllReviewsPage storeId={storeId} />;
}