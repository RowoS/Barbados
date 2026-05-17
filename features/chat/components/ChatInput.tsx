"use client";

import { useState, FormEvent } from "react";
import { Paperclip, Smile, Send } from "lucide-react";
import type { ChatInputProps } from "../types/types";

export function ChatInput({ onSend, isSending }: ChatInputProps) {
    const [input, setInput] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isSending) return;
        await onSend(input);
        setInput("");
    };

    return (
        <div className="p-6 border-t border-gray-100 bg-white flex-shrink-0">
            <form onSubmit={handleSubmit}>
                <div className="flex items-end gap-3">
                    <div className="flex-1 relative">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            rows={1}
                            disabled={isSending}
                            className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:border-transparent resize-none disabled:opacity-50"
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSubmit(e as any);
                                }
                            }}
                        />
                        <button
                            type="button"
                            className="absolute right-3 bottom-3 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <Smile className="w-5 h-5" />
                        </button>
                    </div>
                    <button
                        type="submit"
                        disabled={isSending || !input.trim()}
                        className="w-12 h-12 rounded-xl bg-[#FF6B35] hover:bg-[#E55A2B] flex items-center justify-center transition-colors flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send className="w-5 h-5 text-white" />
                    </button>
                </div>
            </form>
        </div>
    );
}