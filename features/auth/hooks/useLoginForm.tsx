"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser, forgetPassword } from "../lib/auth-actions";
import { useAsyncForm } from "./useAsyncForm";
import { isValidEmail, validatePassword } from "@/features/auth/lib/validators";

type FieldErrors = {
  email?: string;
  password?: string;
};

export function useLoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const {
    isLoading,
    error: globalError,
    success: globalSuccess,
    setError,
    setSuccess,
    run,
  } = useAsyncForm();

  const validateForm = () => {
    const errors: FieldErrors = {};
    
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      errors.email = "Please enter a valid email";
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      errors.password = passwordError;
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submit = async () => {
    if (!validateForm()) return;

    await run(async () => {
      const { error } = await loginUser(email, password);
      if (error) throw error;

      router.refresh();
      router.push("/dashboard");
    });
  };

  const handleForgotPassword = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/forgot-password");
  };

  const clearFieldError = (field: keyof FieldErrors) => {
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return {
    values: { email, password, rememberMe },
    setters: { setEmail, setPassword, setRememberMe },
    fieldErrors,
    globalError,
    globalSuccess,
    isLoading,
    submit,
    handleForgotPassword,
    clearFieldError,
  };
}
