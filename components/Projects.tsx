'use client'

import { motion } from 'framer-motion'
import { Github, ExternalLink } from 'lucide-react'

const projects = [
  {
    title: 'E-Commerce Platform',
    description:
      'A full-stack e-commerce platform built with Next.js, featuring user authentication, payment integration, and admin dashboard.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe'],
    github: 'https://github.com/khaizerdn/project-1',
    live: 'https://project-1-demo.com',
    image: '/api/placeholder/600/400',
  },
  {
    title: 'Task Management App',
    description:
      'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    github: 'https://github.com/khaizerdn/project-2',
    live: 'https://project-2-demo.com',
    image: '/api/placeholder/600/400',
  },
  {
    title: 'Weather Dashboard',
    description:
      'A beautiful weather dashboard with location-based forecasts, interactive maps, and detailed weather analytics.',
    technologies: ['React', 'Chart.js', 'OpenWeather API'],
    github: 'https://github.com/khaizerdn/project-3',
    live: 'https://project-3-demo.com',
    image: '/api/placeholder/600/400',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-20 md:py-32 bg-black">
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
              Featured Projects
            </span>
          </h2>
          <div className="w-16 h-px bg-white/30 mx-auto mb-6"></div>
          <p className="text-white max-w-2xl mx-auto text-lg font-light">
            A collection of projects showcasing my skills and experience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-white/20 hover:bg-white/10 transition-all duration-300 overflow-hidden"
            >
              <div className="relative h-56 bg-white/5 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent group-hover:from-white/20 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/30 text-xs font-light tracking-wider uppercase">
                    NO IMAGE PROVIDED
                  </span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold mb-3 text-white tracking-tight">
                  {project.title}
                </h3>
                <p className="text-white mb-5 text-sm leading-relaxed font-light">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-xs font-medium bg-white text-black rounded-full tracking-wide"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-6">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-white transition-colors duration-200 font-light group/link"
                  >
                    <Github size={16} className="group-hover/link:scale-110 transition-transform" />
                    <span>Code</span>
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-white transition-colors duration-200 font-light group/link"
                  >
                    <ExternalLink size={16} className="group-hover/link:scale-110 transition-transform" />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

