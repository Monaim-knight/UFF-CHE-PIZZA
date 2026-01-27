import type { ReactNode } from "react";

export function LayoutShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900">
      <div className="pointer-events-none fixed inset-x-0 top-0 z-0 mx-auto h-64 max-w-3xl bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.35),_transparent_60%)]" />
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-0 mx-auto h-64 max-w-5xl bg-[radial-gradient(circle_at_bottom,_rgba(248,250,252,0.06),_transparent_60%)]" />
      <div className="relative z-10 flex min-h-screen flex-col">
        {children}
      </div>
    </div>
  );
}

