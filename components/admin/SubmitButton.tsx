"use client";

import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  children: React.ReactNode;
  className?: string;
}

export function SubmitButton({ children, className }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`btn-primary ${className || ""} ${
        pending ? "opacity-60 cursor-not-allowed" : ""
      }`}
    >
      {pending ? "Saving..." : children}
    </button>
  );
}
