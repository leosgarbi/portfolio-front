import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { Contact } from "@/components/contact"
import { Background3D } from "@/components/background-3d"
import { Navigation } from "@/components/navigation"

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Background3D />
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </main>
  )
}
