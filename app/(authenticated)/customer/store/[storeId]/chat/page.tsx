import ChatPage from "@/features/chat/components/ChatPage";

export default function Page({ params }: { params: Promise<{ storeId: string }> }) {
    return <ChatPage params={params} />;
}