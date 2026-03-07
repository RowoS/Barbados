"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const supabase = createClient();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login"); // or "/login" depending on your route
    router.refresh(); // ensures middleware re-runs
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="mb-6">Welcome to your dashboard!</p>

      <button
        onClick={handleLogout}
        className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition"
      >
        Logout (test)
      </button>
    </div>
  );
}
