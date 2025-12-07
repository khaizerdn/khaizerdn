'use client'

import { motion } from 'framer-motion'

export default function Contact() {
  const email = 'khaizerdn@gmail.com'
  
  // Gmail compose URL with pre-filled recipient
  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`

  return (
    <section id="contact" className="pt-20 md:pt-32 pb-16 bg-white">
      <div className="max-w-[700px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            <span className="text-gray-900">
              Get In Touch
            </span>
          </h2>
          <div className="w-16 h-px bg-gray-300 mx-auto mb-6"></div>
          <p className="text-gray-700 max-w-2xl mx-auto text-lg font-light">
            I'm always open to discussing new projects, creative ideas, or opportunities
            to be part of your visions. Feel free to reach out!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="px-4 mb-16 flex justify-center"
        >
          <span
            className="text-2xl sm:text-4xl md:text-6xl lg:text-8xl font-bold tracking-normal text-gray-900 font-extrabold break-all sm:break-normal text-center"
            style={{ lineHeight: '0.9' }}
          >
            {email}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center"
        >
          <a
            href={gmailComposeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg md:text-xl font-light text-gray-700 border-2 border-gray-300 rounded-full px-8 py-4 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300 ease-out inline-block"
          >
            Send Email
          </a>
        </motion.div>
      </div>
    </section>
  )
}

