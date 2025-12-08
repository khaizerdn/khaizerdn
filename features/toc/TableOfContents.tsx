'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useProjects } from '@/lib/projects-context'
import { useCertificates } from '@/lib/certificates-context'
import styles from './TableOfContents.module.css'

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'education', label: 'Education' }
]

const projectNames = ['Doxion', 'Tweetheart']
const certificateNames = [
  'Meta Front-End Developer Professional Certificate',
  'Google UX Design Professional Certificate',
  'AWS Certified Cloud Practitioner',
  'JavaScript Algorithms and Data Structures'
]

export default function TableOfContents() {
  const [activeSection, setActiveSection] = useState('home')
  const [activeProject, setActiveProject] = useState<string | null>(null)
  const [activeCertificate, setActiveCertificate] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const { openProjects, setOpenProjects } = useProjects()
  const { openCertificates, setOpenCertificates } = useCertificates()

  useEffect(() => {
    setMounted(true)
    const sectionObserver = new IntersectionObserver(
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

    const projectObserver = new IntersectionObserver(
      (entries) => {
        // Find the most visible project (regardless of whether it's open)
        type MostVisible = { element: HTMLElement; ratio: number }
        let mostVisible: MostVisible | null = null
        
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0) {
            const projectId = (entry.target as HTMLElement).id.replace('project-', '')
            const projectName = projectNames.find(name => name.toLowerCase() === projectId)
            // Track all projects, not just open ones
            if (projectName) {
              if (!mostVisible || entry.intersectionRatio > mostVisible.ratio) {
                mostVisible = {
                  element: entry.target as HTMLElement,
                  ratio: entry.intersectionRatio
                }
              }
            }
          }
        }

        if (mostVisible) {
          const projectId = mostVisible.element.id.replace('project-', '')
          setActiveProject(projectId)
        } else {
          // Clear active project if no project is visible
          setActiveProject(null)
        }
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
      }
    )

    const certificateObserver = new IntersectionObserver(
      (entries) => {
        // Find the most visible certificate (regardless of whether it's open)
        type MostVisible = { element: HTMLElement; ratio: number }
        let mostVisible: MostVisible | null = null
        
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0) {
            const certId = (entry.target as HTMLElement).id.replace('certificate-', '')
            const certName = certificateNames.find(name => 
              name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') === certId
            )
            // Track all certificates, not just open ones
            if (certName) {
              if (!mostVisible || entry.intersectionRatio > mostVisible.ratio) {
                mostVisible = {
                  element: entry.target as HTMLElement,
                  ratio: entry.intersectionRatio
                }
              }
            }
          }
        }

        if (mostVisible) {
          const certId = mostVisible.element.id.replace('certificate-', '')
          setActiveCertificate(certId)
        } else {
          // Clear active certificate if no certificate is visible
          setActiveCertificate(null)
        }
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
      }
    )

    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) sectionObserver.observe(element)
    })

    // Always observe all projects
    const observeProjects = () => {
      projectNames.forEach((name) => {
        const element = document.getElementById(`project-${name.toLowerCase()}`)
        if (element) projectObserver.observe(element)
      })
    }

    // Always observe all certificates
    const observeCertificates = () => {
      certificateNames.forEach((name) => {
        const certId = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
        const element = document.getElementById(`certificate-${certId}`)
        if (element) certificateObserver.observe(element)
      })
    }

    // Initial observation
    observeProjects()
    observeCertificates()

    // Re-observe when openProjects or openCertificates changes
    const timeoutId = setTimeout(() => {
      observeProjects()
      observeCertificates()
    }, 100)


    return () => {
      sectionObserver.disconnect()
      projectObserver.disconnect()
      certificateObserver.disconnect()
      clearTimeout(timeoutId)
    }
  }, [openProjects, openCertificates, activeProject, activeCertificate])

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
            {sections.filter(s => s.id !== 'home').map((section) => {
              const isProjects = section.id === 'projects'
              const isCertificates = section.id === 'certificates'
              // Always show all items
              const openProjectsList = isProjects ? projectNames : []
              const openCertificatesList = isCertificates ? certificateNames : []
              
              return (
                <li key={section.id}>
                  <motion.a
                    href={`#${section.id}`}
                    className={`${styles.tocItem} ${activeSection === section.id ? styles.active : ''}`}
                    whileHover={{ x: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {section.label}
                  </motion.a>
                  {isProjects && (
                    <ul className={styles.tocSubList}>
                      {openProjectsList.map((projectName, index) => {
                        const projectId = projectName.toLowerCase()
                        const isOpen = openProjects.has(projectName)
                        const isActive = activeProject === projectId
                        return (
                          <li key={projectName} className={styles.tocSubItem}>
                            <motion.a
                              href={`#project-${projectId}`}
                              className={`${styles.tocSubLink} ${isActive ? styles.activeSub : ''}`}
                              whileHover={{ x: -3 }}
                              transition={{ duration: 0.2 }}
                              onClick={(e) => {
                                if (!isOpen) {
                                  e.preventDefault()
                                  const element = document.getElementById(`project-${projectId}`)
                                  if (element) {
                                    // Scroll to the item first
                                    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                    
                                    // Wait for scroll to reach the item, then open it
                                    let scrollCheckInterval: NodeJS.Timeout | null = null
                                    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop
                                    let scrollStoppedCount = 0
                                    
                                    const checkScroll = () => {
                                      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop
                                      const rect = element.getBoundingClientRect()
                                      const isInView = rect.top >= 0 && rect.top <= window.innerHeight * 0.5
                                      
                                      // Check if scroll has stopped
                                      if (Math.abs(currentScrollTop - lastScrollTop) < 1) {
                                        scrollStoppedCount++
                                      } else {
                                        scrollStoppedCount = 0
                                      }
                                      lastScrollTop = currentScrollTop
                                      
                                      // Open when item is in view and scroll has stopped
                                      if (isInView && scrollStoppedCount >= 2) {
                                        setOpenProjects(prev => {
                                          const newSet = new Set(prev)
                                          newSet.add(projectName)
                                          return newSet
                                        })
                                        if (scrollCheckInterval) {
                                          clearInterval(scrollCheckInterval)
                                        }
                                      }
                                    }
                                    
                                    // Start checking scroll position
                                    scrollCheckInterval = setInterval(checkScroll, 50)
                                    
                                    // Cleanup after 3 seconds max
                                    setTimeout(() => {
                                      if (scrollCheckInterval) {
                                        clearInterval(scrollCheckInterval)
                                      }
                                    }, 3000)
                                  }
                                }
                              }}
                            >
                              <span className={styles.tocTree}>
                                {index === openProjectsList.length - 1 ? '└──' : '├──'}
                              </span>
                              <span>{projectName}</span>
                            </motion.a>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                  {isCertificates && (
                    <ul className={styles.tocSubList}>
                      {openCertificatesList.map((certName, index) => {
                        const certId = certName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
                        const isOpen = openCertificates.has(certName)
                        const isActive = activeCertificate === certId
                        return (
                          <li key={certName} className={styles.tocSubItem}>
                            <motion.a
                              href={`#certificate-${certId}`}
                              className={`${styles.tocSubLink} ${isActive ? styles.activeSub : ''}`}
                              whileHover={{ x: -3 }}
                              transition={{ duration: 0.2 }}
                              onClick={(e) => {
                                if (!isOpen) {
                                  e.preventDefault()
                                  const element = document.getElementById(`certificate-${certId}`)
                                  if (element) {
                                    // Scroll to the item first
                                    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                    
                                    // Wait for scroll to reach the item, then open it
                                    let scrollCheckInterval: NodeJS.Timeout | null = null
                                    let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop
                                    let scrollStoppedCount = 0
                                    
                                    const checkScroll = () => {
                                      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop
                                      const rect = element.getBoundingClientRect()
                                      const isInView = rect.top >= 0 && rect.top <= window.innerHeight * 0.5
                                      
                                      // Check if scroll has stopped
                                      if (Math.abs(currentScrollTop - lastScrollTop) < 1) {
                                        scrollStoppedCount++
                                      } else {
                                        scrollStoppedCount = 0
                                      }
                                      lastScrollTop = currentScrollTop
                                      
                                      // Open when item is in view and scroll has stopped
                                      if (isInView && scrollStoppedCount >= 2) {
                                        setOpenCertificates(prev => {
                                          const newSet = new Set(prev)
                                          newSet.add(certName)
                                          return newSet
                                        })
                                        if (scrollCheckInterval) {
                                          clearInterval(scrollCheckInterval)
                                        }
                                      }
                                    }
                                    
                                    // Start checking scroll position
                                    scrollCheckInterval = setInterval(checkScroll, 50)
                                    
                                    // Cleanup after 3 seconds max
                                    setTimeout(() => {
                                      if (scrollCheckInterval) {
                                        clearInterval(scrollCheckInterval)
                                      }
                                    }, 3000)
                                  }
                                }
                              }}
                            >
                              <span className={styles.tocTree}>
                                {index === openCertificatesList.length - 1 ? '└──' : '├──'}
                              </span>
                              <span>{certName}</span>
                            </motion.a>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </li>
              )
            })}
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>,
    document.body
  )
}

