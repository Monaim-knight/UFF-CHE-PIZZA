"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface ItemsSearchProps {
  search: string;
}

export function ItemsSearch({ search: initialSearch }: ItemsSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(initialSearch);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (search) {
      params.set("search", search);
      params.delete("page"); // Reset to page 1
    } else {
      params.delete("search");
    }
    router.push(`/admin/items?${params.toString()}`);
  };

  const handleClear = () => {
    setSearch("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    params.delete("page");
    router.push(`/admin/items?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search items by name or description..."
        className="flex-1 rounded-lg border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-slate-50 placeholder:text-slate-500 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/20"
      />
      <button type="submit" className="btn-primary">
        Search
      </button>
      {search && (
        <button
          type="button"
          onClick={handleClear}
          className="btn-outline"
        >
          Clear
        </button>
      )}
    </form>
  );
}
