"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "../lib/auth-actions";

type FieldErrors = {
  email?: string;
  password?: string;
};

export function useLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [globalError, setGlobalError] = useState<string | null>(null);
  const [globalSuccess, setGlobalSuccess] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const validateForm = () => {
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
  };

  const submit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setGlobalError(null);
    setGlobalSuccess(null);

    try {
      const { error } = await loginUser(email, password);
      if (error) throw error;

      router.refresh();
      router.push("/dashboard");
    } catch (err) {
      setGlobalError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      setFieldErrors({ email: "Enter your email to reset password" });
      return;
    }

    setGlobalSuccess("Password reset link sent. Check your email.");
  };

  const clearFieldError = (field: keyof FieldErrors) => {
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return {
    values: { email, password, rememberMe },
    setters: { setEmail, setPassword, setRememberMe },
    globalError,
    globalSuccess,
    fieldErrors,
    isLoading,
    validateForm,
    submit,
    handleForgotPassword,
    clearFieldError,
  };
}
