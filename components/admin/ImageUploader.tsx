"use client";

import { useRef, useState } from "react";

type Props = {
  onUpload: (url: string) => void;
  label?: string;
};

export function ImageUploader({ onUpload, label = "Upload image" }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.set("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const text = await res.text();
      let data: { url?: string; error?: string };
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        setError(res.ok ? "Invalid response" : "Upload failed");
        return;
      }

      if (!res.ok) {
        setError(data.error || `Upload failed (${res.status})`);
        return;
      }
      if (data.url) {
        onUpload(data.url);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
      } else {
        setError("No URL returned");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed. Check your connection.");
    } finally {
      setLoading(false);
      e.target.value = "";
    }
  }

  return (
    <div>
      {label && (
        <p className="mb-2 text-sm font-medium text-slate-300">{label}</p>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleChange}
        disabled={loading}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={loading}
        className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-100 transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Uploading…" : "Choose image (max 10MB)"}
      </button>
      {success && (
        <p className="mt-2 text-sm text-green-400">Image uploaded.</p>
      )}
      {error && (
        <p className="mt-2 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}
