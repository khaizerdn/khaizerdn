'use client'

import { motion } from 'framer-motion'

export default function Contact() {
  const email = 'khaizerdn@gmail.com'
  
  // Gmail compose URL with pre-filled recipient
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`

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
          className="text-center px-4 mb-16"
        >
          <span
            className="text-2xl sm:text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter text-white font-extrabold inline-block break-all sm:break-normal"
            style={{ lineHeight: '0.9' }}
          >
            {email}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-16"
        >
          <a
            href={gmailComposeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg md:text-xl font-light text-white border-2 border-white/20 rounded-full px-8 py-4 hover:bg-white hover:text-black transition-all duration-300 ease-out inline-block"
          >
            Send Email
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
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
    </section>
  )
}

