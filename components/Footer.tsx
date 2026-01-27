export function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/80">
      <div className="container flex flex-col gap-6 py-8 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
        <p>&copy; {new Date().getFullYear()} UFF CHE PIZZA. All rights reserved.</p>
        <div className="flex flex-wrap items-center gap-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Crafted with Next.js, Tailwind &amp; Prisma
          </p>
        </div>
      </div>
    </footer>
  );
}

