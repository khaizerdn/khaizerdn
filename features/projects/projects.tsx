'use client'

import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { useProjects } from '@/lib/projects-context'
import styles from './projects.module.css'

type ContentItem = 
  | { type: 'paragraph'; content: string }
  | { type: 'image'; src: string; alt: string }

type Project = {
  name: string
  year: string
  content: string | ContentItem[]
}

const projects: Project[] = [
  { 
    name: 'Doxion', 
    year: '2025', 
    content: [
      { type: 'paragraph', content: 'A modern document management system with advanced collaboration features designed for teams of all sizes.' },
      { type: 'paragraph', content: 'Built with cutting-edge technology, Doxion enables seamless document sharing, real-time editing, and intelligent version control. The platform supports over 50 file formats and integrates with popular productivity tools.' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop', alt: 'Doxion dashboard interface' },
      { type: 'paragraph', content: 'Key features include advanced search capabilities, automated workflow management, and enterprise-grade security. The intuitive interface makes it easy for users to organize, collaborate, and manage their documents efficiently.' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop', alt: 'Document collaboration view' },
      { type: 'paragraph', content: 'The system includes AI-powered document analysis, smart tagging, and automated categorization. Teams can work together in real-time with conflict resolution and comprehensive audit trails.' },
    ]
  },
  { 
    name: 'Tweetheart', 
    year: '2025', 
    content: [
      { type: 'paragraph', content: 'A comprehensive social media analytics platform that helps users understand their audience and optimize their content strategy.' },
      { type: 'paragraph', content: 'Tweetheart provides real-time analytics, sentiment analysis, and engagement metrics across multiple social media platforms. The dashboard offers actionable insights to improve content performance and grow your online presence.' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop', alt: 'Social media analytics dashboard' },
      { type: 'paragraph', content: 'The platform includes advanced features like competitor analysis, trend prediction, and automated reporting. With customizable dashboards and detailed analytics, users can make data-driven decisions to enhance their social media strategy.' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop', alt: 'Analytics charts and graphs' },
      { type: 'paragraph', content: 'Additional capabilities include influencer tracking, hashtag performance analysis, and optimal posting time recommendations. The platform supports scheduling, content suggestions, and cross-platform campaign management.' },
    ]
  },
]

// Helper to get images from project content
const getProjectImages = (project: Project): string[] => {
  if (typeof project.content === 'string') return []
  return project.content
    .filter((item): item is { type: 'image'; src: string; alt: string } => item.type === 'image')
    .map(item => item.src)
}

function ProjectPreview({ images, initialX, initialY, projectName }: { images: string[], initialX: number, initialY: number, projectName: string }) {
  const x = useMotionValue(initialX)
  const y = useMotionValue(initialY)
  
  // Smooth spring animation for cursor following
  // stiffness 150, damping 15 gives a nice smooth "delay" feel
  // lower stiffness = more "lag/floaty", higher damping = less bounce
  const springConfig = { damping: 20, stiffness: 100, mass: 0.8 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [x, y])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, x: 80, y: -300 }}
      animate={{ opacity: 1, scale: 1, x: 80, y: -300 }}
      exit={{ opacity: 0, scale: 0.9, x: 80, y: -300 }}
      transition={{ type: "spring", duration: 0.4, bounce: 0 }}
      className={styles.hoverPreview}
      style={{
        left: springX,
        top: springY,
      }}
    >
      <div className={styles.previewFrame}>
        {images.slice(0, 1).map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`${projectName} preview`}
            className={styles.previewImage}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const { openProjects, setOpenProjects } = useProjects()
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [initialMousePosition, setInitialMousePosition] = useState({ x: 0, y: 0 })
  const [mounted, setMounted] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check if device is touch-enabled (mobile/tablet)
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])


  const handleProjectClick = (projectName: string) => {
    setOpenProjects(prev => {
      const newSet = new Set(prev)
      if (newSet.has(projectName)) {
        newSet.delete(projectName)
      } else {
        newSet.add(projectName)
      }
      return newSet
    })
  }

  return (
    <section id="projects" className={styles.section}>
      <div className={styles.content}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={styles.header}
        >
          <h2 className={styles.title}>PROJECTS</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className={styles.projectsContainer}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              id={`project-${project.name.toLowerCase()}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '200px 0px' }}
              transition={{ duration: 0.6, delay: Math.min(index * 0.05, 1), ease: [0.22, 1, 0.36, 1] }}
              className={styles.projectWrapper}
              data-open={openProjects.has(project.name)}
            >
              <div
                className={styles.projectItem}
                onClick={() => handleProjectClick(project.name)}
                onMouseEnter={(e) => {
                  if (isTouchDevice) return
                  const images = getProjectImages(project)
                  if (images.length > 0) {
                    setHoveredProject(project.name)
                    setInitialMousePosition({ x: e.clientX, y: e.clientY })
                  }
                }}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <span className={styles.projectName}>{project.name}</span>
                <span className={styles.projectYear}>{project.year}</span>
              </div>
              <AnimatePresence>
                {openProjects.has(project.name) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ 
                      duration: 0.4, 
                      ease: [0.22, 1, 0.36, 1],
                      height: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                      opacity: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
                    }}
                    className={styles.projectContent}
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className={styles.contentWrapper}
                    >
                      {typeof project.content === 'string' ? (
                        <p>{project.content}</p>
                      ) : (
                        project.content.map((item, idx) => (
                          <div key={idx}>
                            {item.type === 'paragraph' ? (
                              <p className={styles.contentParagraph}>{item.content}</p>
                            ) : (
                              <motion.img
                                src={item.src}
                                alt={item.alt}
                                className={styles.contentImage}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.2 + idx * 0.1 }}
                                loading="lazy"
                              />
                            )}
                          </div>
                        ))
                      )}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {mounted && createPortal(
        <AnimatePresence>
          {hoveredProject && !openProjects.has(hoveredProject) && (() => {
            const project = projects.find(p => p.name === hoveredProject)
            if (!project) return null
            const images = getProjectImages(project)
            if (images.length === 0) return null
            
            return (
              <ProjectPreview
                key="preview"
                images={images}
                initialX={initialMousePosition.x}
                initialY={initialMousePosition.y}
                projectName={project.name}
              />
            )
          })()}
        </AnimatePresence>,
        document.body
      )}
    </section>
  )
}

