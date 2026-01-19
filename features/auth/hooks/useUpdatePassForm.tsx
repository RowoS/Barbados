"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { updatePassword } from '../lib/auth-actions';

export function useUpdatePasswordForm(){
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [message, setMessage] = React.useState<string | null>(null);
    const [error, setError] = React.useState<string | null>(null);

    const router = useRouter();

    const handleUpdatePassword = async (e:React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setMessage(null);

        if(password !== confirmPassword){
            setError("Passwords do not match");
            return;
        }

        if(password.length < 8){
            setError("Password must be at least 8 characters");
            return;
        }

        setIsLoading(true);

        try {
            const {error} = await updatePassword(password);
        
            if(error) throw error;

            setMessage("Password updated successfully. Redirecting to login...");

            setTimeout(() => {
                router.push("/login");
            },2000);
        } catch (error: unknown) { 
            setError(error instanceof Error ? error.message : "An error occurred");
        } finally {
            setIsLoading(false);
        }
    }

    return {
        values: { password, confirmPassword },
        setters: { setPassword, setConfirmPassword },
        isLoading,
        error,
        message,
        handleUpdatePassword,
    };
}