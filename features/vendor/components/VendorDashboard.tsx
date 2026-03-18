import VendorNavBar from "@/features/vendor/components/shared/VendorNavBar";
import VendorSidebar from "@/features/vendor/components/shared/VendorSideBar";
import { SidebarProvider, SidebarInset } from "@/shared/ui/sidebar";
import { Package } from "lucide-react";

export default function VendorDashboardPage() {
  return (
    <SidebarProvider>
      <VendorSidebar />

      <SidebarInset>
        <VendorNavBar />

        <main className="pt-25">
          <div className="p-8">
          <div className="bg-white rounded-xl border-2 border-accent-orange shadow-sm p-16 mb-8">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 bg-[#FFE8DF] rounded-full flex items-center justify-center mb-6">
                <Package className="w-12 h-12 text-[#FF6B35]" />
              </div>
              <h2 className="text-4xl font-bold text-[#1D3557] mb-4">Work In Progress</h2>
              <p className="text-gray-600 max-w-md">
                We're currently building this dashboard. Check back soon for detailed analytics, insights, and more features!
              </p>
            </div>
          </div>
          </div>
        </main>
      </SidebarInset>

    </SidebarProvider>
  );
}