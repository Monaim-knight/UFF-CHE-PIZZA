"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { useRouter } from "next/navigation";

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalCents, clearCart } =
    useCart();
  const router = useRouter();

  const handleCheckout = async () => {
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            menuItemId: item.id,
            quantity: item.quantity,
            unitPriceCents: item.priceCents,
            nameSnapshot: item.name
          }))
        })
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const order = await response.json();
      clearCart();
      router.push(`/orders/${order.id}/confirmation`);
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to process order. Please try again.");
    }
  };

  if (items.length === 0) {
    return (
      <div className="container py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="mb-4">Your cart is empty</h1>
          <p className="mb-8 text-slate-300">
            Add some delicious items from our menu to get started.
          </p>
          <Link href="/menu" className="btn-primary">
            Browse menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12 md:py-16">
      <h1 className="mb-8">Shopping Cart</h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="card">
              <div className="card-inner flex flex-col gap-4 sm:flex-row">
                {item.imageUrl && (
                  <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-xl border border-slate-800/70 bg-slate-900/40 sm:h-24 sm:w-24">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="flex flex-1 flex-col gap-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-50">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-brand-300">
                        {formatPrice(item.priceCents)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="shrink-0 text-slate-400 transition-colors hover:text-red-400"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="text-sm text-slate-300">Quantity:</label>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="flex h-8 w-8 items-center justify-center rounded border border-slate-700 bg-slate-900/60 text-slate-300 transition-colors hover:border-brand-400 hover:text-brand-300"
                        aria-label="Decrease quantity"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <path d="M5 12h14" />
                        </svg>
                      </button>
                      <span className="min-w-[2rem] text-center text-sm font-medium text-slate-50">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="flex h-8 w-8 items-center justify-center rounded border border-slate-700 bg-slate-900/60 text-slate-300 transition-colors hover:border-brand-400 hover:text-brand-300"
                        aria-label="Increase quantity"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <path d="M5 12h14M12 5v14" />
                        </svg>
                      </button>
                    </div>
                    <div className="ml-auto text-sm font-medium text-slate-200">
                      {formatPrice(item.priceCents * item.quantity)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:sticky lg:top-20 lg:h-fit">
          <div className="card">
            <div className="card-inner space-y-6">
              <h2 className="text-xl font-semibold text-slate-50">
                Order Summary
              </h2>

              <div className="space-y-3 border-t border-slate-800 pt-4">
                <div className="flex justify-between text-sm text-slate-300">
                  <span>Subtotal</span>
                  <span>{formatPrice(totalCents)}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-300">
                  <span>Tax (estimated)</span>
                  <span>{formatPrice(Math.round(totalCents * 0.08))}</span>
                </div>
                <div className="border-t border-slate-800 pt-3">
                  <div className="flex justify-between text-lg font-semibold text-slate-50">
                    <span>Total</span>
                    <span>
                      {formatPrice(totalCents + Math.round(totalCents * 0.08))}
                    </span>
                  </div>
                </div>
              </div>

              <button onClick={handleCheckout} className="btn-primary w-full">
                Proceed to checkout
              </button>

              <Link
                href="/menu"
                className="block text-center text-sm text-slate-300 underline-offset-4 hover:text-brand-300 hover:underline"
              >
                Continue shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
