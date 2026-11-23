import type { Metadata } from "next";
import ReviewForm from "@/components/ReviewForm";

export const metadata: Metadata = {
  title: "Deja tu opinión · Janfred Naranjo",
  description: "Cuéntame cómo fue trabajar conmigo. Tu opinión puede aparecer en mi portafolio.",
  robots: { index: false },
};

export default function OpinionPage() {
  return <ReviewForm />;
}
