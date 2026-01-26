import Navbar from "@/components/Navbar";
import StarsBackground from "@/components/background/StarsBackground";
import HeroVisualStack from "@/components/HeroVisualStack";
import HowItWorksScroll from "@/components/HowItWorksScroll";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <StarsBackground />
      {/* hero content */}
    </main>
  );
}
