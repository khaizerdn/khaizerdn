'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

export interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

interface ParagraphAndContainerLayoutProps {
  title: string
  description?: string
  content: {
    title: string
    paragraphs: string[]
  }
  features?: Feature[]
  id?: string
}

export default function ParagraphAndContainerLayout({
  title,
  content,
  features,
  id = 'section',
}: ParagraphAndContainerLayoutProps) {
  return (
    <section id={id} className="py-20 md:py-32 bg-white">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            <span className="text-gray-900">{title}</span>
          </h2>
          <div className="w-16 h-px bg-gray-300 mx-auto"></div>
        </motion.div>

        <div className={features && features.length > 0 ? "grid md:grid-cols-2 gap-12 items-start mb-16" : "mb-16"}>
          <motion.div
            initial={{ opacity: 0, x: features && features.length > 0 ? -20 : 0 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className={`flex flex-col h-full ${features && features.length > 0 ? '' : 'max-w-3xl mx-auto text-center'}`}
          >
            {content.title && (
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 tracking-tight">{content.title}</h3>
            )}
            <div className="flex-grow">
              {content.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-gray-700 mb-5 leading-relaxed text-lg font-light">
                  {paragraph}
                </p>
              ))}
            </div>
            {features && features.length > 0 && <div className="w-16 h-px bg-gray-300 mt-auto"></div>}
          </motion.div>

          {features && features.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="grid grid-cols-1 gap-6"
            >
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.05 }}
                    className="group p-8 rounded-2xl bg-gray-50 backdrop-blur-sm border border-gray-200 hover:border-gray-300 hover:bg-gray-100 transition-all duration-300"
                  >
                    <div className="flex items-start gap-5">
                      <div className="p-3 rounded-xl bg-gray-900 text-white shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <Icon size={22} />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold mb-2 text-gray-900 tracking-tight">{feature.title}</h4>
                        <p className="text-gray-700 font-light leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

