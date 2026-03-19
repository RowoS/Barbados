"use client";
import { useRouter } from "next/navigation";
import { useAsyncForm } from "./useAsyncForm";
import { UpdateUserEmail, UpdateUserPassword,Verify2FA,Enroll2FA } from "../libs/profile-actions";
import { useState } from "react";

export function useProfile() {
    const Router = useRouter();
    const { isLoading, error, success, setError, setSuccess, run } = useAsyncForm();

    const [factorId, setFactorId] = useState<string | null>(null);
    const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

    const handleUpdateEmail = async (newEmail: string) => {
        await run(async () => {
            await UpdateUserEmail(newEmail);
        });
    };

    const handleUpdatePassword = async (newPassword: string) => {
        await run(async () => {
            await UpdateUserPassword(newPassword);
        });

    };

    const handleEnroll2FA = async () => {
        await run(async () => {
            const { qrCodeUrl, secret, factorId } = await Enroll2FA();
            setQrCodeUrl(qrCodeUrl);
            setFactorId(factorId);
        })
    };

    const handleVerify2FA = async (userInputtedCode: string) => {
        if (!factorId) {
            setError("No 2FA enrollment in progress");
            return;
        }
        await run(async () => {
            await Verify2FA(factorId, userInputtedCode);
            setSuccess("2FA setup complete!");
            setFactorId(null);
            setQrCodeUrl(null);
        })
    };

    return {
        isLoading,
        error,
        success,
        qrCodeUrl,
        factorId,
        handleUpdateEmail,
        handleUpdatePassword,
        handleEnroll2FA,
        handleVerify2FA,
    }   
}   