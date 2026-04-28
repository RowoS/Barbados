import VendorNavBar from "@/features/vendor/components/shared/VendorNavBar";
import VendorSidebar from "@/features/vendor/components/shared/VendorSideBar";
import { SidebarProvider, SidebarInset } from "@/shared/ui/sidebar";
import { VendorsOrdersPage} from "./VendorOrderPage";

export default function VendorOrdersWrapper() {
  return (
    <SidebarProvider>
      <VendorSidebar />

      <SidebarInset>
        <VendorNavBar />

        <main className="pt-25">
            <VendorsOrdersPage/>
        </main>

      </SidebarInset>

    </SidebarProvider>
  );
}