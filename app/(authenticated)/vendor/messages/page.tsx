import { VendorChatList } from "@/features/chat/components/VendorChatList";
import VendorNavBar from "@/features/vendor/components/shared/VendorNavBar";
import VendorSidebar from "@/features/vendor/components/shared/VendorSideBar";
import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";

export default function VendorMessagesPage() {
    return (
        <SidebarProvider>
            <VendorSidebar />

            <SidebarInset>
                <VendorNavBar />
                <main className="pt-25">
                    <VendorChatList />
                </main>
            </SidebarInset>

        </SidebarProvider>
    );
}