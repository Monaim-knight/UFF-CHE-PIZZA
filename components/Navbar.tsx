import Link from "next/link";
import Image from "next/image";
import { CartIcon } from "./CartIcon";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "#about", label: "About" },
  { href: "#order", label: "Order" }
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-10 w-28 shrink-0 md:h-12 md:w-36">
            <Image
              src="/logo.png"
              alt="UFF CHE PIZZA Logo"
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 112px, 144px"
            />
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-200 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-brand-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <CartIcon />
          <Link href="/menu" className="hidden md:inline-flex btn-outline">
            View menu
          </Link>
          <Link href="/menu" className="btn-primary">
            Order Now
          </Link>
        </div>
      </div>
    </header>
  );
}

