import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";
import VendorReviewPage from "./ReviewPage";
import VendorNavBar from "@/features/vendor/components/shared/VendorNavBar";
import VendorSidebar from "@/features/vendor/components/shared/VendorSideBar";

export default function ReviewPageWrapper() {
    return (
    <SidebarProvider className="bg-orange-50">
      <VendorSidebar />

      <SidebarInset className="bg-orange-50">
        <VendorNavBar />
        <main className="min-h-screen p-6">
            <div className="max-w-9xl mx-auto">
                <VendorReviewPage />
            </div>
        </main>
      </SidebarInset>

    </SidebarProvider>
  );
}