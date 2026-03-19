import { Smartphone, Lock } from "lucide-react";
import { useState } from "react";
import { useProfile } from "@/features/profiles/hooks/ProfileLogic";

export default function SecurityTab() {
    const { isLoading, error, success, qrCodeUrl, factorId, handleUpdateEmail, handleUpdatePassword, handleEnroll2FA, handleVerify2FA } = useProfile();

    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [totpCode, setTotpCode] = useState("");

    return (
        <>
            {/* Feedback */}
            {error && <p className="text-red-400 text-sm">{error}</p>}
            {success && <p className="text-green-400 text-sm">{success}</p>}

            {/* Email */}
            <div>
                <h3 className="text-white mb-1 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-gray-400" />
                    Email Account
                </h3>
                <p className="text-gray-400 text-sm mb-3">Last changed 3 months ago</p>
                <div className="flex items-center gap-2">
                    <input
                        type="email"
                        placeholder="New email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        className="bg-[#2D2D2D] text-white text-sm px-3 py-2 rounded-lg outline-none focus:ring-1 focus:ring-white/20"
                    />
                    <button
                        onClick={() => handleUpdateEmail(newEmail)}
                        disabled={isLoading || !newEmail}
                        className="bg-[#3D3D3D] hover:bg-[#4D4D4D] disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                    >
                        {isLoading ? "Saving..." : "Change email"}
                    </button>
                </div>
            </div>

            {/* Password */}
            <div>
                <h3 className="text-white mb-1 flex items-center gap-2">
                    <Lock className="w-4 h-4 text-gray-400" />
                    Password
                </h3>
                <p className="text-gray-400 text-sm mb-3">Last changed 3 months ago</p>
                <div className="flex items-center gap-2">
                    <input
                        type="password"
                        placeholder="New password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="bg-[#2D2D2D] text-white text-sm px-3 py-2 rounded-lg outline-none focus:ring-1 focus:ring-white/20"
                    />
                    <button
                        onClick={() => handleUpdatePassword(newPassword)}
                        disabled={isLoading || !newPassword}
                        className="bg-[#3D3D3D] hover:bg-[#4D4D4D] disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                    >
                        {isLoading ? "Saving..." : "Change password"}
                    </button>
                </div>
            </div>

            {/* Two-Factor Authentication */}
            <div>
                <h3 className="text-white mb-1 flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-gray-400" />
                    Two-factor authentication
                </h3>
                <p className="text-gray-400 text-sm mb-3">Add an extra layer of security to your account.</p>

                {/* Step 1 — not yet enrolled */}
                {!qrCodeUrl && !factorId && (
                    <div className="flex items-center gap-3">
                        <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded text-xs">Not enabled</span>
                        <button
                            onClick={handleEnroll2FA}
                            disabled={isLoading}
                            className="bg-[#3D3D3D] hover:bg-[#4D4D4D] disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                        >
                            {isLoading ? "Loading..." : "Enable 2FA"}
                        </button>
                    </div>
                )}

                {/* Step 2 — QR code shown, waiting for user to verify */}
                {qrCodeUrl && factorId && (
                    <div className="flex flex-col gap-3">
                        <p className="text-gray-400 text-sm">Scan this QR code with your authenticator app, then enter the 6-digit code below.</p>
                        <img src={qrCodeUrl} alt="2FA QR Code" className="w-40 h-40 rounded-lg" />
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                placeholder="6-digit code"
                                maxLength={6}
                                value={totpCode}
                                onChange={(e) => setTotpCode(e.target.value)}
                                className="bg-[#2D2D2D] text-white text-sm px-3 py-2 rounded-lg outline-none focus:ring-1 focus:ring-white/20 w-32"
                            />
                            <button
                                onClick={() => handleVerify2FA(totpCode)}
                                disabled={isLoading || totpCode.length !== 6}
                                className="bg-[#3D3D3D] hover:bg-[#4D4D4D] disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                            >
                                {isLoading ? "Verifying..." : "Confirm"}
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 3 — verified */}
                {!qrCodeUrl && !factorId && success && (
                    <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">Enabled</span>
                )}
            </div>
        </>
    );
}