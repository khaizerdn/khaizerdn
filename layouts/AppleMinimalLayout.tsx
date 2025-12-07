'use client'

import { useState, useEffect, memo, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Github, ExternalLink, ChevronDown } from 'lucide-react'

export interface AppleMinimalItem {
  title: string
  description: string
  technologies?: string[]
  github?: string
  live?: string
  image?: string
  images?: string[]
}

interface AppleMinimalLayoutProps {
  title: string
  description: string
  items: AppleMinimalItem[]
  id?: string
  showAll?: boolean
  onShowMore?: () => void
  remaining?: number
}

export default function AppleMinimalLayout({
  title,
  description,
  items,
  id = 'section',
  showAll = false,
  onShowMore,
  remaining = 0,
}: AppleMinimalLayoutProps) {
  const [lightboxItem, setLightboxItem] = useState<AppleMinimalItem | null>(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const visibleItems = items

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

  const handleCardClick = useCallback((item: AppleMinimalItem, startIndex: number) => {
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

  // Extract year from description or use current year as fallback
  const getYear = (item: AppleMinimalItem) => {
    const yearMatch = item.description.match(/\b(20\d{2})\b/)
    return yearMatch ? yearMatch[1] : new Date().getFullYear().toString()
  }

  return (
    <>
      <section id={id} className="py-16 md:py-24 bg-white">
        <div className="max-w-[700px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 md:mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-gray-900">
              {title}
            </h2>
            {description && (
              <p className="text-sm text-gray-600 font-light">
                {description}
              </p>
            )}
          </motion.div>

          {/* Simple row list */}
          <div className="space-y-0 relative">
            {visibleItems.map((item, index) => (
              <RowItem
                key={item.title}
                item={item}
                index={index}
                year={getYear(item)}
                onCardClick={handleCardClick}
              />
            ))}
          </div>

          {remaining > 0 && onShowMore && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="mt-8"
            >
              <button
                type="button"
                onClick={onShowMore}
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200"
              >
                Show {remaining} more
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
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 w-screen h-screen"
                onClick={closeLightbox}
              >
                <div className="relative max-w-6xl w-full px-6" onClick={(e) => e.stopPropagation()}>
                  <div className="flex justify-end mb-6">
                    <button
                      type="button"
                      onClick={closeLightbox}
                      className="text-white/80 text-sm px-4 py-2 border border-white/20 rounded-full hover:bg-white/10 hover:border-white/40 transition-all duration-200"
                    >
                      Close
                    </button>
                  </div>
                  <div className="relative aspect-video bg-black rounded-2xl overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={lightboxIndex}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
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
                          className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center text-xl hover:bg-white/20 transition-all duration-200"
                        >
                          ‹
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            showNextImage()
                          }}
                          className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center text-xl hover:bg-white/20 transition-all duration-200"
                        >
                          ›
                        </button>
                      </>
                    )}
                  </div>
                  {lightboxItem.title && (
                    <p className="mt-6 text-center text-white/90 text-lg font-light">{lightboxItem.title}</p>
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

const RowItem = memo(function RowItem({
  item,
  index,
  year,
  onCardClick,
}: {
  item: AppleMinimalItem
  index: number
  year: string
  onCardClick: (item: AppleMinimalItem, startIndex: number) => void
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [imageError, setImageError] = useState(false)
  
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

  const handleRowClick = () => {
    setIsExpanded(!isExpanded)
  }

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (hasImages) {
      onCardClick(item, currentImageIndex)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="relative"
    >
      <div
        style={isExpanded ? { position: 'sticky', top: 0, zIndex: 10 } : {}}
        className={`flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0 group cursor-pointer bg-white transition-all ${
          isExpanded ? 'shadow-sm -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8' : ''
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleRowClick}
      >
        <span className="text-base md:text-lg text-gray-900 font-light group-hover:text-gray-700 transition-colors">
          {item.title}
        </span>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500 font-light">
            {year}
          </span>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className={`${isHovered || isExpanded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}
          >
            <ChevronDown size={16} className="text-gray-500" />
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-4 pb-6 pl-0 space-y-4">
              {/* Description */}
              <p className="text-sm md:text-base text-gray-600 font-light leading-relaxed">
                {item.description}
              </p>

              {/* Image */}
              {hasImages && (
                <div 
                  className="relative w-full h-[200px] md:h-[280px] rounded overflow-hidden bg-gray-100 cursor-pointer group/image"
                  onClick={handleImageClick}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={currentImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={imageSources[currentImageIndex]}
                        alt={item.title}
                        fill
                        className="object-cover group-hover/image:scale-105 transition-transform duration-500"
                        onError={() => setImageError(true)}
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
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center text-xs hover:bg-black/80 transition-all opacity-0 group-hover/image:opacity-100"
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          nextImage()
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center text-xs hover:bg-black/80 transition-all opacity-0 group-hover/image:opacity-100"
                      >
                        ›
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* Technologies */}
              {item.technologies && item.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs text-gray-500 font-light"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {/* Links */}
              {(item.github || item.live) && (
                <div className="flex gap-4 text-xs">
                  {item.github && (
                    <a
                      href={item.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github size={13} />
                      <span>Code</span>
                    </a>
                  )}
                  {item.live && (
                    <a
                      href={item.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={13} />
                      <span>Demo</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
})
