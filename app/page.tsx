import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import OtherProjects from '@/components/OtherProjects'
import Certificates from '@/components/Certificates'
import Contact from '@/components/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <Certificates />
      <OtherProjects />
      <About />
      <Contact />
    </>
  )
}

