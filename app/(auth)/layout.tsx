export default function authLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary px-4 py-8 md:py-4">
      {children}
    </div>
  );
}
