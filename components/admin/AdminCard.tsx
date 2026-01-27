import type { ReactNode } from "react";

interface AdminCardProps {
  title: string;
  value: string | number;
  icon?: string;
  children?: ReactNode;
}

export function AdminCard({ title, value, icon, children }: AdminCardProps) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-400">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-slate-50">{value}</p>
        </div>
        {icon && (
          <div className="text-3xl opacity-50">{icon}</div>
        )}
      </div>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
