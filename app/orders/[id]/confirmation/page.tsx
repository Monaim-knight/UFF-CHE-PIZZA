import Link from "next/link";
import { prisma } from "@/lib/prisma";

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export default async function OrderConfirmationPage({
  params
}: {
  params: { id: string };
}) {
  const orderId = parseInt(params.id);

  if (isNaN(orderId)) {
    return (
      <div className="container py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="mb-4">Invalid order</h1>
          <Link href="/" className="btn-primary">
            Return home
          </Link>
        </div>
      </div>
    );
  }

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: true
    }
  });

  if (!order) {
    return (
      <div className="container py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="mb-4">Order not found</h1>
          <Link href="/" className="btn-primary">
            Return home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-16">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-500/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8 text-brand-400"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h1 className="mb-2">Order confirmed!</h1>
          <p className="text-slate-300">
            Thank you for your order. We&apos;ll prepare it right away.
          </p>
        </div>

        <div className="card mb-6">
          <div className="card-inner space-y-6">
            <div>
              <h2 className="mb-4 text-xl font-semibold text-slate-50">
                Order #{order.id}
              </h2>
              <div className="space-y-2 text-sm text-slate-300">
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="font-medium capitalize text-slate-50">
                    {order.status.toLowerCase().replace("_", " ")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Placed:</span>
                  <span className="font-medium text-slate-50">
                    {new Date(order.placedAt).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-4">
              <h3 className="mb-3 text-lg font-semibold text-slate-50">
                Items
              </h3>
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm text-slate-300"
                  >
                    <span>
                      {item.nameSnapshot} × {item.quantity}
                    </span>
                    <span className="font-medium text-slate-50">
                      {formatPrice(item.unitPriceCents * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-800 pt-4">
              <div className="flex justify-between text-lg font-semibold text-slate-50">
                <span>Total</span>
                <span>{formatPrice(order.totalCents)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link href="/menu" className="btn-outline flex-1">
            Continue shopping
          </Link>
          <Link href="/" className="btn-primary flex-1">
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}
