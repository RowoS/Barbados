import { useState } from "react";
import TabBar from "../shared/TabBar";
import { ProfileDetails } from "../shared/ProfileDescription";
import StoreDetailsTab from "../tabs/StoreDetailTab";
import SecurityTab from "../tabs/SecurityDetailTab";
import PaymentsTab from "../tabs/PaymentTab";
import MapOverlay from "@/features/maps/MapOverLay";

interface ProfileOverlayProps {
  email: string;
  onClose: () => void;
}

const TABS = ["Store Details", "Security", "Payments"];

export default function ProfileOverlay({ email, onClose }: ProfileOverlayProps) {
  const [activeTab, setActiveTab] = useState("Store Details");
  const [showMap, setShowMap] = useState(false);

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-[#2D2D2D] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto">
          <ProfileDetails accountName="Test-1" description="Test store description" />
          <TabBar tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

          <div className="px-8 py-6 space-y-6">
            {activeTab === "Store Details" && (
              <StoreDetailsTab onUpdateLocation={() => setShowMap(true)} />
            )}
            {activeTab === "Security" && <SecurityTab />}
            {activeTab === "Payments" && <PaymentsTab />}

            <div className="border-t border-gray-700 pt-6 flex justify-end gap-3">
              <button onClick={onClose} className="px-6 py-2 bg-[#3D3D3D] hover:bg-[#4D4D4D] text-white rounded-lg">
                Close
              </button>
              <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg">
                Save changes
              </button>
            </div>

            
          </div>
        </div>
      </div>     
    </>
  );
}