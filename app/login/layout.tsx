import Navbar from "@/components/Navbar";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-24 flex items-center justify-center">
        {children}
      </main>
    </div>
  );
}
