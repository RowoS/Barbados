"use server";

import { createClient } from "@/lib/supabase/client";

export async function loginUser(email:string, password:string) {
  const supabase = createClient();

  return supabase.auth.signInWithPassword({
    email,
    password,
  });

}

export async function signUpUser(
  email: string,
  password: string,
  username: string
) {
  const supabase = createClient();

  return supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
      data: { username },
    },
  });
}
