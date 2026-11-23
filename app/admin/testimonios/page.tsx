import type { Metadata } from "next";
import { headers } from "next/headers";
import { connection } from "next/server";
import QRCode from "qrcode";
import { isAdmin } from "@/lib/admin-auth";
import { getAllTestimonials, isDatabaseConfigured, type Testimonial } from "@/lib/testimonials";
import {
  adminLogout,
  approveTestimonial,
  hideTestimonial,
  removeTestimonial,
} from "@/app/actions/testimonials";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import CopyButton from "@/components/admin/CopyButton";
import ShareButton from "@/components/ShareButton";

// Its own manifest and icon, so the panel installs as a separate "Testimonios" app on the phone.
export const metadata: Metadata = {
  title: "Testimonios",
  robots: { index: false, follow: false },
  manifest: "/admin.webmanifest",
  applicationName: "Testimonios",
  appleWebApp: { capable: true, title: "Testimonios", statusBarStyle: "black" },
  icons: { apple: "/icons/admin-apple-touch-icon.png" },
};

async function reviewUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (configured) return `${configured}/opinion`;
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}/opinion`;
}

const STATUS_LABEL: Record<Testimonial["status"], string> = {
  pending: "Pendiente",
  approved: "Publicado",
  hidden: "Oculto",
};

const STATUS_CLASS: Record<Testimonial["status"], string> = {
  pending: "border-orange-500/40 bg-orange-500/10 text-orange-600 dark:text-orange-400",
  approved: "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  hidden: "border-zinc-400/40 bg-zinc-400/10 text-zinc-500",
};

export default async function AdminTestimonialsPage() {
  // Always render per request: this page depends on the session cookie and live data.
  await connection();

  if (!process.env.ADMIN_PASSWORD) {
    return (
      <p className="mx-auto mt-24 max-w-md px-6 text-center text-sm text-zinc-500">
        Falta la variable de entorno <code>ADMIN_PASSWORD</code>.
      </p>
    );
  }

  if (!(await isAdmin())) return <AdminLoginForm />;

  const url = await reviewUrl();
  const qrSvg = await QRCode.toString(url, { type: "svg", margin: 1, width: 240, color: { dark: "#0b0b10", light: "#ffffff" } });
  const qrPng = await QRCode.toDataURL(url, { margin: 2, width: 1024, color: { dark: "#0b0b10", light: "#ffffff" } });
  const qrSvgHref = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(qrSvg)}`;

  const items = isDatabaseConfigured() ? await getAllTestimonials() : [];

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">Testimonios</h1>
        <form action={adminLogout}>
          <button className="text-xs text-zinc-500 underline-offset-4 hover:underline">Cerrar sesión</button>
        </form>
      </div>

      {!isDatabaseConfigured() && (
        <p className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400">
          Falta la variable de entorno <code>DATABASE_URL</code>: los comentarios no se pueden guardar todavía.
        </p>
      )}

      <section className="mt-8 flex flex-col items-center gap-6 rounded-2xl border border-zinc-200 p-6 sm:flex-row sm:items-start dark:border-zinc-800">
        <div
          className="h-48 w-48 shrink-0 overflow-hidden rounded-xl bg-white p-2 [&_svg]:h-full [&_svg]:w-full"
          dangerouslySetInnerHTML={{ __html: qrSvg }}
        />
        <div className="min-w-0 flex-1 text-center sm:text-left">
          <h2 className="font-semibold text-zinc-950 dark:text-zinc-50">Tu link para clientes</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Compártelo por WhatsApp o imprime el QR. Los comentarios se publican al instante; desde aquí puedes ocultar o eliminar cualquiera.
          </p>
          <p className="mt-3 truncate rounded-lg bg-zinc-100 px-3 py-2 font-mono text-xs text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
            {url}
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-2 sm:justify-start">
            <ShareButton
              url={url}
              title="Déjame tu opinión"
              text="¿Cómo fue trabajar conmigo? Me ayudaría mucho que me dejaras tu opinión aquí:"
              label="Compartir"
              copiedLabel="¡Copiado!"
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500 px-4 py-2 text-xs font-medium text-white"
            />
            <CopyButton value={url} />
            <a href={qrPng} download="qr-opinion.png" className="rounded-full border border-zinc-300 px-4 py-2 text-xs font-medium text-zinc-700 hover:border-fuchsia-500 dark:border-zinc-700 dark:text-zinc-300">
              Descargar PNG
            </a>
            <a href={qrSvgHref} download="qr-opinion.svg" className="rounded-full border border-zinc-300 px-4 py-2 text-xs font-medium text-zinc-700 hover:border-fuchsia-500 dark:border-zinc-700 dark:text-zinc-300">
              Descargar SVG
            </a>
          </div>
        </div>
      </section>

      <h2 className="mt-12 text-lg font-semibold text-zinc-950 dark:text-zinc-50">Comentarios ({items.length})</h2>
      {items.length === 0 ? (
        <p className="mt-3 text-sm text-zinc-500">Todavía no hay comentarios.</p>
      ) : (
        <ul className="mt-4 space-y-4">
          {items.map((item) => (
            <Row key={item.id} item={item} />
          ))}
        </ul>
      )}
    </main>
  );
}

function Row({ item }: { item: Testimonial }) {
  const meta = [item.role, item.company, item.project].filter(Boolean).join(" · ");
  const btn = "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors";

  return (
    <li className="rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-semibold text-zinc-950 dark:text-zinc-50">{item.name}</span>
        <span className="text-orange-400">{"★".repeat(item.rating)}</span>
        <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase ${STATUS_CLASS[item.status]}`}>
          {STATUS_LABEL[item.status]}
        </span>
        <span className="ml-auto font-mono text-[11px] text-zinc-400">
          {new Date(item.createdAt).toLocaleDateString("es-CO", { dateStyle: "medium" })}
        </span>
      </div>
      {meta && <p className="mt-1 text-xs text-zinc-500">{meta}</p>}
      <p className="mt-3 text-sm whitespace-pre-line text-zinc-700 dark:text-zinc-300">{item.message}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {item.status !== "approved" && (
          <form action={approveTestimonial}>
            <input type="hidden" name="id" value={item.id} />
            <button className={`${btn} border-emerald-500/50 text-emerald-600 hover:bg-emerald-500/10 dark:text-emerald-400`}>Publicar</button>
          </form>
        )}
        {item.status !== "hidden" && (
          <form action={hideTestimonial}>
            <input type="hidden" name="id" value={item.id} />
            <button className={`${btn} border-zinc-300 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900`}>Ocultar</button>
          </form>
        )}
        <form action={removeTestimonial}>
          <input type="hidden" name="id" value={item.id} />
          <button className={`${btn} border-red-500/40 text-red-600 hover:bg-red-500/10 dark:text-red-400`}>Eliminar</button>
        </form>
      </div>
    </li>
  );
}
