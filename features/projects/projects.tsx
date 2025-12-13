'use client'

import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useProjects } from '@/lib/projects-context'
import styles from './projects.module.css'

// Import all DOxion images
import doxion1 from './assets/doxion/1.png'
import doxion2 from './assets/doxion/2.png'
import doxion3 from './assets/doxion/3.png'
import doxion4 from './assets/doxion/4.png'
import doxion5 from './assets/doxion/5.png'
import doxion6 from './assets/doxion/6.png'
import doxion7 from './assets/doxion/7.png'
import doxion8 from './assets/doxion/8.png'
import doxion9 from './assets/doxion/9.png'
import doxion10 from './assets/doxion/10.png'
import doxion11 from './assets/doxion/11.png'
import doxion12 from './assets/doxion/12.png'
import doxion13 from './assets/doxion/13.jpg'
import doxion14 from './assets/doxion/14.jpg'
import doxion15 from './assets/doxion/15.jpg'
import doxion16 from './assets/doxion/16.jpg'
import doxion18 from './assets/doxion/18.png'
import doxionMobile from './assets/doxion/mobile.png'
import doxionPrototype from './assets/doxion/prototype.jpg'
import doxionMain from './assets/doxion/main.jpg'

const doxionImages: string[] = [
  doxion1, doxion2, doxion3, doxion4, doxion5, doxion6, doxion7, doxion8, doxion9, doxion10,
  doxion11, doxion12, doxion13, doxion14, doxion15, doxion16, doxion18,
  doxionMobile, doxionPrototype, doxionMain
].map(img => (typeof img === 'string' ? img : (img as any).src || String(img))) as string[]

type ContentItem = 
  | { type: 'paragraph'; content: string }
  | { type: 'image'; src: string | any; alt: string }
  | { type: 'imageSlider'; images: string[]; alt: string }
  | { type: 'badges'; technologies: string[] }
  | { type: 'link'; url: string; text: string }

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
      { type: 'paragraph', content: 'A React-based web application for document submission system of Cavite State University, integrated with kiosk interfaces and scalable smart lockers powered by Raspberry Pi and ESP8266, significantly improving operational efficiency and user experience for students and faculty.' },
      { type: 'imageSlider', images: doxionImages, alt: 'Doxion application interface' },
      { type: 'badges', technologies: ['React', 'Node.js', 'MySQL', 'C++', 'Raspberry Pi 4B', 'ESP8266', 'HTML5', 'CSS3', 'JavaScript'] },
      { type: 'link', url: 'https://github.com/khaizerdn/Doxion', text: 'View on GitHub' },
    ]
  },
  { 
    name: 'Shield', 
    year: '2025', 
    content: [
      { type: 'paragraph', content: 'Coming soon...' },
    ]
  },
  { 
    name: 'Winzer', 
    year: '2025', 
    content: [
      { type: 'paragraph', content: 'Coming soon...' },
    ]
  },
  { 
    name: 'Shuttlecav', 
    year: '2025', 
    content: [
      { type: 'paragraph', content: 'Coming soon...' },
    ]
  },
  { 
    name: 'Fizer', 
    year: '2025', 
    content: [
      { type: 'paragraph', content: 'Coming soon...' },
    ]
  },
]

// Helper to get images from project content
const getProjectImages = (project: Project): string[] => {
  if (typeof project.content === 'string') return []
  const images: string[] = []
  project.content.forEach(item => {
    if (item.type === 'image') {
      images.push(typeof item.src === 'string' ? item.src : item.src.src || item.src)
    } else if (item.type === 'imageSlider') {
      images.push(...item.images)
    }
  })
  return images
}

// Image Slider Component
function ImageSlider({ images, alt }: { images: string[]; alt: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    
    const diff = touchStartX.current - touchEndX.current
    const minSwipeDistance = 50

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        goToNext()
      } else {
        goToPrevious()
      }
    }
    
    touchStartX.current = null
    touchEndX.current = null
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
      }
      if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [images.length])

  return (
    <div 
      className={styles.imageSlider}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.sliderContainer}>
        <div className={styles.sliderImageWrapper}>
          <AnimatePresence initial={false}>
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`${alt} - Image ${currentIndex + 1}`}
              className={styles.sliderImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              loading="lazy"
            />
          </AnimatePresence>
        </div>
        
        {images.length > 1 && (
          <>
            <button
              className={styles.sliderButton}
              onClick={goToPrevious}
              aria-label="Previous image"
              style={{ opacity: isHovered ? 1 : 0 }}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className={`${styles.sliderButton} ${styles.sliderButtonRight}`}
              onClick={goToNext}
              aria-label="Next image"
              style={{ opacity: isHovered ? 1 : 0 }}
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>
      
      {images.length > 1 && (
        <div className={styles.sliderIndicators}>
          {images.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${index === currentIndex ? styles.indicatorActive : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
      
      {images.length > 1 && (
        <div className={styles.sliderCounter}>
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  )
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
                            ) : item.type === 'image' ? (
                              <motion.img
                                src={typeof item.src === 'string' ? item.src : item.src.src || item.src}
                                alt={item.alt}
                                className={styles.contentImage}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.2 + idx * 0.1 }}
                                loading="lazy"
                              />
                            ) : item.type === 'imageSlider' ? (
                              <ImageSlider images={item.images} alt={item.alt} />
                            ) : item.type === 'badges' ? (
                              <div className={styles.badgesContainer}>
                                {item.technologies.map((tech, techIdx) => (
                                  <span key={techIdx} className={styles.badge}>
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            ) : item.type === 'link' ? (
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.projectLink}
                              >
                                {item.text} →
                              </a>
                            ) : null}
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

