import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { GamesSection } from "@/components/games-section"
import { TechSection } from "@/components/tech-section"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <GamesSection />
      <TechSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
