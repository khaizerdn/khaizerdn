'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Github, Linkedin, Mail, Facebook, Instagram } from 'lucide-react'
import { useTheme, type Theme } from '@/lib/theme-context'

// Auto-hover configuration for header
const AUTO_HOVER_CONFIG = {
  enabled: false, // Enable/disable auto-hover feature
  interval: 3000, // Time in milliseconds between each hover (3 seconds)
  resumeDelay: 500, // Delay in milliseconds before resuming auto-hover after manual hover (0.5 seconds)
  hoverableParts: ['khai', 'zer', 'd', 'n'], // Parts of the name to auto-hover
} as const

export default function Hero() {
  const { theme, setTheme } = useTheme()
  const [hoveredUrl, setHoveredUrl] = useState<string | null>(null)
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)
  const [hoveredLetter, setHoveredLetter] = useState<string | null>(null)
  const [isAutoHoverPaused, setIsAutoHoverPaused] = useState(false)
  const autoHoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const autoHoverIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const autoHoverIndexRef = useRef(0)

  const themes: Theme[] = ['Programming', 'Creative', 'Leadership', 'Other']

  const themeIcons: Record<Theme, JSX.Element> = {
    Programming: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M9.13 9.89a3.006 3.006 0 0 1 0 4.23L1.72 21.7c-.2.2-.46.3-.72.3s-.5-.09-.7-.29a.996.996 0 0 1-.02-1.41l7.41-7.59c.4-.4.4-1.03 0-1.42L.28 3.7C-.11 3.3-.1 2.67.3 2.29s1.03-.38 1.41.02L9.12 9.9ZM23 20H11c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1Z" fill="currentColor"/>
      </svg>
    ),
    Creative: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M21 16v-4a8.983 8.983 0 0 0-3.356-7h2.633a1.991 1.991 0 1 0-.009-2h-4.41a3.981 3.981 0 0 0-7.716 0H3.723a1.991 1.991 0 1 0 .009 2h2.624A8.983 8.983 0 0 0 3 12v4a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3v-2a3 3 0 0 0-3-3v-4a7 7 0 0 1 3.521-6.065 3.963 3.963 0 0 0 6.958 0A7 7 0 0 1 19 12v4a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3v-2a3 3 0 0 0-3-3ZM6 19v2a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1Zm6-13a2 2 0 1 1 2-2 2 2 0 0 1-2 2Zm10 15a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1Z" fill="currentColor"/>
      </svg>
    ),
    Leadership: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M23.836 8.794a3.179 3.179 0 0 0-3.067-2.226H16.4l-1.327-4.136a3.227 3.227 0 0 0-6.146 0L7.6 6.568H3.231a3.227 3.227 0 0 0-1.9 5.832L4.887 15l-1.352 4.187A3.178 3.178 0 0 0 4.719 22.8a3.177 3.177 0 0 0 3.8-.019L12 20.219l3.482 2.559a3.227 3.227 0 0 0 4.983-3.591L19.113 15l3.56-2.6a3.177 3.177 0 0 0 1.163-3.606Zm-2.343 1.991-4.144 3.029a1 1 0 0 0-.362 1.116l1.575 4.87a1.227 1.227 0 0 1-1.895 1.365l-4.075-3a1 1 0 0 0-1.184 0l-4.075 3a1.227 1.227 0 0 1-1.9-1.365l1.58-4.87a1 1 0 0 0-.362-1.116l-4.144-3.029a1.227 1.227 0 0 1 .724-2.217h5.1a1 1 0 0 0 .952-.694l1.55-4.831a1.227 1.227 0 0 1 2.336 0l1.55 4.831a1 1 0 0 0 .952.694h5.1a1.227 1.227 0 0 1 .724 2.217Z" fill="currentColor"/>
      </svg>
    ),
    Other: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M24 6.5V1a1.001 1.001 0 0 0-1.6-.8l-1.687 1.265a5.485 5.485 0 0 0-4.426 0L14.6.2A1 1 0 0 0 13 1v5.5c0 1.047.294 2.026.804 2.86-8.499 2.833-8.811 11.141-8.807 12.419C3.467 21.351 2 20.291 2 18.5c0-1.565.718-2.724 1.479-3.949C4.227 13.344 5 12.097 5 10.5c0-2.565-1.374-4.16-3.869-4.491a1.007 1.007 0 0 0-1.123.86 1 1 0 0 0 .86 1.123c1.494.198 2.131.949 2.131 2.509 0 1.027-.566 1.94-1.221 2.996-.834 1.345-1.779 2.869-1.779 5.004 0 3.133 2.762 5.119 5.689 5.45.098.032.733.05.869.05h16.442a1 1 0 1 0 0-2h-1v-11.26a5.491 5.491 0 0 0 2-4.24ZM20 22h-2c0-3.309-2.691-6-6-6a1 1 0 1 0 0 2c2.206 0 4 1.794 4 4H6.999c-.017-.357-.31-8.744 8.331-11.008a5.5 5.5 0 0 0 4.67.8V22Zm-1.5-12C16.57 10 15 8.43 15 6.5S16.57 3 18.5 3 22 4.57 22 6.5 20.43 10 18.5 10Z" fill="currentColor"/>
      </svg>
    ),
  }

  const quotes = [
    "Always imagine ~",
    "They shouldn't be teaching you what to think but how to think.",
    "Talent is a pursued interest. In other words, anything that you're willing to practice, you can do. ~ Bob Ross",
    "Find what you love, what you’re good at, what the world needs, and what you can be paid for. ~ Ikigai",
    "Continuous improvement turns progress into greatness. ~ Kaizen",
    "We encounter problems not by accident, but because we are searching for something better.",
    "Life is art and creativity makes it interesting.",
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
    <section id="home" className="min-h-screen flex items-center justify-center relative bg-white overflow-hidden">
      <div className="max-w-[700px] mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10">
        <div className="text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full px-4 mb-2 sm:mb-3 md:mb-4 lg:mb-4"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-7xl xl:text-8xl font-bold break-words text-center flex justify-center items-center" style={{ lineHeight: '0.9', minHeight: 'unset' }}>
              <motion.span
                key={hoveredUrl || 'default'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-gray-900 font-extrabold break-words"
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
                          const shouldShowTooltip = part.tooltip && hoveredLetter === part.text
                          const isHoverable = part.tooltip || isZer
                          
                          return (
                            <span
                              key={index}
                              className="relative inline-block"
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
                              <span className={isHoverable ? `cursor-pointer transition-opacity ${shouldHighlight ? 'opacity-70' : ''}` : ''}>
                                {part.text}
                              </span>
                              {shouldShowTooltip && (
                                <div className="absolute bottom-full left-0 right-0 mb-4 flex justify-center z-50 pointer-events-none">
                                  <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                    className="px-3 py-1.5 bg-gray-50 backdrop-blur-sm border border-gray-200 text-gray-700 text-xs font-light rounded-lg whitespace-nowrap tracking-normal relative"
                                  >
                                    {part.tooltip}
                                    <div 
                                      className="absolute top-full left-1/2 -translate-x-1/2 -mt-0.3"
                                    >
                                      <div className="relative">
                                        <div className="w-0 h-0 border-l-[7px] border-r-[7px] border-t-[7px] border-l-transparent border-r-transparent border-t-gray-200 absolute left-1/2 -translate-x-1/2"></div>
                                        <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-gray-50 relative"></div>
                                      </div>
                                    </div>
                                  </motion.div>
                                </div>
                              )}
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
                        <span className="text-gray-900 opacity-30">{parts.prefix}</span>
                      )}
                      {parts.name && (
                        <span>{parts.name}</span>
                      )}
                      {parts.suffix && (
                        <span className="text-gray-900 opacity-30">{parts.suffix}</span>
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
            className="w-full px-4 mb-2 sm:mb-3 md:mb-4 lg:mb-4"
          >
            <div className="max-w-3xl mx-auto h-[10rem] sm:h-[5rem] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentQuoteIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="text-xl text-gray-700 font-light italic text-center px-2 sm:px-4 leading-tight break-words"
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
            className="w-full px-4 mb-3 sm:mb-4 md:mb-5"
          >
            <div className="flex flex-wrap justify-center">
              {themes.map((themeOption) => (
                <button
                  key={themeOption}
                  onClick={() => setTheme(themeOption)}
                  className={`p-2 transition-all duration-300 ${
                    theme === themeOption
                      ? 'text-gray-900 opacity-100'
                      : 'text-gray-400 opacity-60 hover:opacity-100 hover:text-gray-700'
                  }`}
                  aria-label={themeOption}
                >
                  <motion.div
                    className="w-6 h-6 sm:w-7 sm:h-7"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    {themeIcons[themeOption]}
                  </motion.div>
                </button>
              ))}
            </div>
          </motion.div>

          <div className="flex flex-col items-center mb-2 sm:mb-3 md:mb-4 lg:mb-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-center mb-4"
            >
              <div className="stable-container">
                <div className="inline-flex items-stretch gap-0 bg-gray-50 backdrop-blur-sm border border-gray-200 rounded-lg overflow-hidden isolate">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative p-4 text-gray-700 border-r border-gray-200 last:border-r-0 flex items-center justify-center w-[3rem] h-[3rem] box-border"
                        style={{ flexShrink: 0 }}
                        onMouseEnter={() => setHoveredUrl(social.href)}
                        onMouseLeave={() => setHoveredUrl(null)}
                        onMouseDown={() => setHoveredUrl(social.href)}
                        onTouchStart={() => setHoveredUrl(social.href)}
                      >
                        <div className="absolute inset-0 bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        <Icon size={20} className="relative z-10 group-hover:text-gray-900 transition-colors duration-300" />
                        <span className="sr-only">{social.label}</span>
                      </a>
                    )
                  })}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <motion.a
                href="#projects"
                className="inline-flex items-center gap-1 text-sm text-gray-600 transition-colors duration-300 font-light tracking-wide"
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              >
                <span>Scroll to explore</span>
                <ChevronDown size={16} />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

