"use client";

import { useState } from "react";

type Props = {
  /** Path or absolute URL to share; a path is resolved against the current origin. */
  url: string;
  title: string;
  text?: string;
  label: string;
  copiedLabel: string;
  iconOnly?: boolean;
  className?: string;
};

function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3v12" />
      <path d="M7 8l5-5 5 5" />
      <path d="M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" />
    </svg>
  );
}

export default function ShareButton({ url, title, text, label, copiedLabel, iconOnly = false, className = "" }: Props) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const href = new URL(url, window.location.origin).toString();

    // Phones get the native share sheet (WhatsApp, Instagram, etc.).
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: href });
        return;
      } catch (err) {
        if ((err as DOMException)?.name === "AbortError") return; // user closed the sheet
      }
    }

    try {
      await navigator.clipboard.writeText(href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked: nothing else we can do silently.
    }
  }

  return (
    <button type="button" onClick={share} aria-label={label} title={copied ? copiedLabel : label} className={`relative ${className}`}>
      <ShareIcon />
      {!iconOnly && <span>{copied ? copiedLabel : label}</span>}
      {iconOnly && copied && (
        <span className="pointer-events-none absolute top-full right-0 mt-2 rounded-md border border-zinc-200 bg-white px-2 py-1 font-mono text-[11px] whitespace-nowrap text-zinc-700 shadow-sm dark:border-zinc-800 dark:bg-black dark:text-zinc-300">
          {copiedLabel}
        </span>
      )}
    </button>
  );
}
