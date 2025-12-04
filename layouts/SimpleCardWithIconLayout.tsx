'use client'

import { useState, useEffect, memo, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export interface SimpleCardWithIconItem {
  title: string
  issuer?: string
  issuerUrl?: string
  year?: string
  description?: string
  logo?: string
  images?: string[]
  icon?: string
}

interface SimpleCardWithIconLayoutProps {
  title: string
  description: string
  items: SimpleCardWithIconItem[]
  id?: string
  showAll?: boolean
  onShowMore?: () => void
  remaining?: number
}

export default function SimpleCardWithIconLayout({
  title,
  description,
  items,
  id = 'section',
  showAll = false,
  onShowMore,
  remaining = 0,
}: SimpleCardWithIconLayoutProps) {
  const [lightboxItem, setLightboxItem] = useState<SimpleCardWithIconItem | null>(null)
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

  const handleCardClick = useCallback((item: SimpleCardWithIconItem, startIndex: number) => {
    if (!item.images || item.images.length === 0) return
    setLightboxItem(item)
    setLightboxIndex(startIndex)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxItem(null)
    setLightboxIndex(0)
  }, [])

  const showPrevImage = useCallback(() => {
    if (!lightboxItem || !lightboxItem.images || lightboxItem.images.length === 0) return
    setLightboxIndex((prev) => (prev === 0 ? lightboxItem.images!.length - 1 : prev - 1))
  }, [lightboxItem])

  const showNextImage = useCallback(() => {
    if (!lightboxItem || !lightboxItem.images || lightboxItem.images.length === 0) return
    setLightboxIndex((prev) => (prev + 1) % lightboxItem.images!.length)
  }, [lightboxItem])

  return (
    <>
      <section id={id} className="py-12 md:py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
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
              transition={{ duration: 0.6, delay: 0.2 }}
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
            {lightboxItem && lightboxItem.images && lightboxItem.images.length > 0 && (
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
                          src={lightboxItem.images[lightboxIndex]}
                          alt={lightboxItem.title}
                          fill
                          className="object-contain"
                        />
                      </motion.div>
                    </AnimatePresence>
                    {lightboxItem.images.length > 1 && (
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
  item: SimpleCardWithIconItem
  index: number
  onCardClick: (item: SimpleCardWithIconItem, startIndex: number) => void
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [imageError, setImageError] = useState(false)
  const hasImages = item.images && item.images.length > 0 && !imageError

  const nextImage = () => {
    if (!hasImages) return
    setCurrentImageIndex((prev) => ((prev + 1) % item.images!.length))
  }

  const prevImage = () => {
    if (!hasImages) return
    setCurrentImageIndex((prev) => (prev === 0 ? item.images!.length - 1 : prev - 1))
  }

  const currentImageSrc = item.images?.[currentImageIndex]

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
      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
      className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-white/20 hover:bg-white/10 transition-all duration-300 overflow-hidden"
    >
      {hasImages ? (
        <div 
          className="relative h-56 bg-white/5 overflow-hidden cursor-pointer"
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
                src={currentImageSrc!}
                alt={item.title}
                fill
                className="object-cover"
                onError={() => setImageError(true)}
                priority={index < 3}
              />
            </motion.div>
          </AnimatePresence>
          {item.images!.length > 1 && (
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
        <div className="relative h-56 bg-white/5 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
          {item.logo && (
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <Image src={item.logo} alt={item.title} width={120} height={120} className="object-contain opacity-50" />
            </div>
          )}
        </div>
      )}
      <div className="p-8">
        <h3 className="text-xl font-bold mb-2 text-white tracking-tight">{item.title}</h3>
        {item.issuer && (
          <p className="text-white/70 text-sm mb-2 font-light">
            {item.issuerUrl ? (
              <a href={item.issuerUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                {item.issuer}
              </a>
            ) : (
              item.issuer
            )}
            {item.year && ` • ${item.year}`}
          </p>
        )}
        {item.description && (
          <p className="text-white/80 text-sm leading-relaxed font-light">{item.description}</p>
        )}
      </div>
    </motion.div>
  )
})

