'use client'

import { useTheme } from '@/lib/theme-context'
import Hero from '@/features/hero'
import Contact from '@/features/contact'
import Footer from '@/features/footer'
import ProgrammingMain from '@/features/programming/main'
import CreativeMain from '@/features/creative/main'
import LeadershipMain from '@/features/leadership/main'
import OtherMain from '@/features/other/main'

export default function Home() {
  const { theme } = useTheme()

  const renderThemeContent = () => {
    switch (theme) {
      case 'Programming':
        return <ProgrammingMain />
      case 'Creative':
        return <CreativeMain />
      case 'Leadership':
        return <LeadershipMain />
      case 'Other':
        return <OtherMain />
    }
  }

  return (
    <>
      <Hero />
      {renderThemeContent()}
      <Contact />
      <Footer />
    </>
  )
}

