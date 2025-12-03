'use client'

import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, MapPin } from 'lucide-react'

const contactMethods = [
  {
    icon: Mail,
    label: 'Email',
    value: 'your.email@example.com',
    href: 'mailto:your.email@example.com',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/khaizerdn',
    href: 'https://github.com/khaizerdn',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/khaizerdn',
    href: 'https://linkedin.com/in/khaizerdn',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Available Worldwide',
    href: null,
  },
]

export default function Contact() {
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
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
            I'm always open to discussing new projects, creative ideas, or opportunities
            to be part of your visions. Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactMethods.map((method, index) => {
            const Icon = method.icon
            const content = (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 text-center ${
                  method.href ? 'cursor-pointer hover:scale-[1.02]' : ''
                }`}
              >
                <div className="inline-flex p-4 rounded-xl bg-white text-black mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={22} />
                </div>
                <h3 className="text-lg font-bold mb-2 text-white tracking-tight">
                  {method.label}
                </h3>
                <p className="text-gray-400 text-sm font-light">{method.value}</p>
              </motion.div>
            )

            return method.href ? (
              <a
                key={method.label}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {content}
              </a>
            ) : (
              <div key={method.label}>{content}</div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 mb-4 text-sm font-light">
            Prefer to use a contact form? You can integrate{' '}
            <a
              href="https://formspree.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 underline transition-colors"
            >
              Formspree
            </a>
            ,{' '}
            <a
              href="https://getform.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 underline transition-colors"
            >
              GetForm
            </a>
            , or{' '}
            <a
              href="https://www.netlify.com/products/forms/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-300 underline transition-colors"
            >
              Netlify Forms
            </a>
            .
          </p>
        </motion.div>
      </div>
    </section>
  )
}

