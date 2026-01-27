// This layout is for auth pages (login) and doesn't include admin UI
export default function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
