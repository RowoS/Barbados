import Footer from "@/shared/ui/footer";
import Hero from "@/shared/ui/hero";
import Features from "@/shared/ui/featuresSection";
import Header from "@/shared/ui/header";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header/>
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}
