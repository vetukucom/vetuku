"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"


export async function signIn(prevState: any, formData: FormData) {
  const supabase = await createClient();
  if (!supabase) {
    return { error: "Authentication service unavailable" };
  }
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  if (!email || !password) {
    return { error: "Email and password are required" };
  }
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      return { error: error.message };
    }
    return { success: true };
  } catch (error) {
    console.error("Login error:", error);
    return { error: "An unexpected error occurred. Please try again." };
  }
}


export async function signUp(prevState: any, formData: FormData) {
  const supabase = await createClient();
  if (!supabase) {
    return { error: "Authentication service unavailable" };
  }
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullName = formData.get("fullName") as string;
  if (!email || !password || !fullName) {
    return { error: "All fields are required" };
  }
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo:
          process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/callback`,
        data: {
          full_name: fullName,
        },
      },
    });
    if (error) {
      return { error: error.message };
    }
    // Create user profile
    if (data.user) {
      const { error: profileError } = await supabase.from("user_profiles").insert([
        {
          id: data.user.id,
          full_name: fullName,
          email: email,
          is_verified: false,
          rating: 0,
          total_reviews: 0,
        },
      ]);
      if (profileError) {
        console.error("Profile creation error:", profileError);
      }
    }
    return { success: "Check your email to confirm your account." };
  } catch (error) {
    console.error("Sign up error:", error);
    return { error: "An unexpected error occurred. Please try again." };
  }
}

export async function signOut() {
  const supabase = await createClient();
  if (!supabase) {
    redirect("/auth/login");
    return;
  }
  await supabase.auth.signOut();
  redirect("/auth/login");
}
