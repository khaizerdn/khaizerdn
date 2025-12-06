'use client'

import { motion } from 'framer-motion'

export interface RoadMapItem {
  title: string
  description: string
  date?: string
  icon?: string
}

interface RoadMapLayoutProps {
  title: string
  description: string
  items: RoadMapItem[]
  id?: string
}

export default function RoadMapLayout({
  title,
  description,
  items,
  id = 'section',
}: RoadMapLayoutProps) {
  return (
    <section id={id} className="py-20 md:py-32 bg-white">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            <span className="text-gray-900">{title}</span>
          </h2>
          <div className="w-16 h-px bg-gray-300 mx-auto mb-6"></div>
          <p className="text-gray-700 max-w-2xl mx-auto text-lg font-light">{description}</p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 transform md:-translate-x-1/2"></div>

          <div className="space-y-12">
            {items.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.15 + index * 0.05 }}
                className="relative flex items-start gap-8"
              >
                {/* Timeline dot */}
                <div className="relative z-10 flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-50 border-2 border-gray-300 flex items-center justify-center">
                  <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-gray-900"></div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <div className="bg-gray-50 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 md:p-8 hover:border-gray-300 hover:bg-gray-100 transition-all duration-300">
                    {item.date && (
                      <span className="text-gray-500 text-sm font-light mb-2 block">{item.date}</span>
                    )}
                    <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900 tracking-tight">{item.title}</h3>
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed font-light">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

