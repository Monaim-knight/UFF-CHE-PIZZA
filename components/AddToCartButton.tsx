"use client";

import { useCart } from "./CartProvider";
import type { CartItem } from "@/lib/cart";

interface AddToCartButtonProps {
  item: Omit<CartItem, "quantity">;
  className?: string;
}

export function AddToCartButton({ item, className }: AddToCartButtonProps) {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem(item);
  };

  return (
    <button
      onClick={handleAdd}
      className={`btn-primary ${className || ""}`}
      aria-label={`Add ${item.name} to cart`}
    >
      Add to cart
    </button>
  );
}
