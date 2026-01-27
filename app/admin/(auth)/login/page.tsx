"use client";

import { loginAction } from "@/app/actions/auth";
import { useToast } from "@/components/admin/Toast";
import { useState } from "react";

export default function LoginPage() {
  const { showToast, ToastComponent } = useToast();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setError(null);
    try {
      const result = await loginAction(null, formData);
      if (result?.error) {
        setError(result.error);
        showToast(result.error, "error");
      }
    } catch (err: any) {
      // redirect() throws, so if we get here without an error result, it's a redirect
      // The redirect will happen automatically
      if (err?.digest?.startsWith("NEXT_REDIRECT")) {
        return; // Redirect is happening
      }
      setError("An error occurred. Please try again.");
      showToast("An error occurred. Please try again.", "error");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      {ToastComponent}
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-display font-semibold text-slate-50">
            Admin Login
          </h1>
          <p className="text-slate-400">
            Sign in to access the admin dashboard
          </p>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-8">
          <form action={handleSubmit} className="space-y-6">
            {error && (
              <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-400">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-slate-50 placeholder:text-slate-500 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/20"
                placeholder="admin@uffchepizza.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-4 py-2.5 text-slate-50 placeholder:text-slate-500 focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/20"
                placeholder="••••••••"
              />
            </div>

            <button type="submit" className="btn-primary w-full">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
