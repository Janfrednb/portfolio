"use client";

import { useState } from "react";

export default function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard can be blocked (e.g. non-HTTPS); the link is still visible to copy by hand.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="rounded-full border border-zinc-300 px-4 py-2 text-xs font-medium text-zinc-700 hover:border-fuchsia-500 dark:border-zinc-700 dark:text-zinc-300"
    >
      {copied ? "¡Copiado!" : "Copiar link"}
    </button>
  );
}
