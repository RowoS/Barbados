import { ChatWindow } from "@/features/chat/components/ChatWindow";
import { getOrCreateConversation, getStoreName } from "../libs/chat-actions";
import { redirect } from "next/navigation";

interface ChatPageProps {
    params: Promise<{ storeId: string }>;
}

export default async function ChatPage({ params }: ChatPageProps) {
    const { storeId } = await params;
    

    try {
        const { conversationId, userId } = await getOrCreateConversation(storeId);
        const storeName = await getStoreName(storeId);
        
        return (
            <div className="h-screen flex flex-col bg-white">   
                <ChatWindow 
                    conversationId={conversationId} 
                    currentUserId={userId}
                    storeName= {storeName}
                />
            </div>
        );
    } catch (error: any) {
        if (error.message === "User not authenticated") redirect("/login");

        return (
            <div className="h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 mb-4">Error loading chat</p>
                </div>
            </div>
        );
    }
}