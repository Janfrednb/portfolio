"use client";

import { useActionState } from "react";
import { adminLogin, type LoginState } from "@/app/actions/testimonials";

export default function AdminLoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(adminLogin, {});

  return (
    <form action={action} className="mx-auto mt-24 w-full max-w-sm space-y-4 px-6">
      <h1 className="text-center text-2xl font-semibold text-zinc-950 dark:text-zinc-50">Admin · Testimonios</h1>
      <input
        type="password"
        name="password"
        required
        autoFocus
        autoComplete="current-password"
        placeholder="Contraseña"
        className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none focus:border-fuchsia-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
      />
      {state.error && <p className="text-sm text-red-500">Contraseña incorrecta.</p>}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500 px-6 py-3 text-sm font-medium text-white disabled:opacity-60"
      >
        {pending ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
