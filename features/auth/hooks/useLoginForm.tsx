"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type FieldErrors = {
    email?: string;
    password?: string;
}

export function useLoginForm(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const [globalError, setGlobalError] = useState<string | null>(null);
    const [globalSuccess, setGlobalSuccess] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const validateForm = (): boolean => {
        const errors: FieldErrors = {};

        if (!email.trim()) {
            errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = "Please enter a valid email";
        }

        if (!password.trim()) {
            errors.password = "Password is required";
        } else if (password.length < 8) {
            errors.password = "Password must be at least 8 characters";
        }
        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (!validateForm()) {
            return;
        }

        const supabase = createClient();
        setIsLoading(true);
        setGlobalError(null);
        setGlobalSuccess(null);

        try {
           const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            if (error) throw error;

            router.refresh();
            router.push("/dashboard");
        } catch (error: unknown) {
            setGlobalError(error instanceof Error ? error.message : "An error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPassword = async (e: React.MouseEvent) => {
    e.preventDefault();
    setGlobalError(null);
    setGlobalSuccess(null);

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFieldErrors({ email: "Please enter your email first to reset password" });
      return;
    }

    setIsLoading(true);
    const supabase = createClient();

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/update-password`
      });

      if (error) throw error;

      setGlobalSuccess("Password reset link sent! Check your ");
    } catch (error: unknown) {
      setGlobalError(error instanceof Error ? error.message : "Failed to send reset email");
    } finally {
      setIsLoading(false);
    }
  };

  const clearFieldError = (field: keyof FieldErrors) => {
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return {
    email,
    password,
    rememberMe,
    globalError,
    globalSuccess,
    fieldErrors,
    isLoading,
    
    setEmail,
    setPassword,
    setRememberMe,
    
    handleLogin,
    handleForgotPassword,
    clearFieldError,
  };
}