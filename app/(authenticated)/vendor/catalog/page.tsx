import CatalogPage from "@/features/catalog/vendor/CatalogPage";
import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";
import VendorNavBar from "@/features/vendor/components/shared/VendorNavBar";
import VendorSidebar from "@/features/vendor/components/shared/VendorSideBar";
import { Package } from "lucide-react";

export default function VendorCatalog() {
  return (
    <SidebarProvider>
      <VendorSidebar />

      <SidebarInset>
        <VendorNavBar />
          <main className="pt-25">
            <CatalogPage/>
          </main>
      </SidebarInset>

    </SidebarProvider>
  )
}