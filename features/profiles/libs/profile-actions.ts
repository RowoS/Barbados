"use client";

import { createClient } from "@/lib/supabase/client";

export async function UpdateUserEmail(newEmail: string) {
    const supabase = createClient();
    return supabase.auth.updateUser({ email: newEmail });
}

export async function UpdateUserPassword(newPassword: string) {
    const supabase = createClient();
    return supabase.auth.updateUser({ password: newPassword });
}

export async function Enroll2FA() {
    const supabase = createClient();

    const { data, error } = await supabase.auth.mfa.enroll({
        factorType: "totp",
        friendlyName: "Authenticator App",
    });

    if (error || !data) throw error;

    return {
        qrCodeUrl: data.totp.qr_code,
        secret: data.totp.secret,      
        factorId: data.id,           
    };
}

export async function Verify2FA(factorId: string, userInputtedCode: string) {
    const supabase = createClient();

    const { data: challenge, error: challengeError } = await supabase.auth.mfa.challenge({ factorId });

    if (challengeError || !challenge) throw challengeError;

    const { error: verifyError } = await supabase.auth.mfa.verify({
        factorId,
        challengeId: challenge.id,
        code: userInputtedCode,
    });

    if (verifyError) throw verifyError;
}