"use client";
import { useRouter } from "next/navigation";

export default function Success() {
  const router = useRouter();

  const handleOrderNow = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#1D3557] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-2xl w-full text-center">
        <div className="mb-8 flex justify-center">
          <img 
            src="/success-icon.png"
            alt="Success" 
            className="w-64 h-auto"
          />
        </div>

        <h1 className="text-3xl font-bold text-[#1D3557] mb-6">
          Your account has been created successfully!
        </h1>
        <p className="text-[#1D3557] text-lg mb-2">
          Press the button below to begin your ordering experience.
        </p>
        <p className="text-[#1D3557] text-lg mb-8">
          May your food cravings be satisfied!
        </p>

        <button
          onClick={handleOrderNow}
          className="px-12 py-3.5 bg-[#F4D35E] text-[#1D3557] rounded-lg font-semibold hover:bg-[#f0c940] transition-all shadow-lg hover:shadow-xl"
        >
          Order Now
        </button>
      </div>
    </div>
  );
}