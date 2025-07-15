"use server";
import { login, signup } from "@/api/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function handleLogin(email: string, password: string) {
  let redirectUrl: string = `/login?errorMessage=${encodeURIComponent(
    "Failed to sign in"
  )}`;

  try {
    const res = await login(email, password);

    if (res.token) {
      cookies().set("token", res.token);
      redirectUrl = "/dashboard";
    }
  } catch (e) {
    console.log(e);
  } finally {
    redirect(redirectUrl);
  }
}

export async function handleSignup(email: string, password: string) {
  let redirectUrl: string = `/login?errorMessage=${encodeURIComponent(
    "Failed to sign up"
  )}`;

  try {
    const res = await signup(email, password);

    if (res.token) {
      cookies().set("token", res.token);
      redirectUrl = "/dashboard";
    }
  } catch (e) {
    console.log(e);
  } finally {
    redirect(redirectUrl);
  }
}