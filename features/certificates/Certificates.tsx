'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import styles from './Certificates.module.css'

interface Certificate {
  name: string
  issuer: string
  year: string
  link?: string
  images: string[]
}

const certificates: Certificate[] = [
  {
    name: 'Meta Front-End Developer Professional Certificate',
    issuer: 'Meta',
    year: '2024',
    link: '#',
    images: ['https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop']
  },
  {
    name: 'Google UX Design Professional Certificate',
    issuer: 'Google',
    year: '2023',
    link: '#',
    images: ['https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=800&h=600&fit=crop']
  },
  {
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    year: '2023',
    link: '#',
    images: ['https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop']
  },
  {
    name: 'JavaScript Algorithms and Data Structures',
    issuer: 'freeCodeCamp',
    year: '2022',
    link: '#',
    images: ['https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=600&fit=crop']
  }
]

function CertificatePreview({ images, initialX, initialY, certificateName }: { images: string[], initialX: number, initialY: number, certificateName: string }) {
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
        {images.slice(0, 1).map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`${certificateName} preview`}
            className={styles.previewImage}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default function Certificates() {
  const [openCertificates, setOpenCertificates] = useState<Set<string>>(new Set())
  const [hoveredCertificate, setHoveredCertificate] = useState<string | null>(null)
  const [initialMousePosition, setInitialMousePosition] = useState({ x: 0, y: 0 })
  const [mounted, setMounted] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check if device is touch-enabled (mobile/tablet)
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  const handleCertificateClick = (certificateName: string) => {
    setOpenCertificates(prev => {
      const newSet = new Set(prev)
      if (newSet.has(certificateName)) {
        newSet.delete(certificateName)
      } else {
        newSet.add(certificateName)
      }
      return newSet
    })
  }

  return (
    <section id="certificates" className={styles.section}>
      <div className={styles.content}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={styles.header}
        >
          <h2 className={styles.title}>CERTIFICATES</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className={styles.certificatesContainer}
        >
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '200px 0px' }}
              transition={{ duration: 0.6, delay: Math.min(index * 0.05, 1), ease: [0.22, 1, 0.36, 1] }}
              className={styles.certificateWrapper}
              data-open={openCertificates.has(cert.name)}
            >
              <div
                className={styles.certificateItem}
                onClick={() => handleCertificateClick(cert.name)}
                onMouseEnter={(e) => {
                  if (isTouchDevice) return
                  if (cert.images.length > 0) {
                    setHoveredCertificate(cert.name)
                    setInitialMousePosition({ x: e.clientX, y: e.clientY })
                  }
                }}
                onMouseLeave={() => setHoveredCertificate(null)}
              >
                <div className={styles.certHeader}>
                  <span className={styles.certName}>{cert.name}</span>
                </div>
                <span className={styles.certYear}>{cert.year}</span>
              </div>
              <AnimatePresence>
                {openCertificates.has(cert.name) && (
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
                    className={styles.certContent}
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className={styles.contentWrapper}
                    >
                      <p className={styles.certIssuer}>{cert.issuer}</p>
                      {cert.images.map((src, idx) => (
                        <motion.img
                          key={idx}
                          src={src}
                          alt={`${cert.name} certificate`}
                          className={styles.contentImage}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.2 + idx * 0.1 }}
                          loading="lazy"
                        />
                      ))}
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
          {hoveredCertificate && !openCertificates.has(hoveredCertificate) && (() => {
            const cert = certificates.find(c => c.name === hoveredCertificate)
            if (!cert) return null
            if (cert.images.length === 0) return null
            
            return (
              <CertificatePreview
                key="preview"
                images={cert.images}
                initialX={initialMousePosition.x}
                initialY={initialMousePosition.y}
                certificateName={cert.name}
              />
            )
          })()}
        </AnimatePresence>,
        document.body
      )}
    </section>
  )
}

