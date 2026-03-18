import { redirect } from "next/navigation";
import StoreSetup from "@/features/vendor/components/forms/InitialSetUpForm";
import { getStoreProfile } from "@/features/vendor/libs/route/route";
import VendorDashboard from "@/features/vendor/components/VendorDashboard";
import VendorPage from "@/features/vendor/page";

export default async function VendorRedirect() {
  return(
    <VendorPage/>
  )
}