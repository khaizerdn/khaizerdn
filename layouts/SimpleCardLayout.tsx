'use client'

import { useState, useEffect, memo, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Github, ExternalLink } from 'lucide-react'

export interface SimpleCardItem {
  title: string
  description: string
  technologies?: string[]
  github?: string
  live?: string
  image?: string
  images?: string[]
}

interface SimpleCardLayoutProps {
  title: string
  description: string
  items: SimpleCardItem[]
  id?: string
  showAll?: boolean
  onShowMore?: () => void
  remaining?: number
}

export default function SimpleCardLayout({
  title,
  description,
  items,
  id = 'section',
  showAll = false,
  onShowMore,
  remaining = 0,
}: SimpleCardLayoutProps) {
  const [lightboxItem, setLightboxItem] = useState<SimpleCardItem | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const visibleItems = showAll ? items : items.slice(0, 6)

  // Prevent background scroll while modal is open
  useEffect(() => {
    const root = document.documentElement
    if (lightboxItem) {
      root.classList.add('modal-open')
    } else {
      root.classList.remove('modal-open')
    }
    return () => {
      root.classList.remove('modal-open')
    }
  }, [lightboxItem])

  // Hard-lock all scrolling while modal is open
  useEffect(() => {
    if (!lightboxItem) return

    const handleWheel = (e: WheelEvent) => e.preventDefault()
    const handleTouchMove = (e: TouchEvent) => e.preventDefault()
    const handleKeyDown = (e: KeyboardEvent) => {
      const keys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' ', 'Spacebar']
      if (keys.includes(e.key)) e.preventDefault()
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
  }, [lightboxItem])

  const handleCardClick = useCallback((item: SimpleCardItem, startIndex: number) => {
    const imageSources = item.images || (item.image ? [item.image] : [])
    if (imageSources.length === 0) return
    setLightboxItem(item)
    setLightboxIndex(startIndex)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxItem(null)
    setLightboxIndex(0)
  }, [])

  const showPrevImage = useCallback(() => {
    if (!lightboxItem) return
    const imageSources = lightboxItem.images || (lightboxItem.image ? [lightboxItem.image] : [])
    if (imageSources.length === 0) return
    setLightboxIndex((prev) => (prev === 0 ? imageSources.length - 1 : prev - 1))
  }, [lightboxItem])

  const showNextImage = useCallback(() => {
    if (!lightboxItem) return
    const imageSources = lightboxItem.images || (lightboxItem.image ? [lightboxItem.image] : [])
    if (imageSources.length === 0) return
    setLightboxIndex((prev) => (prev + 1) % imageSources.length)
  }, [lightboxItem])

  const lightboxImageSources = lightboxItem
    ? lightboxItem.images || (lightboxItem.image ? [lightboxItem.image] : [])
    : []

  return (
    <>
      <section id={id} className="py-20 md:py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              <span className="text-white">{title}</span>
            </h2>
            <div className="w-16 h-px bg-white/30 mx-auto mb-6"></div>
            <p className="text-white max-w-2xl mx-auto text-lg font-light">{description}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleItems.map((item, index) => (
              <CardItem
                key={item.title}
                item={item}
                index={index}
                onCardClick={handleCardClick}
              />
            ))}
          </div>

          {remaining > 0 && onShowMore && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-10 flex justify-center"
            >
              <button
                type="button"
                onClick={onShowMore}
                className="text-sm font-light text-white border border-white/20 rounded-full px-4 py-2 hover:bg-white hover:text-black transition-all duration-300 ease-out"
              >
                Show More {remaining} Items
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {lightboxItem && lightboxImageSources.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 w-screen h-screen"
                onClick={closeLightbox}
              >
                <div className="relative max-w-4xl w-full px-4" onClick={(e) => e.stopPropagation()}>
                  <div className="flex justify-end mb-4">
                    <button
                      type="button"
                      onClick={closeLightbox}
                      className="text-white text-sm px-3 py-1 border border-white/40 rounded-full hover:bg-white hover:text-black transition-colors"
                    >
                      Close
                    </button>
                  </div>
                  <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={lightboxIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={lightboxImageSources[lightboxIndex]}
                          alt={lightboxItem.title}
                          fill
                          className="object-contain"
                        />
                      </motion.div>
                    </AnimatePresence>
                    {lightboxImageSources.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            showPrevImage()
                          }}
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/70 text-white flex items-center justify-center text-sm hover:bg-black/90 transition-colors"
                        >
                          ‹
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            showNextImage()
                          }}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/70 text-white flex items-center justify-center text-sm hover:bg-black/90 transition-colors"
                        >
                          ›
                        </button>
                      </>
                    )}
                  </div>
                  {lightboxItem.title && (
                    <p className="mt-4 text-center text-white text-sm font-light">{lightboxItem.title}</p>
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

const CardItem = memo(function CardItem({
  item,
  index,
  onCardClick,
}: {
  item: SimpleCardItem
  index: number
  onCardClick: (item: SimpleCardItem, startIndex: number) => void
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [imageError, setImageError] = useState(false)
  
  // Use images array if available, otherwise fall back to single image
  const imageSources = item.images || (item.image ? [item.image] : [])
  const hasImages = imageSources.length > 0 && !imageError

  const nextImage = () => {
    if (!hasImages || imageSources.length <= 1) return
    setCurrentImageIndex((prev) => ((prev + 1) % imageSources.length))
  }

  const prevImage = () => {
    if (!hasImages || imageSources.length <= 1) return
    setCurrentImageIndex((prev) => (prev === 0 ? imageSources.length - 1 : prev - 1))
  }

  const currentImageSrc = imageSources[currentImageIndex]

  const hasAnimated = useRef(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={hasAnimated.current ? { opacity: 1, y: 0 } : {}}
      whileInView={{ opacity: 1, y: 0 }}
      onViewportEnter={() => {
        hasAnimated.current = true
      }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: 0.15 + index * 0.05 }}
      className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-white/20 hover:bg-white/10 transition-all duration-300 overflow-hidden flex flex-col"
    >
      {hasImages ? (
        <div 
          className="relative h-56 bg-white/5 overflow-hidden cursor-pointer flex-shrink-0"
          onClick={() => onCardClick(item, currentImageIndex)}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent group-hover:from-white/20 transition-all duration-300" />
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentImageSrc}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={currentImageSrc}
                alt={item.title}
                fill
                className="object-cover"
                onError={() => setImageError(true)}
                priority={index < 3}
              />
            </motion.div>
          </AnimatePresence>
          {imageSources.length > 1 && (
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
            </>
          )}
        </div>
      ) : (
        <div className="relative h-56 bg-white/5 overflow-hidden flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent group-hover:from-white/20 transition-all duration-300"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white/30 text-xs font-light tracking-wider uppercase">
              NO IMAGE PROVIDED
            </span>
          </div>
        </div>
      )}
      <div className="p-8 flex flex-col flex-grow min-h-0">
        <div className="flex-grow">
          <h3 className="text-xl font-bold mb-3 text-white tracking-tight">{item.title}</h3>
          <p className="text-white mb-5 text-sm leading-relaxed font-light">{item.description}</p>
          {item.technologies && item.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {item.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-xs font-medium bg-white text-black rounded-full tracking-wide"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
        {(item.github || item.live) && (
          <div className="flex gap-6 mt-auto">
            {item.github && (
              <a
                href={item.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white transition-colors duration-200 font-light group/link"
              >
                <Github size={16} className="group-hover/link:scale-110 transition-transform" />
                <span>Code</span>
              </a>
            )}
            {item.live && (
              <a
                href={item.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white transition-colors duration-200 font-light group/link"
              >
                <ExternalLink size={16} className="group-hover/link:scale-110 transition-transform" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
})
