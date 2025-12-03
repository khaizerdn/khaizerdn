'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { assetPath } from '@/lib/utils'

type Certificate = {
  title: string
  issuer: string
  issuerUrl?: string
  year: string
  description?: string
  logo?: string
  images?: string[]
}

// Base certificate data with raw paths
const certificatesData: Omit<Certificate, 'logo' | 'images'> & { logo?: string; images?: string[] }[] = [
  {
    title: 'LaunchPad Competition',
    issuer: 'Whitecloak Technologies Inc.',
    issuerUrl: 'https://whitecloak.com',
    year: '2025',
    description: 'Participated in the LaunchPad Competition showcasing innovative solutions.',
    logo: '/certificates/whitecloak.jpg',
    images: ['/certificates/WhitecloakLaunchPad.jpg'],
  },
  {
    title: '5th Student Research Congress',
    issuer: 'Cavite State University of Carmona',
    issuerUrl: 'https://carmona.cvsu.edu.ph',
    year: '2025',
    description:
      'Presented the research paper titled "DOXION: Digital Locker for Document Submission Management at Cavite State University - Carmona Campus"',
    logo: '/certificates/cvsucarmona.jpg',
    images: [
      '/certificates/5thStudentResearchCongress.jpg',
      '/certificates/5thStudentResearchCongress1.jpg',
      '/certificates/5thStudentResearchCongress2.jpg',
    ],
  },
  {
    title: 'Internship',
    issuer: 'CREOTEC Philippines Inc.',
    issuerUrl: 'https://www.facebook.com/profile.php?id=100064414875970',
    year: '2024',
    description: 'Participated in the LaunchPad Competition showcasing innovative solutions.',
    logo: '/certificates/creotec.png',
    images: ['/certificates/CreotecInternship.jpg'],
  },
  {
    title: 'Introducing Design Thinking and the SDGs to Engineering Students',
    issuer: 'Philippine Association of Engineering Schools (PAES)',
    issuerUrl: 'http://paesphil.org/',
    year: '2025',
    description:
      'Attended the PAES webinar entitled "Introducing Design Thinking and the SDGs to Engineering Students."',
    logo: '/certificates/PAES.png',
    images: ['/certificates/PAES1.jpg'],
  },
  {
    title: 'Submarine Cable System',
    issuer: 'Terra Hertz',
    issuerUrl: 'https://www.terrahertz.net/',
    year: '2025',
    description:
      'Participated in the live webinar by Terra Hertz entitled "Submarine Cable System".',
    logo: '/certificates/TerraHertz1.jpg',
    images: ['/certificates/TerraHertz.jpg'],
  },
  {
    title: 'Breakthrough: AI-driven Future of Manufacturing and Logistics Operations',
    issuer: 'Globe Telecom',
    issuerUrl: 'https://www.globe.com.ph/',
    year: '2025',
    description:
      'Attended and participated in Globe Business Breakthrough: AI-driven Future of Manufacturing and Logistics Operations.',
    logo: '/certificates/GlobeTelecom.png',
    images: ['/certificates/GlobeTelecom.jpg'],
  },
  {
    title: 'Introduction to Firebase as a Backend for React Applications',
    issuer: 'University of Caloocan City',
    issuerUrl: 'https://ucc-caloocan.edu.ph/',
    year: '2025',
    description:
      'Participated in the "Introduction to Firebase as a Backend for React Applications" webinar.',
    logo: '/certificates/UniversityOfCaloocan1.png',
    images: ['/certificates/UniversityOfCaloocan.jpg'],
  },
  // Add more certificates as needed
]

// Process certificates with basePath-aware paths
const certificates: Certificate[] = certificatesData.map((cert) => ({
  ...cert,
  logo: cert.logo ? assetPath(cert.logo) : undefined,
  images: cert.images ? cert.images.map((img) => assetPath(img)) : undefined,
}))

