'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { useEducation } from '@/lib/education-context'
import gradImage from './assets/grad.png'
import styles from './Education.module.css'

interface Education {
  school: string
  degree: string
  year: string
  honor?: string
  gpa?: string
}

const educationData: Education[] = [
  {
    school: 'Cavite State University - Carmona Campus',
    degree: 'Bachelor of Science in Computer Engineering',
    year: '2025',
    honor: 'Cum Laude',
    gpa: '1.607'
  }
]

function EducationPreview({ image, initialX, initialY, schoolName }: { image: string, initialX: number, initialY: number, schoolName: string }) {
  const x = useMotionValue(initialX)
  const y = useMotionValue(initialY)
  
  // Smooth spring animation for cursor following
  const springConfig = { damping: 20, stiffness: 100, mass: 0.8 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [x, y])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, x: 80, y: -300 }}
      animate={{ opacity: 1, scale: 1, x: 80, y: -300 }}
      exit={{ opacity: 0, scale: 0.9, x: 80, y: -300 }}
      transition={{ type: "spring", duration: 0.4, bounce: 0 }}
      className={styles.hoverPreview}
      style={{
        left: springX,
        top: springY,
      }}
    >
      <div className={styles.previewFrame}>
        <img
          src={image}
          alt={`${schoolName} preview`}
          className={styles.previewImage}
        />
      </div>
    </motion.div>
  )
}

export default function Education() {
  const { openEducation, setOpenEducation } = useEducation()
  const [hoveredEducation, setHoveredEducation] = useState<string | null>(null)
  const [initialMousePosition, setInitialMousePosition] = useState({ x: 0, y: 0 })
  const [mounted, setMounted] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check if device is touch-enabled (mobile/tablet)
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  const handleEducationClick = (school: string) => {
    setOpenEducation(prev => {
      const newSet = new Set(prev)
      if (newSet.has(school)) {
        newSet.delete(school)
      } else {
        newSet.add(school)
      }
      return newSet
    })
  }

  return (
    <section id="education" className={styles.section}>
      <div className={styles.content}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={styles.header}
        >
          <h2 className={styles.title}>EDUCATION</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className={styles.educationContainer}
        >
          {educationData.map((edu, index) => (
            <motion.div
              key={edu.school}
              id={`education-${edu.school.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '200px 0px' }}
              transition={{ duration: 0.6, delay: Math.min(index * 0.05, 1), ease: [0.22, 1, 0.36, 1] }}
              className={styles.educationWrapper}
              data-open={openEducation.has(edu.school)}
            >
              <div
                className={styles.educationItem}
                onClick={() => handleEducationClick(edu.school)}
                onMouseEnter={(e) => {
                  if (isTouchDevice) return
                  const imageSrc = typeof gradImage === 'string' ? gradImage : gradImage.src
                  if (imageSrc) {
                    setHoveredEducation(edu.school)
                    setInitialMousePosition({ x: e.clientX, y: e.clientY })
                  }
                }}
                onMouseLeave={() => setHoveredEducation(null)}
              >
                <span className={styles.schoolName}>{edu.school}</span>
                <span className={styles.year}>{edu.year}</span>
              </div>
              <AnimatePresence>
                {openEducation.has(edu.school) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ 
                      duration: 0.4, 
                      ease: [0.22, 1, 0.36, 1],
                      height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                      opacity: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
                    }}
                    className={styles.educationContent}
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className={styles.contentWrapper}
                    >
                      <p className={styles.degree}>
                        {edu.degree}
                        {(edu.honor || edu.gpa) && (
                          <>
                            <br />
                            {edu.honor && <span className={styles.honor}>{edu.honor}</span>}
                            {edu.honor && edu.gpa && <span className={styles.separator}> • </span>}
                            {edu.gpa && <span className={styles.gpa}>GPA: {edu.gpa}</span>}
                          </>
                        )}
                      </p>
                      {index === 0 && (
                        <motion.img
                          src={typeof gradImage === 'string' ? gradImage : gradImage.src}
                          alt={`${edu.school} graduation`}
                          className={styles.contentImage}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.2 }}
                          loading="lazy"
                        />
                      )}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {mounted && createPortal(
        <AnimatePresence>
          {hoveredEducation && !openEducation.has(hoveredEducation) && (() => {
            const edu = educationData.find(e => e.school === hoveredEducation)
            if (!edu) return null
            const imageSrc = typeof gradImage === 'string' ? gradImage : gradImage.src
            if (!imageSrc) return null
            
            return (
              <EducationPreview
                key="preview"
                image={imageSrc}
                initialX={initialMousePosition.x}
                initialY={initialMousePosition.y}
                schoolName={edu.school}
              />
            )
          })()}
        </AnimatePresence>,
        document.body
      )}
    </section>
  )
}
