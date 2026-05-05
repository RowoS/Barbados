"use client";
import { Star, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useStoreReview } from "../hooks/useStoreReview";

export function StoreAllReviewsPage({ storeId }: { storeId: string }) {
    const router = useRouter();
    const { values, functions } = useStoreReview(storeId);

    if (values.isLoading) return <div className="p-6">Loading...</div>;
    if (values.error) return <div className="p-6 text-red-500">{values.error}</div>;

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-3xl mx-auto px-6 py-8">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#FF6B35] mb-6 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </button>

                <h1 className="text-2xl font-bold text-[#1D3557] mb-6">All Reviews</h1>

                <div className="bg-white rounded-xl border border-orange-200 p-6 mb-6">
                    <h2 className="text-lg font-bold text-[#1D3557] mb-6">Rating Distribution</h2>
                    <div className="space-y-3">
                        {[5, 4, 3, 2, 1].map((star) => {
                            const count = values.reviews.filter((r) => r.rating === star).length;
                            const percentage = values.reviews.length
                                ? (count / values.reviews.length) * 100
                                : 0;
                            return (
                                <div key={star} className="flex items-center gap-4">
                                    <div className="flex items-center gap-1 w-20">
                                        <span className="text-sm font-medium text-[#1D3557]">{star}</span>
                                        <Star className="w-4 h-4 fill-[#F4D35E] text-[#F4D35E]" />
                                    </div>
                                    <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all duration-500"
                                            style={{
                                                width: `${percentage}%`,
                                                background: "linear-gradient(to right, #FF6B35, #F4D35E)",
                                            }}
                                        />
                                    </div>
                                    <span className="text-sm text-gray-600 w-16 text-right">
                                        {count} ({Math.round(percentage)}%)
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>


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
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-[#F4D35E] text-[#F4D35E]" : "fill-gray-200 text-gray-200"}`} />
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

                {values.visibleReviews.length === 0 && (
                    <div className="bg-white rounded-xl border border-orange-200 p-16 text-center">
                        <Star className="w-10 h-10 text-orange-200 mx-auto mb-3" />
                        <p className="text-gray-500">No reviews match the selected filter.</p>
                    </div>
                )}
            </div>
        </div>
    );
}