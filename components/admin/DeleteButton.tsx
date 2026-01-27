"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";

interface DeleteButtonProps {
  itemName: string;
  className?: string;
}

function DeleteConfirmButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-red-500/20 px-3 py-1.5 text-sm font-medium text-red-400 hover:bg-red-500/30 disabled:opacity-60"
    >
      {pending ? "Deleting..." : "Confirm"}
    </button>
  );
}

export function DeleteButton({ itemName, className }: DeleteButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  if (showConfirm) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm text-slate-400">
          Delete &quot;{itemName}&quot;?
        </span>
        <DeleteConfirmButton />
        <button
          type="button"
          onClick={() => setShowConfirm(false)}
          className="rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-1.5 text-sm font-medium text-slate-300 hover:bg-slate-800"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setShowConfirm(true)}
      className={`rounded-lg border border-red-500/50 bg-red-500/10 px-3 py-1.5 text-sm font-medium text-red-400 hover:bg-red-500/20 ${className || ""}`}
    >
      Delete
    </button>
  );
}
