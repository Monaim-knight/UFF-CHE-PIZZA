"use client";

import Image from "next/image";
import { AddToCartButton } from "./AddToCartButton";
import type { CartItem } from "@/lib/cart";

interface MenuItemCardProps {
  item: {
    id: number;
    name: string;
    description: string;
    priceCents: number;
    imageUrl: string | null;
    tags: string[];
  };
}

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const cartItem: Omit<CartItem, "quantity"> = {
    id: item.id,
    name: item.name,
    priceCents: item.priceCents,
    imageUrl: item.imageUrl
  };

  return (
    <div className="card group">
      <div className="card-inner flex flex-col gap-4">
        {item.imageUrl && (
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-slate-800/70 bg-slate-900/40">
            <Image
              src={item.imageUrl}
              alt={item.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}

        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold text-slate-50">
              {item.name}
            </h3>
            <span className="shrink-0 text-base font-medium text-brand-300">
              {formatPrice(item.priceCents)}
            </span>
          </div>

          <p className="text-sm leading-relaxed text-slate-300">
            {item.description}
          </p>

          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="badge text-[10px] uppercase tracking-[0.15em]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-auto pt-2">
            <AddToCartButton item={cartItem} className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