export default function Certificates() {
  const [showAll, setShowAll] = useState(false)
  const [lightboxCertificate, setLightboxCertificate] = useState<Certificate | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const visibleCertificates = showAll ? certificates : certificates.slice(0, 6)
  const remainingCertificates = certificates.length - visibleCertificates.length

  // Prevent background scroll and detach transforms while modal is open
  useEffect(() => {
    const root = document.documentElement
    if (lightboxCertificate) {
      root.classList.add('modal-open')
    } else {
      root.classList.remove('modal-open')
    }
    return () => {
      root.classList.remove('modal-open')
    }
  }, [lightboxCertificate])

  // Hard-lock all scrolling while modal is open
  useEffect(() => {
    if (!lightboxCertificate) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
    }
    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      const keys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ', 'Spacebar']
      if (keys.includes(e.key)) {
        e.preventDefault()
      }
    }

    const opts = { passive: false } as AddEventListenerOptions
    window.addEventListener('wheel', handleWheel, opts)
    window.addEventListener('touchmove', handleTouchMove, opts)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [lightboxCertificate])

  const handleCardClick = (certificate: Certificate, startIndex: number) => {
    if (!certificate.images || certificate.images.length === 0) return
    setLightboxCertificate(certificate)
    setLightboxIndex(startIndex)
  }

  const closeLightbox = () => {
    setLightboxCertificate(null)
    setLightboxIndex(0)
  }

  const showPrevLightboxImage = () => {
    if (!lightboxCertificate || !lightboxCertificate.images || lightboxCertificate.images.length === 0) return
    setLightboxIndex((prev) =>
      prev === 0 ? lightboxCertificate.images!.length - 1 : prev - 1
    )
  }

  const showNextLightboxImage = () => {
    if (!lightboxCertificate || !lightboxCertificate.images || lightboxCertificate.images.length === 0) return
    setLightboxIndex((prev) =>
      (prev + 1) % lightboxCertificate.images!.length
    )
  }

  return (
    <>
      <section id="certificates" className="py-20 md:py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              <span className="text-white">
                Certificates
              </span>
            </h2>
            <div className="w-16 h-px bg-white/30 mx-auto mb-6"></div>
            <p className="text-white max-w-2xl mx-auto text-lg font-light">
              Professional certifications and achievements
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleCertificates.map((certificate, index) => (
              <CertificateCard
                key={certificate.title}
                certificate={certificate}
                index={index}
                onCardClick={handleCardClick}
              />
            ))}
          </div>
          {remainingCertificates > 0 && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="text-sm font-light text-white border border-white/20 rounded-full px-4 py-2 hover:bg-white hover:text-black transition-all duration-300 ease-out"
              >
                Show More {remainingCertificates} Certificates
              </button>
            </div>
          )}
        </div>
      </section>

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {lightboxCertificate &&
              lightboxCertificate.images &&
              lightboxCertificate.images.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 w-screen h-screen"
                  onClick={closeLightbox}
                >
                  <div
                    className="relative max-w-4xl w-full px-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex justify-end mb-4">
                      <button
                        type="button"
                        onClick={closeLightbox}
                        className="text-white text-sm px-3 py-1 border border-white/40 rounded-full hover:bg-white hover:text-black transition-colors"
                      >
                        Close
                      </button>
                    </div>

                    <div className="relative w-full aspect-video bg-white/5 border border-white/20 rounded-xl overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={lightboxCertificate.images![lightboxIndex]}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.25 }}
                          className="absolute inset-0"
                        >
                          <Image
                            src={lightboxCertificate.images![lightboxIndex]}
                            alt={lightboxCertificate.title}
                            fill
                            className="object-contain"
                          />
                        </motion.div>
                      </AnimatePresence>

                      {lightboxCertificate.images!.length > 1 && (
                        <>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              showPrevLightboxImage()
                            }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/70 text-white flex items-center justify-center text-sm hover:bg-black/90 transition-colors"
                          >
                            ‹
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              showNextLightboxImage()
                            }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/70 text-white flex items-center justify-center text-sm hover:bg-black/90 transition-colors"
                          >
                            ›
                          </button>
                        </>
                      )}
                    </div>

                    {lightboxCertificate.title && (
                      <p className="mt-4 text-center text-white text-sm font-light">
                        {lightboxCertificate.title}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
          </AnimatePresence>,
          document.body
        )}
    </>
  )
}

type CertificateCardProps = {
  certificate: Certificate
  index: number
  onCardClick: (certificate: Certificate, startIndex: number) => void
}

function CertificateCard({ certificate, index, onCardClick }: CertificateCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [imageError, setImageError] = useState(false)
  const hasImages = certificate.images && certificate.images.length > 0 && !imageError

  const nextImage = () => {
    if (!hasImages) return
    setCurrentImageIndex((prev) => ((prev + 1) % certificate.images!.length))
  }

  const prevImage = () => {
    if (!hasImages) return
    setCurrentImageIndex((prev) =>
      prev === 0 ? certificate.images!.length - 1 : prev - 1
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-white/20 hover:bg-white/10 transition-all duration-300 overflow-hidden cursor-pointer"
      onClick={() => onCardClick(certificate, currentImageIndex)}
    >
      {hasImages ? (
        <div className="relative h-56 bg-white/5 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent group-hover:from-white/20 transition-all duration-300" />
          <AnimatePresence mode="wait">
            <motion.div
              key={certificate.images![currentImageIndex]}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={certificate.images![currentImageIndex]}
                alt={certificate.title}
                fill
                className="object-cover"
                onError={() => setImageError(true)}
              />
            </motion.div>
          </AnimatePresence>

          {certificate.images!.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  prevImage()
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center text-xs hover:bg-black/80 transition-colors opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  nextImage()
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center text-xs hover:bg-black/80 transition-colors opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                ›
              </button>

              <div className="absolute bottom-2 inset-x-0 flex justify-center gap-1">
                {certificate.images!.map((img, i) => (
                  <button
                    key={img}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentImageIndex(i)
                    }}
                    className={`h-1.5 w-4 rounded-full ${
                      i === currentImageIndex ? 'bg-white' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="relative h-56 bg-white/5 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent group-hover:from-white/20 transition-all duration-300" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white/30 text-xs font-light tracking-wider uppercase">
              NO IMAGE PROVIDED
            </span>
          </div>
        </div>
      )}

      <div className="p-8">
        <div className="flex items-start gap-5 mb-4">
          <div className="w-16 h-16 rounded-xl bg-white shrink-0 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center overflow-hidden">
            {certificate.logo ? (
              <Image
                src={certificate.logo}
                alt={`${certificate.issuer} logo`}
                width={48}
                height={48}
                className="object-contain w-full h-full"
              />
            ) : (
              <div className="w-full h-full bg-white/10 rounded" />
            )}
          </div>
          <div className="flex-grow">
            <h3 className="text-xl font-bold mb-2 text-white tracking-tight">
              {certificate.title}
            </h3>
            {certificate.issuerUrl ? (
              <a
                href={certificate.issuerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-white text-sm font-light mb-2 border-b border-transparent hover:border-white transition-colors"
              >
                {certificate.issuer}
              </a>
            ) : (
              <p className="text-white text-sm font-light mb-2">{certificate.issuer}</p>
            )}
            <p className="text-white text-xs font-light opacity-70">{certificate.year}</p>
          </div>
        </div>
        {certificate.description && (
          <p className="text-white text-sm leading-relaxed font-light">
            {certificate.description}
          </p>
        )}
      </div>
    </motion.div>
  )
}

