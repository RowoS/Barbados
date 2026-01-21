"use client";

import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/dist/server/api-utils";

export async function loginUser(email:string, password:string) {
  const supabase = createClient();

  return supabase.auth.signInWithPassword({
    email,
    password,
  });

}

export async function signUpUser(email: string,password: string,username: string) {
  const supabase = createClient();

  return supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/signup-success`,
      data: { "display_name": username },
      
    },
  });
}

export async function forgetPassword(email: string) {
  const supabase = createClient();

  return supabase.auth.resetPasswordForEmail(email,
    {redirectTo: `${window.location.origin}/update-password`}
  );

}

export async function updatePassword(newPassword: string) {
  const supabase = createClient();

  return supabase.auth.updateUser({
    password: newPassword,
  });
}
