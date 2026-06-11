import { Inter, Inter_Tight } from "next/font/google";
import {
  Activity,
  AlertTriangle,
  BadgePercent,
  BellRing,
  History,
  Library,
  Mail,
  Plug,
  ScanSearch,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { BRAND } from "@/lib/brand";

// La landing vive FUERA del admin embebido de Shopify: es pública, sin auth y
// sin Polaris. Aquí la marca aplica al 100%. Igual que app/privacy/page.tsx,
// trae su propia tipografía y estilos encapsulados (scope `.lp`) para no
// depender de —ni interferir con— Polaris, y porque el proyecto no usa Tailwind.
//
// ADN visual compartido con la app (lib/brand.ts): mismo púrpura, mismos cortes
// de color del Protection score (verde >=85, ámbar 60-84, rojo <60), mismos
// chips de severidad y mismo vocabulario ("Protection score"). El dashboard del
// hero es, deliberadamente, una previsualización fiel de la app.
//
// Tipografía: Inter Tight para titulares (display) e Inter para el cuerpo. Inter
// es la misma familia que usa Polaris in-app, así que el cuerpo se lee como el
// mismo producto. Se cargan vía next/font como variables CSS aplicadas SOLO
// dentro de `.lp`, sin inyección global (la app embebida no se ve afectada).

const display = Inter_Tight({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

// URL del listing en el App Store. Romina la rellena vía env cuando exista;
// el fallback es la URL eventual del handle de la app.
const INSTALL_URL =
  process.env.NEXT_PUBLIC_INSTALL_URL ?? "https://apps.shopify.com/b2b-guardrail";

// Bloque "See it in your store": capturas reales del dashboard. Los assets viven
// en landing/public/screenshots y se sirven por URL (convención Next para
// estáticos); next/image los optimiza usando las dimensiones intrínsecas que
// pasamos abajo, lo que preserva el aspect ratio de cada captura.
const SHOW_SCREENSHOTS = true;

// width/height = dimensiones reales del PNG (preservan proporción; next/image
// reescala con `sizes`). El copy es fiel a lo que hace la app, sin claims nuevos.
const SCREENSHOTS = [
  {
    src: "/screenshots/b2b_guardrail_price_list_public_clean_final.png",
    width: 2658,
    height: 1555,
    title: "Catch leaks the moment they appear",
    caption:
      "Each finding shows what’s wrong, what it affects, and a direct link to fix it in your Shopify admin.",
    alt: "B2B Guardrail dashboard showing a critical finding: a wholesale price list exposed in a public catalog, with the recommended fix and a direct link to the Shopify admin.",
  },
  {
    src: "/screenshots/b2b_guardrail_score_history_improving_final.png",
    width: 1900,
    height: 487,
    title: "Track your protection score over time",
    caption:
      "Run audits manually or let them run automatically. Your protection score climbs as you close leaks.",
    alt: "Protection score history chart showing scores improving from 45 to 97 across recent audits.",
  },
  {
    src: "/screenshots/b2b_guardrail_protected_state_clean_from_capture.png",
    width: 1935,
    height: 1720,
    title: "Reach a protected state, and stay there",
    caption:
      "Once your store is clean, we keep watching. New leaks are caught and surfaced right away.",
    alt: "B2B Guardrail dashboard showing the store in a Protected state with no open critical issues.",
  },
];

// Colores de severidad: mismos cortes semánticos que la app. Punto + chip con
// tinte suave. Sustituyen a los emoji del mockup anterior.
const SEVERITY = {
  critical: { dot: "#D72C0D", bg: "#FBEAE7", text: "#B3240B", label: "critical" },
  warning: { dot: "#B98900", bg: "#FAF1DB", text: "#7A5C00", label: "warning" },
  ok: { dot: "#0E7C5B", bg: "#E3F3EC", text: "#0E7C5B", label: "protected" },
} as const;

// Situaciones reconocibles de la sección Problem. Cada una mapea 1:1 a un
// detector real (no introducir ninguna que la app no audite).
const PROBLEM_ITEMS = [
  "A wholesale price quietly showing up for regular shoppers",
  "A WHOLESALE40 code that escaped to a coupon site, and now anyone can use it",
  "Two automatic discounts stacking into a margin you never approved",
  "A B2B price list left attached to your public catalog",
];

const STEPS = [
  {
    icon: Plug,
    title: "Install",
    body: "Connect B2B Guardrail to your Shopify store in seconds. No code, no setup.",
  },
  {
    icon: ScanSearch,
    title: "We audit",
    body: "Continuous scans across price lists, customer catalogs, discount codes, and automatic discounts.",
  },
  {
    icon: BellRing,
    title: "You stay informed",
    body: "Instant alerts via email or Slack the moment something breaks. Track your store's protection score over time.",
  },
];

const FEATURES = [
  {
    icon: Library,
    title: "B2B catalog audits",
    body: "Detect when wholesale price lists are visible to retail customers via public sales channels.",
  },
  {
    icon: BadgePercent,
    title: "Discount code monitoring",
    body: "Track whether codes with B2B keywords (WHOLESALE, DISTRIBUTOR) are restricted to the right customers.",
  },
  {
    icon: AlertTriangle,
    title: "Automatic discount conflicts",
    body: "Identify automatic discounts left applying store-wide when they were meant for a specific group.",
  },
  {
    icon: Activity,
    title: "Protection score tracking",
    body: "A single number from 0 to 100 that tells you whether your B2B pricing is currently safe.",
  },
  {
    icon: Zap,
    title: "Instant alerts",
    body: "Email and Slack notifications the moment a new leak appears, with details on what changed.",
  },
  {
    icon: History,
    title: "Persistent finding tracking",
    body: "Each issue tracked across audits. Mark intentional configurations as such and silence future alerts.",
  },
];

const PLANS = [
  {
    name: "Free",
    price: "$0",
    cadence: "/mo",
    featured: false,
    features: [
      "Unlimited manual audits",
      "Full detection coverage",
      "Protection score & findings",
    ],
    cta: "Get started free",
  },
  {
    name: "Starter",
    price: "$29",
    cadence: "/mo",
    featured: true,
    features: [
      "Everything in Free",
      "Daily automatic audits",
      "Email alerts",
      "7-day free trial",
    ],
    cta: "Start free trial",
  },
  {
    name: "Pro",
    price: "$79",
    cadence: "/mo",
    featured: false,
    features: [
      "Everything in Starter",
      "Hourly automatic audits",
      "Slack alerts (in addition to email)",
      "7-day free trial",
    ],
    cta: "Start free trial",
  },
];

const FAQS = [
  {
    q: "What data does B2B Guardrail collect?",
    a: "Only your store's pricing configuration: catalogs, price lists, discount codes, and price rules. We do not collect or store data about your customers. Learn more in our Privacy Policy.",
  },
  {
    q: "What happens when you find a leak?",
    a: "You're notified via email (Starter) or email and Slack (Pro). The issue appears in your dashboard with details about what changed. Mark intentional configurations as such to silence future alerts.",
  },
  {
    q: "Can I trust your alerts?",
    a: "We use Shopify's official Admin API and check three independent leak vectors (catalogs, discount codes, automatic discounts). Findings are deduplicated and tracked persistently.",
  },
  // Claim verificado contra el código (no ablandar sin re-auditar primero):
  //  - "deleted immediately on uninstall": el webhook app/uninstalled
  //    (app/api/webhooks/app-uninstalled) borra el Shop con cascada a
  //    Audit/Finding/Alert; el accessToken vive en Shop y cae con él.
  //  - "final compliance check 48 hours later": el webhook shop/redact
  //    (app/api/webhooks/shop/redact), que Shopify dispara ~48h tras
  //    desinstalar; re-borra de forma idempotente y registra ComplianceRequest.
  //  - "GDPR": los 3 webhooks de compliance están suscritos en shopify.app.toml.
  {
    q: "What if I uninstall?",
    a: "All your data is deleted immediately on uninstall, with a final compliance check 48 hours later. We follow GDPR requirements for data handling.",
  },
  {
    q: "Where is my data stored?",
    a: "On Supabase in Stockholm (EU). All traffic encrypted in transit. Access tokens encrypted at rest.",
  },
  {
    q: "Do I need Shopify Plus to use B2B Guardrail?",
    a: "No. B2B Guardrail works with any Shopify store that uses B2B or wholesale features, including the native B2B tools now available on standard Shopify plans, not just Plus. If your store serves both retail and business buyers, it can help.",
  },
];

// Findings del Protection score del hero: estado realista (Needs attention, 64).
// Severidades y textos derivados de detectores reales.
const HERO_FINDINGS: { sev: keyof typeof SEVERITY; text: string }[] = [
  { sev: "critical", text: "Wholesale price list in public catalog" },
  { sev: "warning", text: "WHOLESALE40 code usable by anyone" },
];

// Protection score del hero. Anillo SVG: track neutro + arco en el color de la
// banda (64 -> ámbar "Needs attention"). circ = 2·π·r; offset = circ·(1 − score/100).
const HERO_SCORE = 64;
const RING_R = 80;
const RING_CIRC = 2 * Math.PI * RING_R;
const RING_OFFSET = RING_CIRC * (1 - HERO_SCORE / 100);

/** Color del arco por banda de score: mismos cortes que la app. */
function scoreColor(score: number): string {
  if (score >= 85) return SEVERITY.ok.dot;
  if (score >= 60) return SEVERITY.warning.dot;
  return SEVERITY.critical.dot;
}

export function Landing() {
  const ringColor = scoreColor(HERO_SCORE);

  return (
    <main className={`lp ${display.variable} ${body.variable}`}>
      <style>{`
        .lp {
          --brand: ${BRAND.primary};
          --brand-hover: ${BRAND.primaryHover};
          --brand-active: ${BRAND.primaryActive};
          --brand-light: ${BRAND.primaryLight};
          --brand-soft: ${BRAND.primarySoft};
          --ink: #1A1523;
          --muted: #6B6577;
          --border: #ECE9F2;
          --surface: #ffffff;

          font-family: var(--font-body), system-ui, sans-serif;
          color: var(--ink);
          line-height: 1.6;
          font-size: 17px;
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
        }
        .lp * { box-sizing: border-box; }
        .lp h1, .lp h2, .lp h3 {
          font-family: var(--font-display), system-ui, sans-serif;
          font-weight: 600;
        }

        .lp .container {
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        .lp section { padding: 7rem 0; }
        .lp .bg-light { background: var(--brand-light); }

        .lp .eyebrow {
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.09em;
          color: var(--brand);
          margin: 0 0 0.85rem;
        }
        .lp h2 {
          font-size: 39px;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin: 0 0 1rem;
        }
        .lp h3 {
          font-size: 21px;
          font-weight: 600;
          line-height: 1.3;
          margin: 0 0 0.5rem;
          letter-spacing: -0.01em;
        }
        .lp p { margin: 0; }
        .lp .lead {
          font-size: 20px;
          color: var(--muted);
          max-width: 640px;
          line-height: 1.55;
        }
        .lp .section-head { max-width: 700px; margin: 0 0 3.5rem; }

        /* Botones */
        .lp .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-family: var(--font-body), system-ui, sans-serif;
          font-weight: 600;
          font-size: 16px;
          line-height: 1;
          padding: 16px 26px;
          border-radius: 12px;
          text-decoration: none;
          cursor: pointer;
          border: 1px solid transparent;
          transition: background-color 0.15s ease, color 0.15s ease,
            border-color 0.15s ease, transform 0.15s ease;
        }
        .lp .btn-primary { background: var(--brand); color: #fff; }
        .lp .btn-primary:hover { background: var(--brand-hover); }
        .lp .btn-primary:active { background: var(--brand-active); }
        .lp .btn-secondary {
          background: transparent;
          color: var(--brand);
          border-color: var(--brand);
        }
        .lp .btn-secondary:hover { background: var(--brand); color: #fff; }
        .lp .btn-on-purple { background: #fff; color: var(--brand); }
        .lp .btn-on-purple:hover { transform: translateY(-1px); }
        .lp .btn:focus-visible,
        .lp a:focus-visible {
          outline: 2px solid var(--brand);
          outline-offset: 3px;
        }

        /* Top bar */
        .lp .topbar { padding: 1.25rem 0; border-bottom: 1px solid var(--border); }
        .lp .topbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }
        .lp .brand-mark { display: inline-flex; align-items: center; gap: 0.625rem; }
        /* Tamaño forzado: el reset global de Polaris (cargado en el root layout)
           pisa los atributos width/height del <img>, lo que estiraba el logo. */
        .lp .brand-mark img {
          display: block;
          flex-shrink: 0;
          width: 30px;
          height: 30px;
          object-fit: contain;
        }
        .lp .footer-brand img {
          display: block;
          flex-shrink: 0;
          width: 24px;
          height: 24px;
          object-fit: contain;
        }
        .lp .brand-mark .wordmark {
          font-family: var(--font-display), system-ui, sans-serif;
          font-weight: 600;
          font-size: 18px;
          color: var(--ink);
          letter-spacing: -0.01em;
        }
        .lp .topbar .btn { padding: 11px 18px; font-size: 15px; }

        /* Hero */
        .lp .hero {
          position: relative;
          overflow: hidden;
          padding: 6rem 0;
          background: linear-gradient(180deg, #ffffff 0%, var(--brand-light) 100%);
        }
        /* Wash suave de marca, muy tenue: profundidad sin "gradiente de stock". */
        .lp .hero-orb {
          position: absolute;
          top: -220px;
          right: -160px;
          width: 560px;
          height: 560px;
          background: radial-gradient(circle, var(--brand) 0%, transparent 68%);
          opacity: 0.08;
          filter: blur(60px);
          pointer-events: none;
          z-index: 0;
        }
        .lp .hero .container { position: relative; z-index: 1; }
        .lp .hero-grid {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 4rem;
          align-items: center;
        }
        .lp .hero h1 {
          font-size: 56px;
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.035em;
          margin: 0 0 1.5rem;
        }
        .lp .hero .lead { margin: 0 0 2rem; font-size: 19px; }
        .lp .hero-actions { display: flex; flex-wrap: wrap; gap: 0.75rem; }
        .lp .subnote { font-size: 14px; color: var(--muted); margin: 1rem 0 0; }

        /* ---------- Preview card del Protection score (elemento signature) ---------- */
        .lp .preview-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 18px;
          box-shadow: 0 24px 60px -28px rgba(26, 21, 35, 0.28);
          padding: 24px;
          width: 100%;
          max-width: 460px;
          margin-left: auto;
        }
        .lp .pc-topstrip { display: flex; align-items: center; gap: 8px; }
        .lp .pc-topstrip img {
          width: 22px; height: 22px; display: block; flex-shrink: 0;
          border-radius: 6px; object-fit: contain;
        }
        .lp .pc-app-name {
          font-family: var(--font-display), system-ui, sans-serif;
          font-weight: 600; font-size: 14px; color: var(--ink);
        }
        .lp .pc-status {
          margin-left: auto; display: flex; align-items: center; gap: 6px;
          font-size: 12px; color: var(--muted);
        }
        .lp .pc-status .dot {
          width: 8px; height: 8px; border-radius: 999px;
          background: ${SEVERITY.ok.dot};
        }
        .lp .pc-divider { border-top: 1px solid var(--border); margin: 18px 0; }
        .lp .pc-score { display: flex; align-items: center; gap: 20px; }
        .lp .pc-ring { position: relative; width: 124px; height: 124px; flex-shrink: 0; }
        .lp .pc-ring svg { display: block; }
        .lp .pc-ring-center {
          position: absolute; inset: 0; display: flex; flex-direction: column;
          align-items: center; justify-content: center;
        }
        .lp .pc-ring-score {
          font-family: var(--font-display), system-ui, sans-serif;
          font-weight: 700; font-size: 34px; line-height: 1; color: var(--ink);
        }
        .lp .pc-ring-total { font-size: 11px; color: var(--muted); margin-top: 2px; }
        .lp .pc-badge {
          display: inline-flex; align-items: center;
          font-size: 12px; font-weight: 600; padding: 4px 10px; border-radius: 999px;
          background: ${SEVERITY.warning.bg}; color: ${SEVERITY.warning.text};
        }
        .lp .pc-lastaudit { font-size: 12px; color: var(--muted); margin-top: 8px; }
        .lp .pc-findings { display: flex; flex-direction: column; gap: 2px; }
        .lp .pc-finding {
          display: flex; align-items: center; gap: 10px; padding: 7px 0;
        }
        .lp .pc-finding .fdot {
          width: 8px; height: 8px; border-radius: 999px; flex-shrink: 0;
        }
        .lp .pc-finding-text {
          flex: 1; font-size: 13.5px; color: var(--ink); line-height: 1.4;
        }
        .lp .pc-tag {
          flex-shrink: 0; font-size: 11px; font-weight: 600;
          padding: 2px 8px; border-radius: 6px;
        }

        /* Problem: lista de momentos reconocibles (sin cards). */
        .lp .problem-list {
          list-style: none; padding: 0; margin: 0 0 2rem;
          display: grid; gap: 1rem; max-width: 760px;
        }
        .lp .problem-list li {
          display: flex; align-items: flex-start; gap: 0.85rem;
          font-size: 18px; color: var(--ink); line-height: 1.5;
        }
        .lp .problem-list .pi-icon {
          flex-shrink: 0; margin-top: 2px;
          color: ${SEVERITY.warning.dot};
        }
        .lp .problem-close {
          font-size: 18px; color: var(--muted); max-width: 720px; line-height: 1.55;
        }
        .lp .problem-close strong { color: var(--ink); font-weight: 600; }

        /* Sección "New to B2B" — una columna centrada. */
        .lp .newb2b { text-align: center; }
        .lp .newb2b-inner { max-width: 640px; margin: 0 auto; }
        .lp .newb2b h2 { margin-bottom: 1rem; }
        .lp .newb2b p { color: var(--muted); font-size: 18px; margin-bottom: 2rem; }

        /* Grid de feature cards */
        .lp .grid-3 {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;
        }
        .lp .card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 2rem;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .lp .card:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 40px -24px rgba(26, 21, 35, 0.3);
        }
        .lp .card p { color: var(--muted); font-size: 16px; line-height: 1.6; }

        /* Icono en cuadrado redondeado (patrón compartido con el listing). */
        .lp .icon-tile {
          display: inline-flex; align-items: center; justify-content: center;
          width: 48px; height: 48px; border-radius: 12px;
          background: var(--brand-light); color: var(--brand);
          margin-bottom: 1.25rem;
        }

        /* How it works — pasos */
        .lp .steps {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 2.5rem;
        }
        .lp .step .step-num {
          font-family: var(--font-display), system-ui, sans-serif;
          font-weight: 700; font-size: 56px; line-height: 1;
          color: var(--brand); opacity: 0.18; margin-bottom: 0.25rem;
          letter-spacing: -0.03em;
        }
        .lp .step-head { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; }
        .lp .step-head svg { color: var(--brand); flex-shrink: 0; }
        .lp .step-head h3 { margin: 0; }
        .lp .step p { color: var(--muted); font-size: 16px; }

        /* ---------- Mockup de alerta email ---------- */
        .lp .email-mock {
          max-width: 480px; margin: 3.5rem auto 0;
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 14px; padding: 22px; text-align: left;
          box-shadow: 0 16px 40px -28px rgba(26, 21, 35, 0.25);
        }
        .lp .email-head {
          display: flex; align-items: center; gap: 6px; color: var(--muted);
          font-size: 11px; text-transform: uppercase; letter-spacing: 0.07em;
          margin-bottom: 12px;
        }
        .lp .email-head svg { color: var(--muted); flex-shrink: 0; }
        .lp .email-subject {
          font-weight: 600; font-size: 16px; color: var(--ink);
          line-height: 1.4; margin-bottom: 12px;
        }
        .lp .email-body p { font-size: 14px; color: #4a4654; line-height: 1.6; margin-bottom: 8px; }
        .lp .email-cta {
          display: inline-block; margin-top: 6px; color: var(--brand);
          font-size: 14px; font-weight: 600; text-decoration: none;
        }
        .lp .email-cta:hover { color: var(--brand-hover); text-decoration: underline; }

        /* Pricing */
        .lp .plans {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;
          align-items: start;
        }
        .lp .plan {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 16px; padding: 2rem;
          display: flex; flex-direction: column;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .lp .plan:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 48px -26px rgba(26, 21, 35, 0.32);
        }
        .lp .plan.featured {
          border-color: var(--brand);
          box-shadow: 0 16px 40px -24px rgba(121, 77, 204, 0.5);
          position: relative;
        }
        .lp .plan .badge {
          position: absolute; top: 0; left: 50%;
          transform: translate(-50%, -50%);
          background: var(--brand); color: #fff;
          font-size: 11px; font-weight: 600; letter-spacing: 0.05em;
          text-transform: uppercase; padding: 6px 14px; border-radius: 999px;
          white-space: nowrap;
        }
        .lp .plan .plan-name {
          font-family: var(--font-display), system-ui, sans-serif;
          font-weight: 600; font-size: 20px; margin: 0 0 0.5rem;
        }
        .lp .plan .price {
          font-family: var(--font-display), system-ui, sans-serif;
          font-weight: 700; font-size: 44px; line-height: 1; color: var(--ink);
          letter-spacing: -0.02em;
        }
        .lp .plan .price .cadence { font-size: 16px; font-weight: 400; color: var(--muted); }
        .lp .plan ul { list-style: none; padding: 0; margin: 1.75rem 0; flex: 1; }
        .lp .plan li {
          position: relative; padding-left: 1.75rem; margin-bottom: 0.75rem;
          font-size: 16px; color: var(--ink);
        }
        .lp .plan li::before {
          content: ""; position: absolute; left: 0; top: 0.55em;
          width: 8px; height: 8px; border-radius: 999px; background: var(--brand);
        }
        .lp .plan .btn { width: 100%; }
        .lp .billing-note {
          text-align: center; font-size: 14px; color: var(--muted); margin: 2.5rem 0 0;
        }
        .lp .billing-note a { color: var(--brand); text-decoration: underline; }
        .lp .billing-note a:hover { color: var(--brand-hover); text-decoration: none; }

        /* FAQ */
        .lp .faq-list { display: grid; gap: 2rem; max-width: 820px; }
        .lp .faq h3 { font-size: 19px; margin-bottom: 0.5rem; }
        .lp .faq p { color: var(--muted); font-size: 16px; }

        /* Nota de posicionamiento (cierre sobrio antes del CTA final). */
        .lp .positioning {
          text-align: center; padding: 5rem 0;
          border-top: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
        }
        .lp .positioning p {
          max-width: 720px; margin: 0 auto; color: var(--muted);
          font-size: 17px; line-height: 1.6;
        }
        .lp .positioning strong { color: var(--ink); font-weight: 500; }

        /* Final CTA */
        .lp .final-cta { background: var(--brand); color: #fff; text-align: center; }
        .lp .final-cta h2 { color: #fff; font-size: 40px; }
        .lp .final-cta p {
          color: rgba(255, 255, 255, 0.9); font-size: 18px;
          max-width: 520px; margin: 0 auto 2rem;
        }

        /* Footer */
        .lp footer { background: var(--brand-light); padding: 3rem 0; }
        .lp .footer-inner {
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 1.25rem;
        }
        .lp .footer-brand {
          display: flex; align-items: center; gap: 0.625rem;
          font-size: 14px; color: var(--muted);
        }
        .lp .footer-brand .wordmark {
          font-family: var(--font-display), system-ui, sans-serif;
          font-weight: 600; font-size: 15px; color: var(--ink);
        }
        .lp .footer-links { display: flex; gap: 1.5rem; font-size: 14px; }
        .lp .footer-links a { color: var(--muted); text-decoration: none; }
        .lp .footer-links a:hover { color: var(--brand); }
        .lp .copyright { font-size: 14px; color: var(--muted); }

        /* Sub-hero: ancla de coste concreto (estimación, sobria, sin card). */
        .lp .cost-anchor { padding: 4rem 0 0; text-align: center; }
        .lp .cost-anchor p {
          max-width: 720px; margin: 0 auto; font-size: 20px; line-height: 1.5;
          color: var(--muted);
        }
        .lp .cost-anchor strong { color: var(--ink); font-weight: 500; }

        /* Tagline de categoría bajo el wordmark (ayuda de escaneo, solo desktop). */
        .lp .brand-text { display: inline-flex; flex-direction: column; line-height: 1.15; }
        .lp .brand-tagline {
          font-size: 11px; font-weight: 400; color: var(--muted); letter-spacing: 0;
        }

        /* "See it in your store": cards con capturas reales del dashboard.
           Cada imagen conserva su aspect ratio (sin recorte); las cards se
           alinean arriba porque las capturas tienen alturas distintas. */
        .lp .shots-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;
          align-items: start;
        }
        .lp .shot-card {
          margin: 0; background: var(--surface); border: 1px solid var(--border);
          border-radius: 16px; padding: 1rem;
          box-shadow: 0 10px 30px -22px rgba(26, 21, 35, 0.25);
        }
        .lp .shot-img {
          display: block; width: 100%; height: auto;
          border-radius: 10px; border: 1px solid var(--border); background: #fff;
        }
        /* Desktop: alto fijo + contain para que las 3 cards queden uniformes pese
           a los aspect ratios distintos, sin recortar nada (las franjas blancas
           del contain casan con el fondo de la imagen). En mobile, apiladas, las
           imágenes van a su tamaño natural. */
        @media (min-width: 901px) {
          .lp .shot-img { height: 200px; object-fit: contain; }
        }
        .lp .shot-card figcaption { padding: 1rem 0.5rem 0.5rem; }
        .lp .shot-title {
          font-size: 17px; font-weight: 600; margin: 0 0 0.35rem;
          line-height: 1.3; letter-spacing: -0.01em;
        }
        .lp .shot-caption {
          font-size: 14.5px; color: var(--muted); line-height: 1.55; margin: 0;
        }

        /* ---------- Responsive ---------- */
        @media (max-width: 900px) {
          .lp .grid-3, .lp .steps, .lp .plans, .lp .shots-grid { grid-template-columns: 1fr; }
          .lp .steps { gap: 2rem; }
          .lp .hero-grid { grid-template-columns: 1fr; gap: 2.5rem; text-align: center; }
          /* Mobile: el ring del score va arriba, H1 y subheadline debajo. */
          .lp .hero-card-wrap { order: -1; }
          .lp .preview-card { margin: 0 auto; }
          .lp .hero .lead { margin-left: auto; margin-right: auto; }
          .lp .hero-actions { justify-content: center; }
          .lp .problem-list, .lp .problem-close { margin-left: auto; margin-right: auto; }
        }
        @media (max-width: 640px) {
          .lp { font-size: 16px; }
          /* La tagline de categoría se oculta en móvil para no apretar el topbar. */
          .lp .brand-tagline { display: none; }
          .lp .container { padding: 0 1.5rem; }
          .lp section { padding: 4rem 0; }
          .lp .hero { padding: 3rem 0 4rem; }
          .lp .hero h1 { font-size: 36px; }
          .lp .hero .lead { font-size: 17px; }
          .lp h2, .lp .final-cta h2 { font-size: 29px; }
          .lp .section-head { margin-bottom: 2.5rem; }
          .lp .problem-list li, .lp .problem-close { font-size: 16px; }
          .lp .hero-actions .btn { width: 100%; }
          .lp .hero-orb { width: 300px; height: 300px; top: -120px; right: -100px; }
        }

        /* Movimiento mínimo y respetuoso. */
        @media (prefers-reduced-motion: reduce) {
          .lp * { transition: none !important; }
          .lp .card:hover, .lp .plan:hover, .lp .btn-on-purple:hover {
            transform: none;
          }
        }
      `}</style>

      {/* 1. Top bar */}
      <header className="topbar">
        <div className="container topbar-inner">
          <span className="brand-mark">
            {/* Icono de marca con fondo (SVG vectorial, crujiente a cualquier
                tamaño). <img> evita el optimizador de next/image. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/b2b-guardrail-icon.svg" alt="B2B Guardrail" width={30} height={30} />
            <span className="brand-text">
              <span className="wordmark">B2B Guardrail</span>
              <span className="brand-tagline">Pricing observability for Shopify B2B</span>
            </span>
          </span>
          <a className="btn btn-primary" href={INSTALL_URL}>
            Install on Shopify
          </a>
        </div>
      </header>

      {/* 2. Hero */}
      <section className="hero">
        <div className="hero-orb" aria-hidden="true" />
        <div className="container">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Running B2B and retail from one store?</p>
              <h1>Stop pricing leaks before they cost you.</h1>
              <p className="lead">
                Most merchants don&rsquo;t find out their wholesale prices leaked
                until a customer does. B2B Guardrail watches your store and alerts
                you the moment a B2B price, catalog, or discount becomes visible to
                retail shoppers, so you catch it in seconds, not in next
                quarter&rsquo;s numbers.
              </p>
              <div className="hero-actions">
                <a className="btn btn-primary" href={INSTALL_URL}>
                  Install on Shopify
                </a>
                <a className="btn btn-secondary" href={INSTALL_URL}>
                  Try the free plan
                </a>
              </div>
              <p className="subnote">Free plan available. No credit card required.</p>
            </div>

            {/* Preview del Protection score: previsualización fiel de la app. */}
            <div className="hero-card-wrap">
              <div
                className="preview-card"
                role="img"
                aria-label="B2B Guardrail dashboard showing a protection score of 64 out of 100, Needs attention, with one critical and one warning finding"
              >
                <div className="pc-topstrip">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/b2b-guardrail-icon.svg" alt="" width={22} height={22} />
                  <span className="pc-app-name">B2B Guardrail</span>
                  <span className="pc-status">
                    <span className="dot" />
                    Connected
                  </span>
                </div>

                <div className="pc-divider" />

                <div className="pc-score">
                  <div className="pc-ring">
                    <svg width="124" height="124" viewBox="0 0 200 200" aria-hidden="true">
                      <circle
                        cx="100"
                        cy="100"
                        r={RING_R}
                        fill="none"
                        stroke="#ECE9F2"
                        strokeWidth="16"
                      />
                      <circle
                        cx="100"
                        cy="100"
                        r={RING_R}
                        fill="none"
                        stroke={ringColor}
                        strokeWidth="16"
                        strokeLinecap="round"
                        strokeDasharray={RING_CIRC}
                        strokeDashoffset={RING_OFFSET}
                        transform="rotate(-90 100 100)"
                      />
                    </svg>
                    <div className="pc-ring-center">
                      <span className="pc-ring-score">{HERO_SCORE}</span>
                      <span className="pc-ring-total">/ 100</span>
                    </div>
                  </div>
                  <div>
                    <span className="pc-badge">Needs attention</span>
                    <p className="pc-lastaudit">Last audit 2 hours ago</p>
                  </div>
                </div>

                <div className="pc-divider" />

                <div className="pc-findings">
                  {HERO_FINDINGS.map((f) => {
                    const s = SEVERITY[f.sev];
                    return (
                      <div className="pc-finding" key={f.text}>
                        <span className="fdot" style={{ background: s.dot }} />
                        <span className="pc-finding-text">{f.text}</span>
                        <span
                          className="pc-tag"
                          style={{ background: s.bg, color: s.text }}
                        >
                          {s.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-hero: ancla de coste. Estimación marcada como tal ("Rough math"):
          da urgencia con una cifra concreta en vez de solo adjetivos. */}
      <section className="cost-anchor">
        <div className="container">
          <p>
            Rough math: when a single configuration breaks,{" "}
            <strong>15 to 30 percent</strong> of your B2B margin can quietly
            reach retail shoppers, often unnoticed until quarter-end. On a store
            doing <strong>$50K a month</strong> in B2B, that&rsquo;s{" "}
            <strong>$7,500 to $15,000</strong> gone before anyone looks.
          </p>
        </div>
      </section>

      {/* 3. Problem — momentos reconocibles */}
      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">The problem</p>
            <h2>Does this sound familiar?</h2>
            <p className="lead">
              A wholesale price showing to retail shoppers can bleed margin for
              weeks before anyone notices. Hundreds of orders at the wrong price
              before a single complaint reaches you.
            </p>
          </div>
          <p className="problem-close" style={{ marginBottom: "2rem" }}>
            If you sell to both retail and wholesale on Shopify, these mistakes are
            easy to make and almost impossible to catch by eye.
          </p>
          <ul className="problem-list">
            {PROBLEM_ITEMS.map((item) => (
              <li key={item}>
                <AlertTriangle className="pi-icon" size={22} strokeWidth={1.75} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="problem-close">
            <strong>B2B Guardrail catches these automatically</strong>, ranks them
            by severity, and gives you a direct link to fix each one in your
            Shopify admin.
          </p>
        </div>
      </section>

      {/* 4. New to B2B? */}
      <section className="bg-light newb2b">
        <div className="container">
          <div className="newb2b-inner">
            <p className="eyebrow">New to B2B on Shopify?</p>
            <h2>Just turned on B2B features? That&rsquo;s exactly when leaks happen.</h2>
            <p>
              Shopify now lets any store add company profiles, custom catalogs, and
              wholesale pricing. Setting it up for the first time is also when
              it&rsquo;s easiest to misconfigure: a catalog left on a public
              channel, a discount that never got restricted. If you&rsquo;ve
              recently added B2B or wholesale to your store, run a free audit and
              see what&rsquo;s already exposed.
            </p>
            <a className="btn btn-secondary" href={INSTALL_URL}>
              Try the free plan
            </a>
          </div>
        </div>
      </section>

      {/* 5. How it works */}
      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">How it works</p>
            <h2>Monitor your B2B pricing 24/7.</h2>
            <p className="lead">
              Install B2B Guardrail and we audit your store&rsquo;s pricing
              configuration continuously. Every leak gets caught, scored, and
              surfaced before it costs you.
            </p>
          </div>
          <div className="steps">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div className="step" key={step.title}>
                  <div className="step-num">{i + 1}</div>
                  <div className="step-head">
                    <Icon size={22} strokeWidth={1.75} />
                    <h3>{step.title}</h3>
                  </div>
                  <p>{step.body}</p>
                </div>
              );
            })}
          </div>

          {/* Mockup de alerta email: hace concreto el "You stay informed". */}
          <div className="email-mock">
            <div className="email-head">
              <Mail size={14} strokeWidth={1.75} />
              <span>Email alert</span>
            </div>
            <p className="email-subject">
              Critical pricing leak detected on b2b-store.myshopify.com
            </p>
            <div className="email-body">
              <p>
                A wholesale price list (Tier 1 B2B) was attached to your Online
                Store channel 12 minutes ago.
              </p>
              <p>
                Affected products: 247 SKUs at wholesale pricing visible to retail
                customers.
              </p>
              <p>Protection score dropped from 96 to 64.</p>
            </div>
            <a className="email-cta" href={INSTALL_URL}>
              View finding in B2B Guardrail &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* 6. Features */}
      <section className="bg-light">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Features</p>
            <h2>What B2B Guardrail catches.</h2>
          </div>
          <div className="grid-3">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div className="card" key={feature.title}>
                  <span className="icon-tile">
                    <Icon size={24} strokeWidth={1.75} />
                  </span>
                  <h3>{feature.title}</h3>
                  <p>{feature.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* "See it in your store": capturas reales del dashboard (gated por
          SHOW_SCREENSHOTS). Eyebrow y H2 en el estilo del resto de la landing. */}
      {SHOW_SCREENSHOTS && (
        <section>
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">Inside the dashboard</p>
              <h2>See it in your store.</h2>
            </div>
            <div className="shots-grid">
              {SCREENSHOTS.map((s) => (
                <figure className="shot-card" key={s.src}>
                  <Image
                    src={s.src}
                    alt={s.alt}
                    width={s.width}
                    height={s.height}
                    sizes="(max-width: 900px) 100vw, 33vw"
                    className="shot-img"
                  />
                  <figcaption>
                    <h3 className="shot-title">{s.title}</h3>
                    <p className="shot-caption">{s.caption}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. Pricing */}
      <section>
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Pricing</p>
            <h2>Simple plans. Cancel anytime.</h2>
          </div>
          <div className="plans">
            {PLANS.map((plan) => (
              <div
                className={`plan${plan.featured ? " featured" : ""}`}
                key={plan.name}
              >
                {plan.featured && <span className="badge">Most popular</span>}
                <p className="plan-name">{plan.name}</p>
                <p className="price">
                  {plan.price}
                  <span className="cadence">{plan.cadence}</span>
                </p>
                <ul>
                  {plan.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <a
                  className={`btn ${plan.featured ? "btn-primary" : "btn-secondary"}`}
                  href={INSTALL_URL}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
          <p className="billing-note">
            Billed through Shopify. By subscribing you agree to our{" "}
            <a href="/privacy" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="bg-light">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">FAQ</p>
            <h2>Common questions.</h2>
          </div>
          <div className="faq-list">
            {FAQS.map((item) => (
              <div className="faq" key={item.q}>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Positioning — nota de cierre sobria */}
      <div className="positioning">
        <div className="container">
          <p>
            <strong>B2B Guardrail audits the prices and rules inside your own
            store.</strong>{" "}
            It doesn&rsquo;t track competitor prices, block browser coupons, or
            scan your SEO. It watches one thing: that your wholesale pricing never
            reaches retail customers.
          </p>
        </div>
      </div>

      {/* 10. Final CTA */}
      <section className="final-cta">
        <div className="container">
          <h2>Protect your pricing today.</h2>
          <p>It takes 60 seconds to install. Free plan available.</p>
          <a className="btn btn-on-purple" href={INSTALL_URL}>
            Install on Shopify
          </a>
        </div>
      </section>

      {/* 11. Footer */}
      <footer>
        <div className="container footer-inner">
          <span className="footer-brand">
            {/* Variante outlined sobre el fondo lila claro del footer. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/b2b-guardrail-icon-outline.svg" alt="" width={24} height={24} />
            <span className="wordmark">B2B Guardrail</span>
            <span>by Bweb Studio</span>
          </span>
          <nav className="footer-links">
            <a href="/privacy" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>
            <a href="https://bwebstudio.com" target="_blank" rel="noopener noreferrer">
              Bweb Studio
            </a>
          </nav>
          <span className="copyright">© 2026 Bweb Studio</span>
        </div>
      </footer>
    </main>
  );
}
