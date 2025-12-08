'use client'

import { motion } from 'framer-motion'
import Hero from '@/features/hero/hero'
import Projects from '@/features/projects/projects'
import Certificates from '@/features/certificates/Certificates'
import Education from '@/features/education/Education'
import TableOfContents from '@/features/toc/TableOfContents'

export default function Home() {
  return (
    <>
      <TableOfContents />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Hero />
        <Projects />
        <Certificates />
        <Education />
      </motion.div>
    </>
  )
}

