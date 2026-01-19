"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signUpUser } from '../lib/auth-actions';

export function useSignUpForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (username.length < 3) nextErrors.username = "Username must be at least 3 characters";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Invalid email";
    if (password.length < 8) nextErrors.password = "Minimum 8 characters";
    if (password !== confirmPassword) nextErrors.confirmPassword = "Passwords do not match";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;

    setIsLoading(true);
    try {
      const { error } = await signUpUser(email, password, username);
      if (error) throw error;

      router.push("/sign-up-success");
    } catch (err) {
      setErrors({ email: err instanceof Error ? err.message : "Signup failed" });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    values: { username, email, password, confirmPassword },
    setters: { setUsername, setEmail, setPassword, setConfirmPassword },
    errors,
    isLoading,
    submit,
  };
}
