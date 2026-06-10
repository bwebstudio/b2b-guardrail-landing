import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { BRAND } from "@/lib/brand";

// La página de privacidad vive FUERA del admin embebido: es pública, sin auth y
// sin componentes de Polaris. Trae su propia tipografía (Inter) y estilos
// encapsulados bajo `.pp` para no depender de —ni interferir con— Polaris.
//
// Nota: el proyecto no usa Tailwind (rompería el reset de Polaris), por eso el
// estilo va en un <style> con scope propio en lugar de utilidades de Tailwind.

const inter = Inter({ subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  title: "B2B Guardrail Privacy Policy",
  description:
    "How B2B Guardrail collects, uses, and protects data for Shopify merchants.",
};

// Fecha fija de la versión vigente de la política (no usar la fecha de render).
const LAST_UPDATED = "June 3, 2026";

// Email de contacto. PLACEHOLDER sugerido: Romina debe confirmarlo antes del
// listing en el App Store.
const CONTACT_EMAIL = "privacy@bwebstudio.com";

export default function PrivacyPolicyPage() {
  return (
    <main className={`pp ${inter.className}`}>
      <style>{`
        .pp {
          --accent: ${BRAND.primary};
          max-width: 48rem;
          margin: 0 auto;
          padding: 4rem 1.5rem;
          color: #1a1a1a;
          line-height: 1.7;
          font-size: 1rem;
          font-weight: 400;
        }
        .pp h1 {
          font-size: 2rem;
          font-weight: 500;
          line-height: 1.25;
          margin: 0 0 0.5rem;
        }
        .pp h2 {
          font-size: 1.375rem;
          font-weight: 500;
          line-height: 1.3;
          margin: 2.5rem 0 0.75rem;
        }
        .pp h3 {
          font-size: 1.0625rem;
          font-weight: 500;
          margin: 1.5rem 0 0.5rem;
        }
        .pp p { margin: 0 0 1rem; }
        .pp ul { margin: 0 0 1rem; padding-left: 1.25rem; }
        .pp li { margin: 0 0 0.5rem; }
        .pp a { color: var(--accent); text-decoration: underline; }
        .pp a:hover { text-decoration: none; }
        .pp strong { font-weight: 500; }
        .pp .updated { color: var(--accent); font-weight: 500; }
        .pp .lead { font-size: 1.0625rem; color: #3a3a3a; }
        .pp address {
          font-style: normal;
          margin: 0 0 1rem;
        }
        @media (max-width: 480px) {
          .pp { padding: 2.5rem 1.25rem; font-size: 0.9375rem; }
          .pp h1 { font-size: 1.625rem; }
          .pp h2 { font-size: 1.25rem; }
        }
      `}</style>

      <h1>Privacy Policy</h1>
      <p className="updated">Last updated: {LAST_UPDATED}</p>

      <p className="lead">
        B2B Guardrail is a Shopify app that monitors and protects the B2B and
        wholesale pricing of your store. This policy explains what data the app
        processes, why, and the rights you have over it. We keep our data
        footprint deliberately small: we operate on store-level configuration,
        not on your individual customers&rsquo; personal data.
      </p>

      <h2>1. Data Controller</h2>
      <p>The controller responsible for processing this data is:</p>
      <address>
        <strong>Bweb Studio</strong> (Romina Sanchez)
        <br />
        Madrid, Spain
        <br />
        Contact:{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </address>
      <p>
        If you are located in the European Economic Area, the relevant
        supervisory authority is the Spanish Data Protection Agency (Agencia
        Española de Protección de Datos, AEPD).
      </p>

      <h2>2. Information We Collect</h2>
      <p>
        When you install B2B Guardrail we collect and store the following
        store-level data:
      </p>

      <h3>Store account data</h3>
      <ul>
        <li>Your store&rsquo;s <strong>myshopify domain</strong> and Shopify shop ID.</li>
        <li>Your current <strong>plan tier</strong> (Free, Starter, or Pro).</li>
        <li>
          The <strong>OAuth access token</strong> Shopify issues to the app,
          stored encrypted at rest and used only to read the store resources
          you authorized.
        </li>
        <li>
          Optional <strong>alert settings</strong> you configure: a notification
          email address and/or a Slack webhook URL.
        </li>
        <li>
          Your <strong>monitoring preferences</strong> (check interval, whether
          monitoring is active) and install/update timestamps.
        </li>
      </ul>

      <h3>Audit and findings data</h3>
      <ul>
        <li>
          <strong>Audit records</strong>: timestamps, what triggered each audit
          (install, manual, scheduled, or webhook), its status, the computed
          health score, and the number of findings.
        </li>
        <li>
          <strong>Findings</strong>: details about your store&rsquo;s B2B and
          wholesale pricing configuration: affected product IDs, the type and
          severity of each issue (e.g. price leaks or rule conflicts), and our
          recommendations. These describe <em>your store&rsquo;s
          configuration</em>, not your customers.
        </li>
        <li>
          <strong>Alert records</strong>: delivery status of the notifications
          we send to your configured email or Slack.
        </li>
        <li>
          <strong>Compliance requests</strong>: an audit trail of the mandatory
          GDPR webhooks Shopify sends us (data request, customer redaction, and
          shop redaction), kept to demonstrate compliance.
        </li>
      </ul>

      <h2>3. Data We Do Not Collect</h2>
      <ul>
        <li>
          <strong>We do not store your customers&rsquo; personal data.</strong>{" "}
          The app requests the <code>read_customers</code> permission to analyze
          B2B and wholesale customer pricing while an audit runs, but that
          customer data is processed transiently in memory to produce findings
          and is <strong>never written to our database</strong>. We persist only
          product and price-rule references.
        </li>
        <li>
          <strong>We never see your payment details.</strong> Billing is handled
          entirely by Shopify through Shopify App Pricing; we do not collect or
          store any payment card data.
        </li>
        <li>
          We do not use advertising or tracking cookies, and we do not sell or
          rent any data.
        </li>
      </ul>

      <h2>4. How We Use Data</h2>
      <p>We process the data above solely to operate the app, specifically to:</p>
      <ul>
        <li>Run audits and detect B2B price leaks, rule conflicts, and pricing drift.</li>
        <li>Send you alerts about critical findings via email or Slack.</li>
        <li>Manage your subscription tier and the features available to it.</li>
        <li>Maintain the security and integrity of the service.</li>
      </ul>

      <h2>5. Legal Basis for Processing</h2>
      <p>
        Under the GDPR, we rely on the <strong>performance of a contract</strong>{" "}
        (providing the app you installed), our <strong>legitimate interest</strong>{" "}
        in operating and securing the service, and{" "}
        <strong>compliance with legal obligations</strong> (such as Shopify&rsquo;s
        mandatory data-protection webhooks).
      </p>

      <h2>6. Sub-processors and Data Sharing</h2>
      <p>
        We share data only with the infrastructure providers required to run the
        app. We do not sell, rent, or trade your data.
      </p>
      <ul>
        <li>
          <strong>Shopify Inc.</strong>: the platform that authenticates the
          app (OAuth), provides store data via its API, and processes billing.
        </li>
        <li>
          <strong>Supabase</strong>: managed PostgreSQL database hosting, in the
          European Union region.
        </li>
        <li>
          <strong>Vercel</strong>: application hosting and serverless execution.
        </li>
        <li>
          <strong>Slack</strong>: only if you configure a Slack webhook, used to
          deliver the alerts you opt into.
        </li>
      </ul>

      <h2>7. International Transfers</h2>
      <p>
        Your store data is stored within the European Union. Where a
        sub-processor processes data outside the EEA, that transfer is covered by
        appropriate safeguards such as the European Commission&rsquo;s Standard
        Contractual Clauses.
      </p>

      <h2>8. Data Retention and Deletion</h2>
      <p>
        We retain your store data for as long as the app is installed. When you
        uninstall B2B Guardrail, Shopify notifies us and we delete your
        store&rsquo;s data (audits, findings, and alerts are removed together
        with the store record). Approximately 48 hours after uninstall, Shopify
        also sends a <strong>shop redaction</strong> request, which we honor to
        guarantee complete deletion. You may request deletion of your data at any
        time by contacting us.
      </p>

      <h2>9. Your Rights</h2>
      <p>
        If you are in the European Economic Area, you have the right to access,
        rectify, erase, restrict, or port your data, and to object to its
        processing. To exercise any of these rights, email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. You also have the
        right to lodge a complaint with the AEPD or your local supervisory
        authority.
      </p>

      <h2>10. Security</h2>
      <p>
        We protect your data with industry-standard measures: OAuth access tokens
        are stored encrypted at rest, all traffic is served over HTTPS, and every
        webhook we receive from Shopify is verified with an HMAC signature before
        it is processed.
      </p>

      <h2>11. Children&rsquo;s Privacy</h2>
      <p>
        B2B Guardrail is a business tool for Shopify merchants and is not
        directed to children. We do not knowingly collect data from anyone under
        the age of 16.
      </p>

      <h2>12. Changes to This Policy</h2>
      <p>
        We may update this policy from time to time. When we do, we will revise
        the &ldquo;Last updated&rdquo; date above. Material changes will be
        communicated through the app or by email where appropriate.
      </p>

      <h2>13. Contact</h2>
      <p>
        For any question about this policy or your data, contact{" "}
        <strong>Bweb Studio</strong> at{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </main>
  );
}
