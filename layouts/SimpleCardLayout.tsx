'use client'

import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'

export interface SimpleCardItem {
  title: string
  description: string
  technologies?: string[]
  github?: string
  live?: string
  image?: string
}

interface SimpleCardLayoutProps {
  title: string
  description: string
  items: SimpleCardItem[]
  id?: string
  showAll?: boolean
  onShowMore?: () => void
  remaining?: number
}

export default function SimpleCardLayout({
  title,
  description,
  items,
  id = 'section',
  showAll = false,
  onShowMore,
  remaining = 0,
}: SimpleCardLayoutProps) {
  const visibleItems = showAll ? items : items.slice(0, 6)

  return (
    <section id={id} className="py-20 md:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            <span className="text-white">{title}</span>
          </h2>
          <div className="w-16 h-px bg-white/30 mx-auto mb-6"></div>
          <p className="text-white max-w-2xl mx-auto text-lg font-light">{description}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-white/20 hover:bg-white/10 transition-all duration-300 overflow-hidden"
            >
              <div className="relative h-56 bg-white/5 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent group-hover:from-white/20 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/30 text-xs font-light tracking-wider uppercase">
                    {item.image ? 'IMAGE' : 'NO IMAGE PROVIDED'}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold mb-3 text-white tracking-tight">{item.title}</h3>
                <p className="text-white mb-5 text-sm leading-relaxed font-light">{item.description}</p>
                {item.technologies && item.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 text-xs font-medium bg-white text-black rounded-full tracking-wide"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                {(item.github || item.live) && (
                  <div className="flex gap-6">
                    {item.github && (
                      <a
                        href={item.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-white transition-colors duration-200 font-light group/link"
                      >
                        <Github size={16} className="group-hover/link:scale-110 transition-transform" />
                        <span>Code</span>
                      </a>
                    )}
                    {item.live && (
                      <a
                        href={item.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-white transition-colors duration-200 font-light group/link"
                      >
                        <ExternalLink size={16} className="group-hover/link:scale-110 transition-transform" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {remaining > 0 && onShowMore && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={onShowMore}
              className="text-sm font-light text-white border border-white/20 rounded-full px-4 py-2 hover:bg-white hover:text-black transition-all duration-300 ease-out"
            >
              Show More {remaining} Items
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

