"use client";
import { useRouter } from "next/navigation";
import { Star, ChevronRight } from "lucide-react";
import { useStoreReview } from "../hooks/useStoreReview";
import type { StoreReview } from "../types/types";

const PREVIEW_COUNT = 3;

export default function StoreReviewsSection({ storeId }: { storeId: string }) {
    const router = useRouter();
    const { values } = useStoreReview(storeId);

    if (values.isLoading) return null;
    if (!values.reviews.length) return null;

    const previewReviews = values.reviews.slice(0, PREVIEW_COUNT);

    return (
        <div className="mt-10">

            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold text-[#1D3557]">Reviews</h2>
                    <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-4 py-1.5">
                        <Star className="w-4 h-4 fill-[#FF6B35] text-[#FF6B35]" />
                        <span className="font-bold text-[#1D3557]">
                            {values.averageRating?.toFixed(1) ?? "—"}
                        </span>
                        <span className="text-gray-400 text-sm">·</span>
                        <span className="text-sm text-gray-600">{values.ratingCount} reviews</span>
                    </div>
                </div>
                <button
                    onClick={() => router.push(`/customer/store/${storeId}/reviews`)}
                    className="flex items-center gap-1.5 text-sm font-medium text-[#FF6B35] hover:text-orange-600 transition-colors"
                >
                    See all reviews
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {previewReviews.map((review) => (
                    <ReviewCard key={review.review_id} review={review} />
                ))}
                {Array.from({ length: Math.max(0, PREVIEW_COUNT - previewReviews.length) }).map((_, i) => (
                    <div key={`empty-${i}`} className="rounded-xl border border-orange-100 bg-orange-50/30" />
                ))}
            </div>
        </div>
    );
}

function ReviewCard({ review }: { review: StoreReview }) {
    return (
        <div className="bg-white rounded-xl border border-orange-200 p-4 flex flex-col gap-2 hover:border-orange-400 transition-colors h-44">
            <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#F4D35E] flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {review.avatar_url ? (
                        <img src={review.avatar_url} alt={review.username} className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-white font-bold text-xs">
                            {review.username.charAt(0).toUpperCase()}
                        </span>
                    )}
                </div>
                <div>
                    <p className="font-semibold text-xs text-[#1D3557] leading-tight">{review.username}</p>
                    <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                style={{
                                    width: "10px",
                                    height: "10px",
                                    fill: i < review.rating ? "#F4D35E" : "#E5E7EB",
                                    color: i < review.rating ? "#F4D35E" : "#E5E7EB",
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
            {review.review && (
                <p className="text-xs text-gray-600 leading-relaxed line-clamp-4 flex-1">{review.review}</p>
            )}
            <p className="text-xs text-gray-400">
                {new Date(review.created_at).toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" })}
            </p>
        </div>
    );
}