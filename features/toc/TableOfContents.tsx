'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useProjects } from '@/lib/projects-context'
import { useCertificates } from '@/lib/certificates-context'
import { useEducation } from '@/lib/education-context'
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
const educationNames = ['Cavite State University - Carmona Campus']

export default function TableOfContents() {
  const [activeSection, setActiveSection] = useState('home')
  const [activeProject, setActiveProject] = useState<string | null>(null)
  const [activeCertificate, setActiveCertificate] = useState<string | null>(null)
  const [activeEducation, setActiveEducation] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const { openProjects, setOpenProjects } = useProjects()
  const { openCertificates, setOpenCertificates } = useCertificates()
  const { openEducation, setOpenEducation } = useEducation()

  useEffect(() => {
    setMounted(true)
    const visibleSections = new Map<string, number>()
    
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        // Update visibility map for all entries
        entries.forEach((entry) => {
          const sectionId = entry.target.id
          if (entry.isIntersecting && entry.intersectionRatio > 0) {
            visibleSections.set(sectionId, entry.intersectionRatio)
          } else {
            visibleSections.delete(sectionId)
          }
        })
        
        // Find the most visible section
        let mostVisible: { id: string; ratio: number } | null = null
        visibleSections.forEach((ratio, id) => {
          if (!mostVisible || ratio > mostVisible.ratio) {
            mostVisible = { id, ratio }
          }
        })
        
        // Update active section - clear if no sections are visible
        if (mostVisible) {
          setActiveSection(mostVisible.id)
        } else {
          // Clear active section when no sections are visible
          setActiveSection('')
        }
      },
      {
        rootMargin: '-10% 0px -90% 0px', // Trigger when section hits top 10% of screen (very late)
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
      }
    )

    const projectObserver = new IntersectionObserver(
      (entries) => {
        // Find the most visible project that is open
        type MostVisible = { element: HTMLElement; ratio: number }
        let mostVisible: MostVisible | null = null
        
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0) {
            const projectId = (entry.target as HTMLElement).id.replace('project-', '')
            const projectName = projectNames.find(name => name.toLowerCase() === projectId)
            // Only consider projects that are open
            if (projectName && openProjects.has(projectName)) {
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
          // Clear active project if no open project is visible
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
        // Find the most visible certificate that is open
        type MostVisible = { element: HTMLElement; ratio: number }
        let mostVisible: MostVisible | null = null
        
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0) {
            const certId = (entry.target as HTMLElement).id.replace('certificate-', '')
            const certName = certificateNames.find(name => 
              name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') === certId
            )
            // Only consider certificates that are open
            if (certName && openCertificates.has(certName)) {
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
          // Clear active certificate if no open certificate is visible
          setActiveCertificate(null)
        }
      },
      {
        rootMargin: '-20% 0px -70% 0px',
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
      }
    )

    const educationObserver = new IntersectionObserver(
      (entries) => {
        // Find the most visible education item that is open
        type MostVisible = { element: HTMLElement; ratio: number }
        let mostVisible: MostVisible | null = null
        
        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > 0) {
            const eduId = (entry.target as HTMLElement).id.replace('education-', '')
            const eduName = educationNames.find(name => 
              name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') === eduId
            )
            // Only consider education items that are open
            if (eduName && openEducation.has(eduName)) {
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
          const eduId = mostVisible.element.id.replace('education-', '')
          setActiveEducation(eduId)
        } else {
          // Clear active education if no open education item is visible
          setActiveEducation(null)
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

    // Always observe all education items
    const observeEducation = () => {
      educationNames.forEach((name) => {
        const eduId = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
        const element = document.getElementById(`education-${eduId}`)
        if (element) educationObserver.observe(element)
      })
    }

    // Initial observation
    observeProjects()
    observeCertificates()
    observeEducation()

    // Re-observe when openProjects, openCertificates, or openEducation changes
    const timeoutId = setTimeout(() => {
      observeProjects()
      observeCertificates()
      observeEducation()
    }, 100)


    return () => {
      sectionObserver.disconnect()
      projectObserver.disconnect()
      certificateObserver.disconnect()
      educationObserver.disconnect()
      clearTimeout(timeoutId)
    }
  }, [openProjects, openCertificates, openEducation, activeProject, activeCertificate, activeEducation])

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
              const isEducation = section.id === 'education'
              // Always show all items
              const openProjectsList = isProjects ? projectNames : []
              const openCertificatesList = isCertificates ? certificateNames : []
              const openEducationList = isEducation ? educationNames : []
              
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
                        const isActive = isOpen && activeProject === projectId
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
                        const isActive = isOpen && activeCertificate === certId
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
                  {isEducation && (
                    <ul className={styles.tocSubList}>
                      {openEducationList.map((eduName, index) => {
                        const eduId = eduName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
                        const isOpen = openEducation.has(eduName)
                        const isActive = isOpen && activeEducation === eduId
                        return (
                          <li key={eduName} className={styles.tocSubItem}>
                            <motion.a
                              href={`#education-${eduId}`}
                              className={`${styles.tocSubLink} ${isActive ? styles.activeSub : ''}`}
                              whileHover={{ x: -3 }}
                              transition={{ duration: 0.2 }}
                              onClick={(e) => {
                                if (!isOpen) {
                                  e.preventDefault()
                                  const element = document.getElementById(`education-${eduId}`)
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
                                        setOpenEducation(prev => {
                                          const newSet = new Set(prev)
                                          newSet.add(eduName)
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
                                {index === openEducationList.length - 1 ? '└──' : '├──'}
                              </span>
                              <span>{eduName}</span>
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

