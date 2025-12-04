'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const email = 'khaizerdn@gmail.com'

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
    } catch (err) {
      console.error('Failed to copy email:', err)
    }
  }

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [copied])

  return (
    <section id="contact" className="py-20 md:py-32 bg-black">
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
              Get In Touch
            </span>
          </h2>
          <div className="w-16 h-px bg-white/30 mx-auto mb-6"></div>
          <p className="text-white max-w-2xl mx-auto text-lg font-light">
            I'm always open to discussing new projects, creative ideas, or opportunities
            to be part of your visions. Feel free to reach out!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center px-4 mb-10"
        >
          <a
            href="mailto:khaizerdn@gmail.com"
            className="text-2xl sm:text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter text-white font-extrabold inline-block hover:opacity-80 transition-opacity duration-300 break-all sm:break-normal"
            style={{ lineHeight: '0.9' }}
          >
            {email}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center"
        >
          <button
            type="button"
            onClick={copyToClipboard}
            className="text-sm font-light text-white border border-white/20 rounded-full px-4 py-2 hover:bg-white hover:text-black transition-all duration-300 ease-out"
          >
            {copied ? 'Email Address Copied' : 'Copy Email Address'}
          </button>
        </motion.div>
      </div>
    </section>
  )
}

