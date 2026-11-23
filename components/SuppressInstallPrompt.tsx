"use client";

import { useEffect } from "react";

// The app is installable only for the owner's own phone. Cancelling this event stops Chrome on
// Android from showing its automatic "Add to Home screen" bar to visitors; installing manually
// from the browser menu (⋮ > Install app / Safari > Add to Home Screen) still works.
export default function SuppressInstallPrompt() {
  useEffect(() => {
    const block = (e: Event) => e.preventDefault();
    window.addEventListener("beforeinstallprompt", block);
    return () => window.removeEventListener("beforeinstallprompt", block);
  }, []);

  return null;
}
