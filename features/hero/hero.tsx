'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Github, Linkedin, Mail, Facebook, Instagram } from 'lucide-react'
import Tooltip from '@/components/tooltip/Tooltip'
import styles from './hero.module.css'

// Auto-hover configuration for header
const AUTO_HOVER_CONFIG = {
  enabled: false, // Enable/disable auto-hover feature
  interval: 3000, // Time in milliseconds between each hover (3 seconds)
  resumeDelay: 500, // Delay in milliseconds before resuming auto-hover after manual hover (0.5 seconds)
  hoverableParts: ['khai', 'zer', 'd', 'n'], // Parts of the name to auto-hover
} as const

export default function Hero() {
  const [hoveredUrl, setHoveredUrl] = useState<string | null>(null)
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const [hoveredLetter, setHoveredLetter] = useState<string | null>(null)
  const [isAutoHoverPaused, setIsAutoHoverPaused] = useState(false)
  const autoHoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const autoHoverIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const autoHoverIndexRef = useRef(0)

  const quotes = [
    // "Always imagine ~",
    // "They shouldn't be teaching you what to think but how to think.",
    "Talent is a pursued interest. In other words, anything that you're willing to practice, you can do. ~ Bob Ross",
    // "Find what you love, what you’re good at, what the world needs, and what you can be paid for. ~ Ikigai",
    // "Continuous improvement turns progress into greatness. ~ Kaizen",
    // "We encounter problems not by accident, but because we are searching for something better.",
    // "Life is art and creativity makes it interesting.",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length)
    }, 4000) // Change quote every 4 seconds

    return () => clearInterval(interval)
  }, [quotes.length])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (autoHoverTimeoutRef.current) {
        clearTimeout(autoHoverTimeoutRef.current)
      }
    }
  }, [])

  // Auto-hover loop for name parts
  useEffect(() => {
    // Don't run if auto-hover is disabled
    if (!AUTO_HOVER_CONFIG.enabled) {
      return
    }

    // Clear any existing interval
    if (autoHoverIntervalRef.current) {
      clearInterval(autoHoverIntervalRef.current)
      autoHoverIntervalRef.current = null
    }

    if (hoveredUrl || isAutoHoverPaused) {
      return
    }

    const hoverableParts = AUTO_HOVER_CONFIG.hoverableParts
    
    // Set initial hover
    setHoveredLetter(hoverableParts[autoHoverIndexRef.current])
    
    autoHoverIntervalRef.current = setInterval(() => {
      autoHoverIndexRef.current = (autoHoverIndexRef.current + 1) % hoverableParts.length
      setHoveredLetter(hoverableParts[autoHoverIndexRef.current])
    }, AUTO_HOVER_CONFIG.interval)

    return () => {
      if (autoHoverIntervalRef.current) {
        clearInterval(autoHoverIntervalRef.current)
        autoHoverIntervalRef.current = null
      }
    }
  }, [hoveredUrl, isAutoHoverPaused])

  const socialLinks = [
    { icon: Github, href: 'https://github.com/khaizerdn', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/khaizerdn', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:khaizerdn@gmail.com', label: 'Email' },
    { icon: Facebook, href: 'https://facebook.com/khaizerdn', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com/khaizerdn', label: 'Instagram' },
  ]

  const formatUrl = (url: string): string => {
    return url
      .replace('mailto:', '')
      .replace('https://', '')
      .replace('http://', '')
      .replace('www.', '')
  }

  const splitUrl = (url: string | null) => {
    if (!url) return { prefix: '', name: 'khaizerdn', suffix: '' }
    
    const formatted = formatUrl(url)
    const name = 'khaizerdn'
    
    // For email: khaizerdn@gmail.com
    if (formatted.includes('@')) {
      const parts = formatted.split('@')
      if (parts[0] === name) {
        return {
          prefix: '',
          name: name,
          suffix: '@' + parts[1],
        }
      }
    }
    
    // For URLs with khaizerdn in them
    if (formatted.includes(name)) {
      const nameIndex = formatted.indexOf(name)
      return {
        prefix: formatted.substring(0, nameIndex),
        name: name,
        suffix: formatted.substring(nameIndex + name.length),
      }
    }
    
    // Fallback: show full URL as prefix
    return {
      prefix: formatted,
      name: '',
      suffix: '',
    }
  }

  return (
    <section id="home" className={styles.section}>
      <div className={styles.content}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={styles.titleWrapper}
        >
          <h1 className={styles.title} style={{ lineHeight: '0.9', minHeight: 'unset' }}>
            <motion.span
              key={hoveredUrl || 'default'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={styles.titleText}
            >
              {(() => {
                if (!hoveredUrl) {
                  const nameParts = [
                    { text: 'khai', tooltip: 'Nickname' },
                    { text: 'zer', tooltip: 'First Name' },
                    { text: 'd', tooltip: 'Middle Name' },
                    { text: 'n', tooltip: 'Last Name' },
                  ]
                  
                  return (
                    <>
                      {nameParts.map((part, index) => {
                        const isKhai = part.text === 'khai'
                        const isZer = part.text === 'zer'
                        const isZerHovered = hoveredLetter === 'zer'
                        const shouldHighlight = (isKhai && isZerHovered) || (hoveredLetter === part.text)
                        const shouldShowTooltip = Boolean(part.tooltip && hoveredLetter === part.text)
                        const isHoverable = part.tooltip || isZer
                        
                        return (
                          <span
                            key={index}
                            className={styles.namePart}
                            onMouseEnter={() => {
                              if (isHoverable) {
                                setIsAutoHoverPaused(true)
                                setHoveredLetter(part.text)
                                // Clear any existing timeout
                                if (autoHoverTimeoutRef.current) {
                                  clearTimeout(autoHoverTimeoutRef.current)
                                }
                              }
                            }}
                            onMouseLeave={() => {
                              // Resume auto-hover after a short delay
                              if (autoHoverTimeoutRef.current) {
                                clearTimeout(autoHoverTimeoutRef.current)
                              }
                              autoHoverTimeoutRef.current = setTimeout(() => {
                                setIsAutoHoverPaused(false)
                                setHoveredLetter(null)
                              }, AUTO_HOVER_CONFIG.resumeDelay)
                            }}
                          >
                            <span className={isHoverable ? `${styles.namePartHoverable} ${shouldHighlight ? styles.namePartHighlighted : ''}` : ''}>
                              {part.text}
                            </span>
                            <Tooltip show={shouldShowTooltip}>
                              {part.tooltip}
                            </Tooltip>
                          </span>
                        )
                      })}
                    </>
                  )
                }
                const parts = splitUrl(hoveredUrl)
                return (
                  <>
                    {parts.prefix && (
                      <span className={styles.urlPrefix}>{parts.prefix}</span>
                    )}
                    {parts.name && (
                      <span>{parts.name}</span>
                    )}
                    {parts.suffix && (
                      <span className={styles.urlSuffix}>{parts.suffix}</span>
                    )}
                  </>
                )
              })()}
            </motion.span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className={styles.quoteWrapper}
        >
          <div className={styles.quoteContainer}>
            <AnimatePresence mode="wait">
              <motion.p
                key={currentQuoteIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={styles.quote}
                style={{ lineHeight: '1.5' }}
              >
                {(() => {
                  const quote = quotes[currentQuoteIndex]
                  const tildeIndex = quote.indexOf(' ~ ')
                  if (tildeIndex !== -1) {
                    const quoteText = quote.substring(0, tildeIndex)
                    const attribution = quote.substring(tildeIndex + 3)
                    return (
                      <>
                        "{quoteText}" ~ {attribution}
                      </>
                    )
                  }
                  return `"${quote}"`
                })()}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className={styles.themesWrapper}
        >
          <div className={styles.themesContainer}>
            {socialLinks.map((social) => {
              const Icon = social.icon
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.themeButton}
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  onMouseEnter={() => setHoveredUrl(social.href)}
                  onMouseLeave={() => setHoveredUrl(null)}
                  onMouseDown={() => setHoveredUrl(social.href)}
                  onTouchStart={() => setHoveredUrl(social.href)}
                >
                  <Icon size={24} className={styles.socialIcon} />
                  <span className={styles.srOnly}>{social.label}</span>
                </motion.a>
              )
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={styles.scrollLinkWrapper}
        >
          <motion.a
            href="#projects"
            className={styles.scrollLink}
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          >
            <span>Scroll to explore</span>
            <ChevronDown size={16} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
