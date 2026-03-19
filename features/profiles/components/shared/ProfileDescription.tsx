"use client";
export function ProfileDetails({ accountName, description }: { accountName: string; description: string }) {

  return (
    <div className="px-8 pt-4 pb-6">
      <div className="flex items-center gap-3 mb-2">
        <h2 className="text-2xl font-bold text-white">{accountName}</h2>
        <span className="flex items-center gap-1 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          Active
        </span>
      </div>
      <p className="text-gray-400">{description}</p>
    </div>
  );

}