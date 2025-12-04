'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Github, Linkedin, Mail, Facebook, Instagram } from 'lucide-react'
import { useTheme, type Theme } from '@/lib/theme-context'

export default function Hero() {
  const { theme, setTheme } = useTheme()
  const [hoveredUrl, setHoveredUrl] = useState<string | null>(null)
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0)

  const themes: Theme[] = ['Programming', 'Creative', 'Leadership', 'Other']

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
    <section id="home" className="min-h-screen flex items-center justify-center relative bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10">
        <div className="text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full px-4 mb-4 sm:mb-6 md:mb-8 lg:mb-8"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-7xl xl:text-8xl font-bold break-words" style={{ lineHeight: '0.9', minHeight: 'unset' }}>
              <motion.span
                key={hoveredUrl || 'default'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-white font-extrabold inline-block break-words"
              >
                {(() => {
                  if (!hoveredUrl) return 'khaizerdn'
                  const parts = splitUrl(hoveredUrl)
                  return (
                    <>
                      {parts.prefix && (
                        <span className="text-white opacity-30">{parts.prefix}</span>
                      )}
                      {parts.name && (
                        <span>{parts.name}</span>
                      )}
                      {parts.suffix && (
                        <span className="text-white opacity-30">{parts.suffix}</span>
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
            className="w-full px-4 mb-4 sm:mb-6 md:mb-8 lg:mb-8"
          >
            <div className="max-w-3xl mx-auto h-[3.5rem] md:h-[4rem] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentQuoteIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="text-sm sm:text-base md:text-lg lg:text-xl text-white font-light italic text-center px-2 sm:px-4 leading-tight break-words"
                  style={{ lineHeight: '1.5' }}
                >
                  "{quotes[currentQuoteIndex]}"
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="w-full px-4 mb-6 sm:mb-8 md:mb-10"
          >
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {themes.map((themeOption) => (
                <button
                  key={themeOption}
                  onClick={() => setTheme(themeOption)}
                  className={`px-4 sm:px-6 py-2 sm:py-2.5 text-sm sm:text-base font-light rounded-full border transition-all duration-300 ${
                    theme === themeOption
                      ? 'bg-white text-black border-white'
                      : 'bg-white/5 text-white border-white/20 hover:bg-white/10 hover:border-white/30'
                  }`}
                >
                  {themeOption}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="flex flex-col items-center mb-4 sm:mb-6 md:mb-8 lg:mb-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-center mb-8"
            >
              <div className="stable-container">
                <div className="inline-flex items-stretch gap-0 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden isolate">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon
                    return (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative p-4 text-white border-r border-white/10 last:border-r-0 flex items-center justify-center w-[3rem] h-[3rem] box-border"
                        style={{ flexShrink: 0 }}
                        onMouseEnter={() => setHoveredUrl(social.href)}
                        onMouseLeave={() => setHoveredUrl(null)}
                        onMouseDown={() => setHoveredUrl(social.href)}
                        onTouchStart={() => setHoveredUrl(social.href)}
                      >
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        <Icon size={20} className="relative z-10 group-hover:brightness-150 transition-[filter] duration-300" />
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
                className="inline-flex items-center gap-2 text-sm text-white transition-colors duration-300 font-light tracking-wide"
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

