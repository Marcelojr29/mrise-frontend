import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { TechStack } from "@/components/tech-stack"
import { Projects } from "@/components/projects"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Services />
      <TechStack />
      <Projects />
      <CTA />
      <Footer />
    </div>
  )
}
