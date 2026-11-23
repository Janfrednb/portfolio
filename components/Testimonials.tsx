"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import type { PublicTestimonial } from "@/lib/testimonials";
import Reveal from "./Reveal";
import Badge from "./Badge";
import Tilt from "./Tilt";
import { useLanguage } from "./i18n";

const AUTO_SPEED = -0.12; // degrees per frame (~7°/s at 60fps)
const DRAG_FACTOR = 0.22;
const MIN_SLOTS = 8; // with fewer reviews, the list repeats so the ring still looks full

export default function Testimonials({ items }: { items: PublicTestimonial[] }) {
  const { t } = useLanguage();
  if (items.length === 0) return null;

  return (
    <section id="testimonios" className="relative overflow-hidden py-24">
      <Reveal className="mx-auto max-w-3xl px-6 text-center">
        <Badge>{t.testimonials.badge}</Badge>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
          {t.testimonials.title}
        </h2>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">{t.testimonials.subtitle}</p>
      </Reveal>

      {items.length >= 3 ? <Ring items={items} /> : <FlatRow items={items} />}

      <div className="mt-6 flex justify-center px-6">
        <Link
          href="/opinion"
          className="group inline-flex items-center gap-2 rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:border-fuchsia-500 hover:text-fuchsia-600 dark:border-zinc-700 dark:text-zinc-300 dark:hover:text-fuchsia-400"
        >
          {t.testimonials.leaveOne}
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </section>
  );
}

function FlatRow({ items }: { items: PublicTestimonial[] }) {
  return (
    <div className="mx-auto mt-14 flex max-w-4xl flex-col items-center justify-center gap-6 px-6 sm:flex-row">
      {items.map((item) => (
        <Tilt key={item.id} className="w-full max-w-sm">
          <Card item={item} />
        </Tilt>
      ))}
    </div>
  );
}

function Ring({ items }: { items: PublicTestimonial[] }) {
  const { t } = useLanguage();
  const n = items.length;
  // Repeating whole copies keeps duplicates on opposite sides of the ring, never facing the viewer together.
  const copies = Math.max(1, Math.ceil(MIN_SLOTS / n));
  const slots = Array.from({ length: n * copies }, (_, i) => items[i % n]);
  const step = 360 / slots.length;

  const [cardW, setCardW] = useState(320);
  const cardH = cardW < 300 ? 320 : 330;
  // Distance from the ring center that keeps neighbouring cards from overlapping.
  const radius = Math.max(cardW * 1.05, cardW / 2 / Math.tan(Math.PI / slots.length) + 28);

  const stageRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const counterRef = useRef<HTMLSpanElement>(null);

  const motion = useRef({
    angle: 0,
    velocity: AUTO_SPEED,
    tiltX: -6,
    tiltTarget: -6,
    dragging: false,
    hovering: false,
    lastX: 0,
    snapTo: null as number | null,
    reduced: false,
    visible: false,
  });

  useEffect(() => {
    function measure() {
      setCardW(window.innerWidth < 640 ? Math.min(270, window.innerWidth - 72) : 320);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const m = motion.current;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    m.reduced = mq.matches;
    if (m.reduced) m.velocity = 0;

    let raf = 0;
    let last = performance.now();
    let lastFront = -1;

    function render(now: number) {
      const dt = Math.min(64, now - last) / 16.67;
      last = now;

      if (m.snapTo !== null) {
        const diff = m.snapTo - m.angle;
        m.angle += diff * Math.min(1, 0.14 * dt);
        m.velocity = 0;
        if (Math.abs(diff) < 0.05) {
          m.angle = m.snapTo;
          m.snapTo = null;
        }
      } else if (!m.dragging) {
        const target = m.hovering || m.reduced ? 0 : AUTO_SPEED;
        // Eases toward the cruise speed, which also gives a drag release its inertia.
        m.velocity += (target - m.velocity) * Math.min(1, 0.035 * dt);
        m.angle += m.velocity * dt;
        // Once it has nearly stopped, settle on the closest card so one is always centered.
        if (target === 0 && Math.abs(m.velocity) < 0.03) {
          const nearest = Math.round(m.angle / step) * step;
          if (Math.abs(nearest - m.angle) > 0.05) m.snapTo = nearest;
        }
      }

      m.tiltX += (m.tiltTarget - m.tiltX) * Math.min(1, 0.08 * dt);

      if (ringRef.current) {
        ringRef.current.style.transform = `translateZ(${-radius}px) rotateX(${m.tiltX}deg) rotateY(${m.angle}deg)`;
      }

      let front = 0;
      let best = -2;
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const a = ((i * step + m.angle) * Math.PI) / 180;
        const facing = Math.cos(a); // 1 = facing the viewer, -1 = behind the ring
        const k = (facing + 1) / 2;
        el.style.opacity = String(0.05 + 0.95 * Math.pow(k, 1.5));
        el.style.filter = `saturate(${0.4 + 0.6 * k})`;
        el.style.pointerEvents = facing > 0.7 ? "auto" : "none";
        const inner = el.firstElementChild as HTMLElement | null;
        if (inner) inner.style.transform = `scale(${0.86 + 0.14 * Math.pow(k, 3)})`;
        if (facing > best) {
          best = facing;
          front = i;
        }
      });

      if (front !== lastFront && counterRef.current) {
        lastFront = front;
        counterRef.current.textContent = `${String((front % n) + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")}`;
      }

      if (m.visible) raf = requestAnimationFrame(render);
    }

    // Only animate while the section is on screen.
    const observer = new IntersectionObserver(([entry]) => {
      const wasVisible = m.visible;
      m.visible = entry.isIntersecting;
      if (m.visible && !wasVisible) {
        last = performance.now();
        raf = requestAnimationFrame(render);
      }
    });
    if (stageRef.current) observer.observe(stageRef.current);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
      m.visible = false;
    };
  }, [n, step, radius]);

  function snapBy(dir: 1 | -1) {
    const m = motion.current;
    const base = m.snapTo ?? m.angle;
    m.snapTo = Math.round(base / step) * step - dir * step;
  }

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    const m = motion.current;
    m.dragging = true;
    m.snapTo = null;
    m.lastX = e.clientX;
    m.velocity = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const m = motion.current;
    const rect = e.currentTarget.getBoundingClientRect();
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    m.tiltTarget = -6 + py * 10;
    if (!m.dragging) return;
    const dx = e.clientX - m.lastX;
    m.lastX = e.clientX;
    m.angle += dx * DRAG_FACTOR;
    m.velocity = dx * DRAG_FACTOR;
  }

  function endDrag() {
    motion.current.dragging = false;
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      snapBy(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      snapBy(-1);
    }
  }

  return (
    <div className="relative mt-10">
      <div
        ref={stageRef}
        role="region"
        aria-roledescription="carousel"
        aria-label={t.testimonials.title}
        tabIndex={0}
        data-cursor-label={t.testimonials.drag}
        data-cursor-variant="compact"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerEnter={() => (motion.current.hovering = true)}
        onPointerLeave={() => {
          motion.current.hovering = false;
          motion.current.tiltTarget = -6;
          endDrag();
        }}
        onKeyDown={onKeyDown}
        className="relative mx-auto h-[460px] w-full touch-pan-y outline-none select-none sm:h-[500px]"
        style={{ perspective: "1400px", perspectiveOrigin: "50% 40%" }}
      >
        {/* Glow "floor" under the ring */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-6 left-1/2 h-24 w-[min(900px,90vw)] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(217,70,239,0.28),rgba(124,58,237,0.12)_45%,transparent_70%)] blur-2xl"
        />

        <div
          ref={ringRef}
          className="absolute top-1/2 left-1/2 h-0 w-0"
          style={{ transformStyle: "preserve-3d", transform: `translateZ(${-radius}px) rotateX(-6deg)` }}
        >
          {slots.map((item, i) => (
            <div
              key={`${item.id}-${i}`}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="absolute"
              style={{
                width: cardW,
                height: cardH,
                left: -cardW / 2,
                top: -cardH / 2,
                transform: `rotateY(${i * step}deg) translateZ(${radius}px)`,
                opacity: Math.cos((i * step * Math.PI) / 180) > 0 ? 1 : 0.1,
              }}
            >
              <div className="h-full w-full transition-transform duration-300 ease-out hover:!scale-[1.04]">
                <Card item={item} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-2 flex items-center justify-center gap-5">
        <RoundButton label={t.testimonials.prev} onClick={() => snapBy(-1)}>
          ←
        </RoundButton>
        <span ref={counterRef} className="w-16 text-center font-mono text-xs tracking-widest text-zinc-500">
          01 / {String(n).padStart(2, "0")}
        </span>
        <RoundButton label={t.testimonials.next} onClick={() => snapBy(1)}>
          →
        </RoundButton>
      </div>
    </div>
  );
}

function RoundButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 text-zinc-700 transition-all hover:scale-110 hover:border-fuchsia-500 hover:text-fuchsia-600 active:scale-95 dark:border-zinc-700 dark:text-zinc-300 dark:hover:text-fuchsia-400"
    >
      {children}
    </button>
  );
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

