'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './TableOfContents.module.css'

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'certificates', label: 'Certificates' }
]

export default function TableOfContents() {
  const [activeSection, setActiveSection] = useState('home')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-10% 0px -90% 0px', // Trigger when section hits top 10% of screen (very late)
        threshold: 0
      }
    )

    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {mounted && activeSection !== 'home' && (
        <motion.nav
          className={styles.tocContainer}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
        >
          <ul className={styles.tocList}>
            {sections.filter(s => s.id !== 'home').map((section) => (
              <li key={section.id}>
                <motion.a
                  href={`#${section.id}`}
                  className={`${styles.tocItem} ${activeSection === section.id ? styles.active : ''}`}
                  whileHover={{ x: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  {section.label}
                </motion.a>
              </li>
            ))}
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>,
    document.body
  )
}

