import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center gap-6 py-16 text-center">
      <h1 className="text-6xl font-display font-semibold text-slate-50 md:text-7xl">
        404
      </h1>
      <p className="max-w-md text-lg text-slate-300">
        This page could not be found. The link may be broken or the page may have been removed.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link href="/" className="btn-primary">
          Back to Home
        </Link>
        <Link href="/menu" className="btn-outline">
          View Menu
        </Link>
      </div>
    </div>
  );
}
