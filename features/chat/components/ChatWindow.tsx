"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft, Phone, Video, MoreVertical } from "lucide-react";
import { useChat } from "../hooks/useChat";
import { ChatInput } from "./ChatInput";
import { ChatMessages } from "./ChatMessages";
import type { ChatWindowProps } from "../types/types";

export function ChatWindow({ conversationId, currentUserId, storeName }: ChatWindowProps) {
    const router = useRouter();
    const { messages, isLoading, isSending, isLoadingMore, send, containerRef, bottomRef } = useChat(conversationId);

    if (isLoading) {
        return (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
                <p className="text-gray-400 text-sm">Loading messages...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen bg-white">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <div className="w-12 h-12 bg-gradient-to-br from-[#FF6B35] to-[#F4D35E] rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                            {storeName?.charAt(0).toUpperCase() ?? "S"}
                        </span>
                    </div>
                    <div>
                        <h2 className="font-bold text-[#1D3557]">{storeName ?? "Store"}</h2>
                        <p className="text-sm text-gray-500">Active now</p>
                    </div>
                </div>
            </div>

            {/* Messages — takes all remaining space */}
            <ChatMessages
                ref={containerRef}
                bottomRef={bottomRef}
                messages={messages}
                currentUserId={currentUserId}
                isLoadingMore={isLoadingMore}
            />


            <ChatInput onSend={send} isSending={isSending} />
        </div>
    );
}