import { Pencil, Check, X } from "lucide-react"; 
import { ProfileDetailsProps } from "@/features/profiles/types/types";
import { useState } from "react";

export function ProfileDetails({ accountName, description, onAccountNameChange, onDescriptionChange }: ProfileDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [nameValue, setNameValue] = useState(accountName);
  const [descValue, setDescValue] = useState(description);
  const [nameError, setNameError] = useState("");

  const handleConfirm = () => {
    if (nameValue.trim() === "") {
      setNameError("Account name cannot be empty.");
      return;
    }

    if(nameValue.length < 8) {
      setNameError("Account name must be at least 8 characters.");
      return;
    }
    
    onAccountNameChange?.(nameValue);
    onDescriptionChange?.(descValue);
    setNameError("");
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNameValue(accountName);
    setDescValue(description);
    setNameError("");
    setIsEditing(false);
  };

  return (
    <div className="px-8 pt-4 pb-6">
      {!isEditing ? (
        <>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold text-white">{accountName}</h2>
            <span className="flex items-center gap-1 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              Active
            </span>
            <button
              onClick={() => setIsEditing(true)}
              className="ml-auto text-gray-400 hover:text-white transition-colors"
            >
              <Pencil className="w-4 h-4" />
            </button>
          </div>
          <p className="text-gray-400">{description || "No description set"}</p>
        </>
      ) : (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="flex flex-col flex-1">
              <input
                value={nameValue}
                onChange={(e) => {
                  setNameValue(e.target.value);
                  if (e.target.value.trim()) setNameError("");
                }}
                className="bg-[#1D1D1D] text-white text-xl font-bold px-3 py-1.5 rounded-lg outline-none focus:ring-1 focus:ring-purple-500 w-full"
                placeholder="Store name"
              />
              {nameError && <p className="text-red-400 text-xs mt-1">{nameError}</p>}
            </div>
            <span className="flex items-center gap-1 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs flex-shrink-0">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              Active
            </span>
            <div className="flex items-center gap-2 ml-auto">
              <button onClick={handleConfirm} className="text-green-400 hover:text-green-300 transition-colors">
                <Check className="w-4 h-4" />
              </button>
              <button onClick={handleCancel} className="text-red-400 hover:text-red-300 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          <textarea
            value={descValue}
            onChange={(e) => setDescValue(e.target.value)}
            className="bg-[#1D1D1D] text-gray-300 px-3 py-2 rounded-lg outline-none focus:ring-1 focus:ring-purple-500 text-sm resize-none"
            placeholder="Store description (optional)"
            rows={2}
          />
        </div>
      )}
    </div>
  );
}