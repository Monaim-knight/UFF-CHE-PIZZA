"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ReservationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  startTime: string;
  partySize: string;
  specialNotes: string;
}

export function ReservationForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ReservationFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    startTime: "",
    partySize: "2",
    specialNotes: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          partySize: parseInt(formData.partySize)
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create reservation");
      }

      const reservation = await response.json();
      router.push(`/reservations/${reservation.id}/confirmation`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Set minimum date/time to now
  const now = new Date();
  const minDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 16);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="firstName"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            value={formData.firstName}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-slate-50 placeholder:text-slate-500 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/20"
            placeholder="John"
          />
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            value={formData.lastName}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-slate-50 placeholder:text-slate-500 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/20"
            placeholder="Doe"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-slate-300"
        >
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-slate-50 placeholder:text-slate-500 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/20"
          placeholder="john@example.com"
        />
      </div>

      <div>
        <label
          htmlFor="phone"
          className="mb-2 block text-sm font-medium text-slate-300"
        >
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-slate-50 placeholder:text-slate-500 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/20"
          placeholder="(555) 123-4567"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="startTime"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Date & Time *
          </label>
          <input
            type="datetime-local"
            id="startTime"
            name="startTime"
            required
            min={minDateTime}
            value={formData.startTime}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-slate-50 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/20"
          />
        </div>

        <div>
          <label
            htmlFor="partySize"
            className="mb-2 block text-sm font-medium text-slate-300"
          >
            Party Size *
          </label>
          <select
            id="partySize"
            name="partySize"
            required
            value={formData.partySize}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-slate-50 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/20"
          >
            {Array.from({ length: 19 }, (_, i) => i + 1).map((size) => (
              <option key={size} value={size}>
                {size} {size === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="specialNotes"
          className="mb-2 block text-sm font-medium text-slate-300"
        >
          Special Requests or Dietary Restrictions
        </label>
        <textarea
          id="specialNotes"
          name="specialNotes"
          rows={4}
          value={formData.specialNotes}
          onChange={handleChange}
          className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-slate-50 placeholder:text-slate-500 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/20"
          placeholder="Any allergies, dietary restrictions, or special occasions we should know about?"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Submitting..." : "Request Reservation"}
      </button>

      <p className="text-xs text-slate-400">
        * Required fields. We&apos;ll send a confirmation email once your
        reservation is confirmed.
      </p>
    </form>
  );
}
