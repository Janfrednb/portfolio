"use client";

import Link from "next/link";
import { startTransition, useActionState, useState } from "react";
import { submitTestimonial, type SubmitState } from "@/app/actions/testimonials";
import Badge from "./Badge";
import ThemeToggle from "./ThemeToggle";
import { useLanguage } from "./i18n";

const fieldClass =
  "mt-1.5 w-full rounded-xl border border-zinc-300 bg-white/70 px-4 py-3 text-sm text-zinc-950 placeholder:text-zinc-400 outline-none transition focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-500/15 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-50 dark:placeholder:text-zinc-600";

const labelClass = "text-sm font-medium text-zinc-800 dark:text-zinc-200";

export default function ReviewForm() {
  const { t, lang, toggle } = useLanguage();
  const r = t.review;
  const [state, action, pending] = useActionState<SubmitState, FormData>(submitTestimonial, { status: "idle" });
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [length, setLength] = useState(0);
  const [projectLength, setProjectLength] = useState(0);
  const [startedAt] = useState(() => Date.now());

  const shown = hover || rating;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="mx-auto flex w-full max-w-2xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-1.5 text-sm font-semibold">
          <span className="text-fuchsia-500">{"</>"}</span>
          <span className="text-zinc-950 dark:text-zinc-50">Janfred</span>
          <span className="text-zinc-400 dark:text-zinc-500">.dev</span>
        </Link>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggle}
            className="h-9 rounded-full border border-zinc-300 px-3 font-mono text-xs text-zinc-600 dark:border-zinc-700 dark:text-zinc-300"
          >
            {lang === "es" ? "EN" : "ES"}
          </button>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto w-full max-w-2xl flex-1 px-6 pb-16">
        {state.status === "ok" ? (
          <div className="mt-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 via-fuchsia-500 to-orange-500 text-3xl text-white">
              ✓
            </div>
            <h1 className="mt-6 text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">{r.thanksTitle}</h1>
            <p className="mt-3 text-zinc-600 dark:text-zinc-400">{r.thanksBody}</p>
            <Link
              href="/"
              className="mt-8 inline-block rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500 px-6 py-3 text-sm font-medium text-white"
            >
              {r.backHome}
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-6 text-center">
              <Badge>{r.badge}</Badge>
              <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">{r.title}</h1>
              <p className="mt-3 text-zinc-600 dark:text-zinc-400">{r.subtitle}</p>
            </div>

            <form
              // Submitting manually (instead of action={...}) keeps what the client typed if the save fails.
              onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.currentTarget);
                startTransition(() => action(data));
              }}
              className="relative mt-10 space-y-5"
            >
              {/* Spam traps: bots fill every field and submit instantly */}
              <input type="hidden" name="startedAt" value={startedAt} />
              <div aria-hidden className="absolute -left-[9999px]">
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </div>

              <div>
                <span className={labelClass}>{r.rating}</span>
                <input type="hidden" name="rating" value={rating} />
                <div className="mt-2 flex items-center gap-3">
                  <div className="flex" onMouseLeave={() => setHover(0)}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        aria-label={`${s}/5`}
                        aria-pressed={rating === s}
                        onClick={() => setRating(s)}
                        onMouseEnter={() => setHover(s)}
                        className="p-1 transition-transform hover:scale-125 active:scale-95"
                      >
                        <svg
                          viewBox="0 0 20 20"
                          width="32"
                          height="32"
                          fill="currentColor"
                          className={s <= shown ? "text-orange-400 drop-shadow-[0_0_8px_rgba(251,146,60,0.6)]" : "text-zinc-300 dark:text-zinc-700"}
                        >
                          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                  <span className="font-mono text-xs text-zinc-500">{r.ratingLabels[shown - 1]}</span>
                </div>
              </div>

              <label className="block">
                <span className={labelClass}>{r.name}</span>
                <input name="name" required minLength={2} maxLength={80} placeholder={r.namePh} className={fieldClass} />
              </label>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className={labelClass}>
                    {r.role} <span className="font-normal text-zinc-400">({r.optional})</span>
                  </span>
                  <input name="role" maxLength={80} placeholder={r.rolePh} className={fieldClass} />
                </label>
                <label className="block">
                  <span className={labelClass}>
                    {r.company} <span className="font-normal text-zinc-400">({r.optional})</span>
                  </span>
                  <input name="company" maxLength={80} placeholder={r.companyPh} className={fieldClass} />
                </label>
              </div>

              <label className="block">
                <span className={`flex items-baseline justify-between ${labelClass}`}>
                  <span>
                    {r.project} <span className="font-normal text-zinc-400">({r.optional})</span>
                  </span>
                  <span className="font-mono text-xs font-normal text-zinc-400">{projectLength}/200</span>
                </span>
                <textarea
                  name="project"
                  maxLength={200}
                  rows={2}
                  placeholder={r.projectPh}
                  onChange={(e) => setProjectLength(e.target.value.length)}
                  className={`${fieldClass} resize-none`}
                />
              </label>

              <label className="block">
                <span className={`flex items-baseline justify-between ${labelClass}`}>
                  {r.message}
                  <span className="font-mono text-xs font-normal text-zinc-400">{length}/600</span>
                </span>
                <textarea
                  name="message"
                  required
                  minLength={10}
                  maxLength={600}
                  rows={5}
                  placeholder={r.messagePh}
                  onChange={(e) => setLength(e.target.value.length)}
                  className={`${fieldClass} resize-none`}
                />
              </label>

              {state.status === "error" && (
                <p role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">
                  {state.error === "invalid" ? r.invalid : r.serverError}
                </p>
              )}

              <button
                type="submit"
                disabled={pending}
                className="w-full rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500 px-6 py-3.5 text-sm font-medium text-white transition-opacity disabled:opacity-60"
              >
                {pending ? r.sending : r.submit}
              </button>
            </form>
          </>
        )}
      </main>
    </div>
  );
}