function Card({ item }: { item: PublicTestimonial }) {
  const subtitle = [item.role, item.company].filter(Boolean).join(" · ");

  return (
    <article className="h-full rounded-2xl bg-gradient-to-br from-violet-600/70 via-fuchsia-500/40 to-orange-500/70 p-px shadow-[0_20px_60px_-20px_rgba(217,70,239,0.45)]">
      <div className="relative flex h-full flex-col overflow-hidden rounded-[15px] bg-white p-6 dark:bg-zinc-950">
        <span
          aria-hidden
          className="pointer-events-none absolute -top-6 right-3 bg-gradient-to-br from-violet-600 via-fuchsia-500 to-orange-500 bg-clip-text font-serif text-[120px] leading-none text-transparent opacity-25"
        >
          &ldquo;
        </span>

        <div className="flex gap-0.5" aria-label={`${item.rating}/5`}>
          {[1, 2, 3, 4, 5].map((s) => (
            <svg key={s} viewBox="0 0 20 20" width="16" height="16" className={s <= item.rating ? "text-orange-400" : "text-zinc-300 dark:text-zinc-700"} fill="currentColor">
              <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
            </svg>
          ))}
        </div>

        <p
          className={`mt-4 flex-1 text-sm leading-relaxed whitespace-pre-line text-zinc-700 dark:text-zinc-300 ${
            item.project ? "line-clamp-5" : "line-clamp-7"
          }`}
        >
          {item.message}
        </p>

        {item.project && (
          // Can be up to 200 characters, so it is a short note rather than a pill.
          <p title={item.project} className="mt-3 line-clamp-3 border-l-2 border-fuchsia-500/60 pl-2.5 text-xs leading-snug text-fuchsia-700 dark:text-fuchsia-300">
            {item.project}
          </p>
        )}

        <div className="mt-4 flex items-center gap-3 border-t border-zinc-200 pt-4 dark:border-zinc-800">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 via-fuchsia-500 to-orange-500 text-sm font-bold text-white">
            {initials(item.name)}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-zinc-950 dark:text-zinc-50">{item.name}</p>
            {subtitle && <p className="truncate text-xs text-zinc-500">{subtitle}</p>}
          </div>
        </div>
      </div>
    </article>
  );
}
