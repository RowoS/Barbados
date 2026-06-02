"use client";
import { Star } from "lucide-react";
import { useStoreReview } from "../hooks/useStoreReview";

export default function StoreReviewsSection({ storeId }: { storeId: string }) {
    const { values, functions } = useStoreReview(storeId);

    if (values.isLoading) return <div className="p-6">Loading...</div>;
    if (values.error) return <div className="p-6 text-red-500">{values.error}</div>;
    if (!values.reviews.length) return null;

    const averageRating = values.averageRating ?? 0;

    return (
        <div className="w-full">
            <div className="bg-white rounded-xl border border-orange-200 p-6 mb-6">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 bg-orange-50 border border-orange-200 rounded-full px-4 py-2">
                        <StarRating rating={averageRating} />
                        <span className="font-bold text-[#1D3557] text-lg">
                            {averageRating.toFixed(1)}
                        </span>
                        <span className="text-gray-400 text-sm">·</span>
                        <span className="text-sm text-gray-600">{values.ratingCount} {values.ratingCount === 1 ? "review" : "reviews"}</span>
                    </div>
                </div>
            </div>

            {/* Filter */}
            <div className="bg-white rounded-xl border border-orange-200 p-4 mb-6">
                <div className="flex items-center gap-3 overflow-x-auto">
                    <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Filter by:</span>
                    {[
                        { id: "all", label: "All Reviews" },
                        { id: "5", label: "5 Stars" },
                        { id: "4", label: "4 Stars" },
                        { id: "3", label: "3 Stars" },
                        { id: "2", label: "2 Stars" },
                        { id: "1", label: "1 Star" },
                    ].map((f) => (
                        <button
                            key={f.id}
                            onClick={() => functions.setFilter(f.id as "all" | "1" | "2" | "3" | "4" | "5")}
                            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                                values.filter === f.id
                                    ? "bg-[#FF6B35] text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mb-4 text-sm text-gray-600">
                Showing {values.filteredReviews.length} {values.filteredReviews.length === 1 ? "review" : "reviews"}
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
                {values.visibleReviews.map((review) => (
                    <div key={review.review_id} className="bg-white rounded-xl border border-orange-200 p-6 hover:border-orange-400 transition-colors">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#FF6B35] to-[#F4D35E] rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                                {review.avatar_url ? (
                                    <img src={review.avatar_url} alt={review.username} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-white font-bold">{review.username.charAt(0).toUpperCase()}</span>
                                )}
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-[#1D3557] mb-1">{review.username}</p>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="flex items-center gap-0.5">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className="w-4 h-4"
                                                style={{
                                                    fill: star <= review.rating ? "#F4D35E" : "#E5E7EB",
                                                    color: star <= review.rating ? "#F4D35E" : "#E5E7EB",
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-xs text-gray-400">
                                        {new Date(review.created_at).toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" })}
                                    </span>
                                </div>
                                {review.review && <p className="text-gray-600 text-sm leading-relaxed">{review.review}</p>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {values.remainingCount > 0 && (
                <button
                    onClick={functions.expandAll}
                    className="mt-4 w-full py-3 border border-dashed border-gray-300 rounded-xl text-sm text-gray-600 hover:border-[#FF6B35] hover:text-[#FF6B35] transition-colors"
                >
                    Show {values.remainingCount} more review{values.remainingCount !== 1 ? "s" : ""}
                </button>
            )}

            {values.filteredReviews.length === 0 && (
                <div className="bg-white rounded-xl border border-orange-200 p-16 text-center">
                    <Star className="w-10 h-10 text-orange-200 mx-auto mb-3" />
                    <p className="text-gray-500">No reviews match the selected filter.</p>
                </div>
            )}
        </div>
    );
}

function StarRating({ rating }: { rating: number }) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - Math.ceil(rating);

    return (
        <div className="flex items-center gap-0.5">
            {[...Array(fullStars)].map((_, i) => (
                <Star
                    key={`full-${i}`}
                    className="w-5 h-5"
                    style={{ fill: "#F4D35E", color: "#F4D35E" }}
                />
            ))}
            {hasHalfStar && (
                <div className="relative w-5 h-5">
                    <Star
                        className="absolute inset-0 w-5 h-5"
                        style={{ fill: "#E5E7EB", color: "#E5E7EB" }}
                    />
                    <div className="absolute inset-0 w-2.5 h-5 overflow-hidden">
                        <Star
                            className="w-5 h-5"
                            style={{ fill: "#F4D35E", color: "#F4D35E" }}
                        />
                    </div>
                </div>
            )}
            {[...Array(emptyStars)].map((_, i) => (
                <Star
                    key={`empty-${i}`}
                    className="w-5 h-5"
                    style={{ fill: "#E5E7EB", color: "#E5E7EB" }}
                />
            ))}
        </div>
    );
}