import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function ReservationConfirmationPage({
  params
}: {
  params: { id: string };
}) {
  const reservationId = parseInt(params.id);

  if (isNaN(reservationId)) {
    return (
      <div className="container py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="mb-4">Invalid reservation</h1>
          <Link href="/" className="btn-primary">
            Return home
          </Link>
        </div>
      </div>
    );
  }

  const reservation = await prisma.reservation.findUnique({
    where: { id: reservationId },
    include: {
      customer: true
    }
  });

  if (!reservation) {
    return (
      <div className="container py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="mb-4">Reservation not found</h1>
          <Link href="/" className="btn-primary">
            Return home
          </Link>
        </div>
      </div>
    );
  }

  const reservationDate = new Date(reservation.startTime);
  const formattedDate = reservationDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  const formattedTime = reservationDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit"
  });

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
          <h1 className="mb-2">Reservation Request Received!</h1>
          <p className="text-slate-300">
            We&apos;ve received your reservation request and will confirm it
            shortly via email.
          </p>
        </div>

        <div className="card mb-6">
          <div className="card-inner space-y-6">
            <div>
              <h2 className="mb-4 text-xl font-semibold text-slate-50">
                Reservation Details
              </h2>
              <div className="space-y-3 text-sm text-slate-300">
                <div>
                  <span className="text-slate-400">Guest:</span>{" "}
                  <span className="font-medium text-slate-50">
                    {reservation.customer.firstName}{" "}
                    {reservation.customer.lastName}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400">Email:</span>{" "}
                  <span className="font-medium text-slate-50">
                    {reservation.customer.email}
                  </span>
                </div>
                {reservation.customer.phone && (
                  <div>
                    <span className="text-slate-400">Phone:</span>{" "}
                    <span className="font-medium text-slate-50">
                      {reservation.customer.phone}
                    </span>
                  </div>
                )}
                <div>
                  <span className="text-slate-400">Date:</span>{" "}
                  <span className="font-medium text-slate-50">
                    {formattedDate}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400">Time:</span>{" "}
                  <span className="font-medium text-slate-50">
                    {formattedTime}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400">Party Size:</span>{" "}
                  <span className="font-medium text-slate-50">
                    {reservation.partySize}{" "}
                    {reservation.partySize === 1 ? "guest" : "guests"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400">Status:</span>{" "}
                  <span className="font-medium capitalize text-slate-50">
                    {reservation.status.toLowerCase()}
                  </span>
                </div>
                {reservation.specialNotes && (
                  <div>
                    <span className="text-slate-400">Special Notes:</span>{" "}
                    <span className="font-medium text-slate-50">
                      {reservation.specialNotes}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <h3 className="mb-2 text-lg font-semibold text-slate-50">
            What&apos;s Next?
          </h3>
          <p className="text-sm text-slate-300">
            We&apos;ll review your reservation request and send a confirmation
            email to {reservation.customer.email} within 24 hours. If you have
            any questions or need to make changes, please call us at (555)
            123‑4567.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-4">
          <Link href="/menu" className="btn-outline flex-1">
            View menu
          </Link>
          <Link href="/" className="btn-primary flex-1">
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}
