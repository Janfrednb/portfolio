import "server-only";
import { neon } from "@neondatabase/serverless";

export type TestimonialStatus = "pending" | "approved" | "hidden";

export type Testimonial = {
  id: number;
  name: string;
  role: string | null;
  company: string | null;
  project: string | null;
  rating: number;
  message: string;
  status: TestimonialStatus;
  createdAt: string;
};

export type PublicTestimonial = Omit<Testimonial, "status" | "createdAt">;

type Row = {
  id: number;
  name: string;
  role: string | null;
  company: string | null;
  project: string | null;
  rating: number;
  message: string;
  status: TestimonialStatus;
  created_at: string | Date;
};

function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  return neon(url);
}

export function isDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

// Creates the table on first use so there is no separate migration step to run.
let schemaReady: Promise<void> | null = null;
function ensureSchema(sql: NonNullable<ReturnType<typeof getSql>>) {
  if (!schemaReady) {
    schemaReady = (async () => {
      await sql`
        CREATE TABLE IF NOT EXISTS testimonials (
          id          SERIAL PRIMARY KEY,
          name        TEXT NOT NULL,
          role        TEXT,
          company     TEXT,
          project     TEXT,
          rating      SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
          message     TEXT NOT NULL,
          status      TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'hidden')),
          created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `;
      await sql`CREATE INDEX IF NOT EXISTS testimonials_status_idx ON testimonials (status, created_at DESC)`;
    })().catch((err) => {
      schemaReady = null;
      throw err;
    });
  }
  return schemaReady;
}

function toTestimonial(r: Row): Testimonial {
  return {
    id: r.id,
    name: r.name,
    role: r.role,
    company: r.company,
    project: r.project,
    rating: Number(r.rating),
    message: r.message,
    status: r.status,
    createdAt: new Date(r.created_at).toISOString(),
  };
}

export async function getApprovedTestimonials(): Promise<PublicTestimonial[]> {
  const sql = getSql();
  if (!sql) return [];
  try {
    await ensureSchema(sql);
    const rows = (await sql`
      SELECT id, name, role, company, project, rating, message, status, created_at
      FROM testimonials WHERE status = 'approved' ORDER BY created_at DESC LIMIT 30
    `) as Row[];
    return rows.map(({ id, name, role, company, project, rating, message }) => ({
      id,
      name,
      role,
      company,
      project,
      rating: Number(rating),
      message,
    }));
  } catch (err) {
    // A database hiccup should never take the portfolio down: the section just hides.
    console.error("[testimonials] failed to load approved testimonials", err);
    return [];
  }
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  const sql = getSql();
  if (!sql) return [];
  await ensureSchema(sql);
  const rows = (await sql`
    SELECT id, name, role, company, project, rating, message, status, created_at
    FROM testimonials ORDER BY created_at DESC LIMIT 500
  `) as Row[];
  return rows.map(toTestimonial);
}

export async function insertTestimonial(input: {
  name: string;
  role: string | null;
  company: string | null;
  project: string | null;
  rating: number;
  message: string;
}) {
  const sql = getSql();
  if (!sql) throw new Error("DATABASE_URL is not configured");
  await ensureSchema(sql);
  await sql`
    INSERT INTO testimonials (name, role, company, project, rating, message, status)
    VALUES (${input.name}, ${input.role}, ${input.company}, ${input.project}, ${input.rating}, ${input.message}, 'approved')
  `;
}

export async function setTestimonialStatus(id: number, status: TestimonialStatus) {
  const sql = getSql();
  if (!sql) throw new Error("DATABASE_URL is not configured");
  await ensureSchema(sql);
  await sql`UPDATE testimonials SET status = ${status} WHERE id = ${id}`;
}

export async function deleteTestimonial(id: number) {
  const sql = getSql();
  if (!sql) throw new Error("DATABASE_URL is not configured");
  await ensureSchema(sql);
  await sql`DELETE FROM testimonials WHERE id = ${id}`;
}
