"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type ProjectCopy = { description: string; tech?: string; demoNote?: string };

type Translations = {
  nav: { gymvibe: string; proyectos: string; sobreMi: string; stack: string; contacto: string; openMenu: string };
  hero: {
    greeting: string;
    headingPre: string;
    headingHighlight: string;
    headingPost: string;
    paragraphPre: string;
    paragraphPost: string;
    more: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  featured: { badge: string; description: string; liveLink: string };
  other: {
    badge: string;
    title: string;
    demo: string;
    code: string;
    projects: { solutar: ProjectCopy; microtaller: ProjectCopy; panaderia: ProjectCopy };
  };
  about: { badge: string; title: string; paragraph: string };
  stack: { badge: string };
  contact: { badge: string; title: string; subtitle: string };
};

const translations: Record<"es" | "en", Translations> = {
  es: {
    nav: { gymvibe: "GymVibe", proyectos: "Proyectos", sobreMi: "Sobre mí", stack: "Stack", contacto: "Contacto", openMenu: "Abrir menú" },
    hero: {
      greeting: "Hola, soy Janfred",
      headingPre: "Transformo ",
      headingHighlight: "ideas",
      headingPost: " en software",
      paragraphPre: "Developer junior construyendo productos reales. Actualmente trabajando en ",
      paragraphPost: ", un SaaS de gestión para gimnasios en LATAM.",
      more: "...y más",
      ctaPrimary: "Ver GymVibe",
      ctaSecondary: "Contáctame",
    },
    featured: {
      badge: "Proyecto destacado",
      description:
        "SaaS de gestión para gimnasios pequeños en LATAM. Pensado para dueños de gimnasios que hoy llevan sus cobros y membresías en cuadernos o Excel: GymVibe les da control de clientes, membresías y pagos en un solo lugar.",
      liveLink: "Ver GymVibe en vivo",
    },
    other: {
      badge: "Otros proyectos",
      title: "Más trabajo",
      demo: "Ver demo",
      code: "Código",
      projects: {
        solutar: { description: "Sitio web para Solutar, empresa de consultoría en Seguridad y Salud en el Trabajo (SST) en Colombia.", tech: "Sitio en producción" },
        microtaller: {
          description: "Sistema de administración para talleres de motos: agenda de citas y checklist de alistamiento, con dashboard en tiempo real.",
          demoNote: "El demo puede tardar unos segundos en cargar la primera vez (plan gratuito de Render).",
        },
        panaderia: { description: "Práctica de uno de mis primeros cursos de Python, uno de los primeros proyectos que hice." },
      },
    },
    about: {
      badge: "Quién soy",
      title: "Sobre mí",
      paragraph:
        "Soy Janfred, developer junior enfocado en construir productos reales, no solo proyectos de práctica. Actualmente estoy construyendo GymVibe, un SaaS para gestión de gimnasios pequeños en LATAM. Aprendo rápido apoyándome en IA y herramientas modernas para pasar de idea a producto funcionando.",
    },
    stack: { badge: "Herramientas" },
    contact: {
      badge: "Hablemos",
      title: "Contacto",
      subtitle: "¿Tienes un proyecto en mente? Convirtámoslo en software.",
    },
  },
  en: {
    nav: { gymvibe: "GymVibe", proyectos: "Projects", sobreMi: "About", stack: "Stack", contacto: "Contact", openMenu: "Open menu" },
    hero: {
      greeting: "Hi, I'm Janfred",
      headingPre: "I turn ",
      headingHighlight: "ideas",
      headingPost: " into software",
      paragraphPre: "Junior developer building real products. Currently working on ",
      paragraphPost: ", a SaaS gym management platform for Latin America.",
      more: "...and more",
      ctaPrimary: "See GymVibe",
      ctaSecondary: "Contact me",
    },
    featured: {
      badge: "Featured project",
      description:
        "SaaS gym management platform for small gyms in Latin America. Built for gym owners who currently track payments and memberships in notebooks or spreadsheets: GymVibe gives them control over clients, memberships, and payments in one place.",
      liveLink: "See GymVibe live",
    },
    other: {
      badge: "Other projects",
      title: "More work",
      demo: "See demo",
      code: "Code",
      projects: {
        solutar: { description: "Website for Solutar, an Occupational Health and Safety (OHS) consulting company in Colombia.", tech: "Live site" },
        microtaller: {
          description: "Management system for motorcycle repair shops: appointment scheduling and an intake checklist, with a real-time dashboard.",
          demoNote: "The demo may take a few seconds to load the first time (Render's free plan).",
        },
        panaderia: { description: "Practice project from one of my first Python courses, one of the first projects I ever built." },
      },
    },
    about: {
      badge: "Who I am",
      title: "About me",
      paragraph:
        "I'm Janfred, a junior developer focused on building real products, not just practice projects. I'm currently building GymVibe, a SaaS for managing small gyms in Latin America. I learn fast by leaning on AI and modern tools to go from idea to working product.",
    },
    stack: { badge: "Tools" },
    contact: {
      badge: "Let's talk",
      title: "Contact",
      subtitle: "Have a project in mind? Let's turn it into software.",
    },
  },
};

export type Lang = keyof typeof translations;

type LanguageContextValue = {
  lang: Lang;
  toggle: () => void;
  t: Translations;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("es");

  useEffect(() => {
    // Reads the saved language after mount, to avoid a hydration mismatch with the server-rendered "es" default.
    const saved = localStorage.getItem("lang");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved === "en" || saved === "es") setLang(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  function toggle() {
    setLang((prev) => {
      const next: Lang = prev === "es" ? "en" : "es";
      localStorage.setItem("lang", next);
      return next;
    });
  }

  return (
    <LanguageContext.Provider value={{ lang, toggle, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
