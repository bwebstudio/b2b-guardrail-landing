import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "B2B Guardrail — Stop pricing leaks before they cost you",
  description:
    "B2B Guardrail watches your Shopify store and alerts you the moment a B2B price, catalog, or discount becomes visible to retail shoppers.",
  icons: {
    icon: "/b2b-guardrail-icon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
