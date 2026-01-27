import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LayoutShell } from "@/components/LayoutShell";
import { CartProvider } from "@/components/CartProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});

export const metadata: Metadata = {
  title: "UFF CHE PIZZA | Authentic Italian Pizza Restaurant",
  description:
    "UFF CHE PIZZA is an authentic Italian pizzeria offering traditional wood-fired pizzas, fresh ingredients, and a warm, welcoming atmosphere.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "UFF CHE PIZZA",
    description:
      "Authentic Italian pizzeria with traditional wood-fired pizzas, fresh ingredients, and warm hospitality.",
    url: "https://example.com",
    siteName: "UFF CHE PIZZA",
    type: "website"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <CartProvider>
          <LayoutShell>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </LayoutShell>
        </CartProvider>
      </body>
    </html>
  );
}

