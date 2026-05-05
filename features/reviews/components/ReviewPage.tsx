'use client';
import { Star, Search } from "lucide-react";
import { useStoreReviews } from "../hooks/useVendorReviewPage";

export default function VendorReviewPage() {
    const { values, functions } = useStoreReviews();

    if (values.isLoading) {
        return <div className="p-20">Loading reviews...</div>;
    }

    if (values.error) {
        return <div className="p-20 text-red-500">Error loading reviews: {values.error}</div>;
    }

    return (
        <div className="pt-25">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex items-center gap-8">
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <Star className="w-8 h-8 fill-[#FF6B35] text-[#FF6B35]" />
                                <span className="text-4xl font-bold text-[#1D3557]">
                                    {values.averageRating?.toFixed(1) ?? "—"}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600">Overall Rating</p>
                        </div>
                        <div className="h-16 w-px bg-gray-200"></div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-[#1D3557] mb-2">
                                {values.ratingCount ?? 0}
                            </div>
                            <p className="text-sm text-gray-600">Total Reviews</p>
                        </div>
                    </div>

                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={values.search}
                            onChange={(e) => functions.setSearch(e.target.value)}
                            placeholder="Search reviews..."
                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
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

            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
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
                    <div
                        key={review.review_id}
                        className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all duration-300"
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-[#FF6B35] to-[#F4D35E] rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                                {review.avatar_url ? (
                                    <img src={review.avatar_url} alt={review.username} className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-white font-bold text-lg">
                                        {review.username.charAt(0).toUpperCase()}
                                    </span>
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-4 mb-3">
                                    <div className="flex-1">
                                        <h3 className="font-bold text-[#1D3557] mb-1">{review.username}</h3>
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <div className="flex items-center gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-4 h-4 ${
                                                            i < review.rating
                                                                ? "fill-[#F4D35E] text-[#F4D35E]"
                                                                : "fill-gray-200 text-gray-200"
                                                        }`}
                                                    />
                                                ))}
                                                <span className="ml-2 text-sm font-medium text-[#1D3557]">
                                                    {review.rating}.0
                                                </span>
                                            </div>
                                            <span className="text-gray-300">•</span>
                                            <span className="text-sm text-gray-500">
                                                {new Date(review.created_at).toLocaleDateString("en-PH", {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {review.review && (
                                    <p className="text-gray-700 leading-relaxed">{review.review}</p>
                                )}
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
                <div className="bg-white rounded-xl shadow-sm p-16">
                    <div className="flex flex-col items-center justify-center text-center">
                        <div className="w-24 h-24 bg-[#FFE8DF] rounded-full flex items-center justify-center mb-6">
                            <Star className="w-12 h-12 text-[#FF6B35]" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#1D3557] mb-2">No Reviews Found</h2>
                        <p className="text-gray-600 max-w-md">
                            {values.search
                                ? "Try adjusting your search terms or filters."
                                : "No reviews match the selected filter."}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}