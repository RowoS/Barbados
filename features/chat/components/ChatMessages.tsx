"use client";

import { forwardRef } from "react";
import { Send } from "lucide-react";
import type { ChatMessagesProps } from "../types/types";

export const ChatMessages = forwardRef<HTMLDivElement, ChatMessagesProps>(
    ({ messages, currentUserId, isLoadingMore, bottomRef }, containerRef) => {
        return (
            <div ref={containerRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                {isLoadingMore && (
                    <div className="text-center py-2">
                        <span className="text-xs text-gray-400">Loading older messages...</span>
                    </div>
                )}

                {messages.map((msg) => {
                    const isOwn = msg.sender_id === currentUserId;
                    return (
                        <div key={msg.id} className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[70%] ${isOwn ? "order-2" : "order-1"}`}>
                                <div className={`rounded-2xl px-4 py-3 ${
                                    isOwn
                                        ? "bg-[#FF6B35] text-white rounded-br-sm"
                                        : "bg-white text-gray-800 rounded-bl-sm shadow-sm"
                                }`}>
                                    <p className="text-sm leading-relaxed">{msg.content}</p>
                                </div>
                                <p className={`text-xs text-gray-500 mt-1 ${isOwn ? "text-right" : "text-left"}`}>
                                    {new Date(msg.created_at).toLocaleTimeString("en-PH", {
                                        hour: "numeric",
                                        minute: "2-digit",
                                    })}
                                </p>
                            </div>
                        </div>
                    );
                })}

                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <div className="w-16 h-16 bg-[#FFE8DF] rounded-full flex items-center justify-center mb-3">
                            <Send className="w-7 h-7 text-[#FF6B35]" />
                        </div>
                        <p className="text-gray-500 text-sm">No messages yet. Say hello!</p>
                    </div>
                )}

                <div ref={bottomRef} />
            </div>
        );
    }
);

ChatMessages.displayName = "ChatMessages";