import Link from "next/link";

export default function ReservationsPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="mb-4">Place Your Order</h1>
        <p className="mb-8 text-slate-300">
          Ready to order? Browse our menu and add items to your cart. We&apos;ll
          prepare your order fresh for pickup or delivery.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/menu" className="btn-primary">
            View Menu & Order
          </Link>
          <a href="tel:+15551234567" className="btn-outline">
            Call to Order
          </a>
        </div>

        <div className="mt-12 rounded-xl border border-slate-800 bg-slate-900/60 p-6 text-left">
          <h3 className="mb-4 text-lg font-semibold text-slate-50">
            Ordering Information
          </h3>
          <ul className="space-y-3 text-sm text-slate-300">
            <li>
              <strong className="text-slate-50">Pickup:</strong> Orders ready in
              15-20 minutes. Call when you arrive.
            </li>
            <li>
              <strong className="text-slate-50">Delivery:</strong> Available within
              3 miles. Delivery fee applies.
            </li>
            <li>
              <strong className="text-slate-50">Large Orders:</strong> For 10+
              pizzas, please call at least 1 hour ahead.
            </li>
            <li>
              <strong className="text-slate-50">Payment:</strong> We accept cash,
              credit cards, and online payments.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
