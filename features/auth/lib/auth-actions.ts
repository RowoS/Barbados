"use client";

import { createClient } from "@/lib/supabase/client";


export async function loginUser(email: string, password: string) {
  const supabase = createClient();

  // Sign in
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    return { user: null, error };
  }

  // Get user profile
  const { profile, profileError } = await getUserWithProfile(data.user.id);
  return { 
    user: data.user,
    profile,
    error, 
    profileError 
  };
}
export async function getUserWithProfile(id: string) {
  const supabase = createClient();

  const { data: profile, error: profileError } = await supabase
  .from("profiles")
  .select("role")
  .eq("id", id)
  .single();

  return {profile, profileError};
}

export async function signUpUser(email: string,password: string,username: string) {
  const supabase = createClient();

  return supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/sign-up/role-select`,
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

  return supabase.auth.updateUser(
    { password: newPassword }
  );
}

export async function updateRole(role: "customer" | "vendor") {
  const supabase = createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("User not authenticated");
  }


  return supabase.from("profiles")
    .update({ role })
    .eq("id", user.id)
    .select()
    .single();
}

export async function resendEmailConfirmation(UserEmail: string) {
  const supabase = createClient();

  return supabase.auth.resend({ 
    type: "signup", 
    email:UserEmail,
    options: {
      emailRedirectTo: `${window.location.origin}/sign-up/role-select`
    }
  });
}

export async function LoginWithGoogle(nextRoute: string) {
  const supabase = createClient();
    
  const redirectTo = `${window.location.origin}/auth/callback?next=${nextRoute}`;

  return await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectTo,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
  });

}
