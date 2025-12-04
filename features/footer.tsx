'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="py-12 md:py-16 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="mb-3 text-sm font-light text-white">
            © {new Date().getFullYear()} khaizerdn. All rights reserved.
          </p>
          <p className="text-xs text-white/70 font-light tracking-wide">
            Thank you for visiting. Let's create something amazing together.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

