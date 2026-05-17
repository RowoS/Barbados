"use client";

import { Search, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useVendorConversations } from "../hooks/useVendorChat";

function timeAgo(dateStr: string | null) {
    if (!dateStr) return "";
        const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
    if (diff < 60) 
        return "just now";
     if (diff < 3600) 
        return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) 
        return `${Math.floor(diff / 3600)}h ago`;
    
    return new Date(dateStr).toLocaleDateString("en-PH", { month: "short", day: "numeric" });
}

export function VendorChatList() {
    const router = useRouter();
    const { values, functions } = useVendorConversations();
    
    return (
        <div>
            {/* Header */}
            <div className="bg-white rounded-xl border border-orange-200 p-6 mb-6">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-[#1D3557] mb-1">Messages</h1>
                        <p className="text-gray-600">Communicate with your customers</p>
                    </div>
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={values.search}
                            onChange={(e) => functions.setSearch(e.target.value)}
                            placeholder="Search conversations..."
                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent"
                        />
                    </div>
                </div>
            </div>

            {/* Conversations */}
            <div className="bg-white rounded-xl border border-orange-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-[#1D3557]">All Conversations</h2>
                </div>

                {values.isLoading ? (
                    <div className="p-12 text-center text-gray-400 text-sm">Loading...</div>
                ) : values.conversations.length === 0 ? (
                    <div className="p-12 text-center">
                        <p className="text-gray-400 text-sm">
                            {values.search ? "No conversations match your search." : "No conversations yet."}
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {values.conversations.map((conversation) => (
                            <div
                                key={conversation.conversation_id}
                                onClick={() => router.push(`/vendor/messages/${conversation.conversation_id}`)}
                                className="p-6 hover:bg-gray-50 cursor-pointer transition-colors group"
                            >
                                <div className="flex items-center gap-4">
                                    {/* Avatar */}
                                    <div className="relative flex-shrink-0">
                                        <div className="w-14 h-14 bg-gradient-to-br from-[#FF6B35] to-[#F4D35E] rounded-full flex items-center justify-center overflow-hidden">
                                            {conversation.avatar_url ? (
                                                <img src={conversation.avatar_url} alt={conversation.username} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-white font-bold text-lg">
                                                    {conversation.username.charAt(0).toUpperCase()}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2 mb-1">
                                            <h3 className="font-bold text-[#1D3557] group-hover:text-[#FF6B35] transition-colors">
                                                {conversation.username}
                                            </h3>
                                            <span className="text-xs text-gray-500 whitespace-nowrap">
                                                {timeAgo(conversation.last_message_at)}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between gap-2">
                                            <p className="text-sm text-gray-600 truncate">
                                                {conversation.last_message ?? "No messages yet"}
                                            </p>
                                        </div>
                                    </div>

                                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#FF6B35] transition-colors flex-shrink-0" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}