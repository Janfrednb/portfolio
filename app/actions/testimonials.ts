"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  deleteTestimonial,
  insertTestimonial,
  isDatabaseConfigured,
  setTestimonialStatus,
} from "@/lib/testimonials";
import { checkPassword, endAdminSession, isAdmin, startAdminSession } from "@/lib/admin-auth";

export type SubmitState = { status: "idle" | "ok" | "error"; error?: "invalid" | "server" };

const LIMITS = { name: 80, role: 80, company: 80, project: 200, message: 600 };

function text(formData: FormData, key: keyof typeof LIMITS) {
  const value = String(formData.get(key) ?? "").trim().replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n");
  return value.slice(0, LIMITS[key]);
}

function optional(value: string) {
  return value.length > 0 ? value : null;
}

export async function submitTestimonial(_prev: SubmitState, formData: FormData): Promise<SubmitState> {
  // Spam traps: a hidden field humans never fill, and a form submitted faster than a person can type.
  const honeypot = String(formData.get("website") ?? "");
  const startedAt = Number(formData.get("startedAt") ?? 0);
  if (honeypot || (startedAt && Date.now() - startedAt < 3000)) {
    return { status: "ok" };
  }

  const name = text(formData, "name");
  const message = text(formData, "message");
  const rating = Number(formData.get("rating"));

  if (name.length < 2 || message.length < 10 || !Number.isInteger(rating) || rating < 1 || rating > 5) {
    return { status: "error", error: "invalid" };
  }

  if (!isDatabaseConfigured()) {
    console.error("[testimonials] DATABASE_URL is missing, cannot save submission");
    return { status: "error", error: "server" };
  }

  try {
    await insertTestimonial({
      name,
      role: optional(text(formData, "role")),
      company: optional(text(formData, "company")),
      project: optional(text(formData, "project")),
      rating,
      message,
    });
  } catch (err) {
    console.error("[testimonials] insert failed", err);
    return { status: "error", error: "server" };
  }

  // Reviews go live right away; the admin panel can still hide or delete them.
  revalidatePath("/");
  revalidatePath("/admin/testimonios");
  return { status: "ok" };
}

export type LoginState = { error?: boolean };

export async function adminLogin(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");
  if (!checkPassword(password)) {
    // Slows down password guessing a little.
    await new Promise((r) => setTimeout(r, 800));
    return { error: true };
  }
  await startAdminSession();
  redirect("/admin/testimonios");
}

export async function adminLogout() {
  await endAdminSession();
  redirect("/admin/testimonios");
}

async function requireAdmin() {
  if (!(await isAdmin())) throw new Error("Unauthorized");
}

function idFrom(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id) || id <= 0) throw new Error("Invalid id");
  return id;
}

function refresh() {
  revalidatePath("/");
  revalidatePath("/admin/testimonios");
}

export async function approveTestimonial(formData: FormData) {
  await requireAdmin();
  await setTestimonialStatus(idFrom(formData), "approved");
  refresh();
}

export async function hideTestimonial(formData: FormData) {
  await requireAdmin();
  await setTestimonialStatus(idFrom(formData), "hidden");
  refresh();
}

export async function removeTestimonial(formData: FormData) {
  await requireAdmin();
  await deleteTestimonial(idFrom(formData));
  refresh();
}
