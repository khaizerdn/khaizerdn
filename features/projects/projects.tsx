'use client'

import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
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
  { 
    name: 'Nexus', 
    year: '2024', 
    content: [
      { type: 'paragraph', content: 'A professional networking platform connecting professionals across industries and facilitating meaningful career connections.' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop', alt: 'Professional networking interface' },
      { type: 'paragraph', content: 'Nexus offers intelligent matching algorithms, industry-specific communities, and virtual networking events. The platform helps professionals expand their network, discover opportunities, and advance their careers.' },
      { type: 'paragraph', content: 'Features include skill verification, mentorship matching, job recommendations, and industry insights. Users can join specialized groups, attend virtual events, and connect with thought leaders in their field.' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop', alt: 'Networking event interface' },
      { type: 'paragraph', content: 'The platform also provides career development resources, salary insights, and personalized learning paths. With advanced privacy controls and verified profiles, Nexus ensures a professional and secure networking environment.' },
    ]
  },
  { 
    name: 'Flowstate', 
    year: '2024', 
    content: [
      { type: 'paragraph', content: 'A productivity app designed to help users achieve deep focus and flow state through intelligent time management and distraction blocking.' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop', alt: 'Flowstate productivity interface' },
      { type: 'paragraph', content: 'Features include Pomodoro timers, ambient soundscapes, progress tracking, and personalized productivity insights. Flowstate helps users maintain focus and accomplish their most important work.' },
      { type: 'paragraph', content: 'The app includes distraction blocking, website filtering, and app usage monitoring. Users can set focus sessions, track their productivity patterns, and receive personalized recommendations for optimal work schedules.' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop', alt: 'Productivity tracking dashboard' },
      { type: 'paragraph', content: 'Advanced features include team collaboration tools, shared focus sessions, and productivity analytics. The app integrates with popular calendar and task management tools for seamless workflow integration.' },
    ]
  },
  { 
    name: 'Aurora', 
    year: '2024', 
    content: [
      { type: 'paragraph', content: 'A beautiful weather app with stunning visualizations, detailed forecasts, and location-based weather alerts.' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop', alt: 'Weather app interface' },
      { type: 'paragraph', content: 'Aurora provides hyperlocal weather data, interactive maps, and beautiful animations that make checking the weather a delightful experience. The app includes detailed forecasts, severe weather warnings, and historical weather data.' },
      { type: 'paragraph', content: 'The app features customizable widgets, multiple location tracking, and detailed meteorological information. Users can view radar maps, satellite imagery, and detailed hourly forecasts with precision.' },
      { type: 'image', src: 'https://images.unsplash.com/photo-1594736797933-d0cbc0c0e0a8?w=800&h=600&fit=crop', alt: 'Weather visualization and forecasts' },
      { type: 'paragraph', content: 'Additional features include UV index tracking, air quality monitoring, and personalized weather notifications. The app supports multiple units, dark mode, and accessibility features for all users.' },
    ]
  },
  { name: 'Catalyst', year: '2023', content: 'An innovation platform for startups and entrepreneurs.' },
  { name: 'Prism', year: '2023', content: 'A design tool for creating beautiful color palettes and gradients.' },
  { name: 'Echo', year: '2023', content: 'A voice recording and transcription app with AI-powered features.' },
  { name: 'Lumina', year: '2025', content: 'An AI-powered photo editing tool with advanced filters and effects.' },
  { name: 'Vortex', year: '2025', content: 'A real-time collaboration platform for remote teams.' },
  { name: 'Spectra', year: '2024', content: 'A music streaming service with personalized recommendations.' },
  { name: 'Zenith', year: '2024', content: 'A fitness tracking app with comprehensive workout analytics.' },
  { name: 'Nova', year: '2024', content: 'A cryptocurrency portfolio tracker with real-time market data.' },
  { name: 'Pulse', year: '2024', content: 'A health monitoring app that tracks vital signs and wellness metrics.' },
  { name: 'Stellar', year: '2024', content: 'A space exploration game with realistic physics and graphics.' },
  { name: 'Quantum', year: '2023', content: 'A quantum computing simulator for educational purposes.' },
  { name: 'Fusion', year: '2023', content: 'A recipe sharing platform with meal planning features.' },
  { name: 'Atlas', year: '2023', content: 'A travel planning app with interactive maps and itineraries.' },
  { name: 'Orbit', year: '2023', content: 'A satellite tracking application with real-time orbital data.' },
  { name: 'Phoenix', year: '2023', content: 'A task management system with AI-powered prioritization.' },
  { name: 'Titan', year: '2023', content: 'A cloud storage solution with end-to-end encryption.' },
  { name: 'Apex', year: '2022', content: 'A competitive gaming platform with tournament management.' },
  { name: 'Neon', year: '2022', content: 'A code editor with advanced syntax highlighting and debugging.' },
  { name: 'Matrix', year: '2022', content: 'A data visualization tool for complex datasets.' },
  { name: 'Vector', year: '2022', content: 'A vector graphics editor with professional design tools.' },
  { name: 'Pixel', year: '2022', content: 'A pixel art creation tool with animation support.' },
  { name: 'Flux', year: '2022', content: 'A time tracking application for freelancers and teams.' },
  { name: 'Nimbus', year: '2022', content: 'A cloud-based file synchronization service.' },
  { name: 'Radar', year: '2022', content: 'A location-based social networking app.' },
  { name: 'Terra', year: '2021', content: 'An environmental monitoring platform tracking climate data.' },
  { name: 'Cipher', year: '2021', content: 'A secure messaging app with encryption protocols.' },
  { name: 'Mirage', year: '2021', content: 'A virtual reality experience platform.' },
  { name: 'Sage', year: '2021', content: 'An AI-powered learning management system.' },
  { name: 'Vivid', year: '2021', content: 'A video editing software with professional features.' },
  { name: 'Zephyr', year: '2021', content: 'A lightweight web browser with privacy focus.' },
  { name: 'Cascade', year: '2021', content: 'A waterfall project management methodology tool.' },
  { name: 'Horizon', year: '2021', content: 'A sunset and sunrise tracking application.' },
  { name: 'Infinity', year: '2020', content: 'A mathematical visualization tool for complex equations.' },
  { name: 'Jupiter', year: '2020', content: 'A planetarium app with detailed celestial information.' },
  { name: 'Karma', year: '2020', content: 'A habit tracking app with gamification elements.' },
  { name: 'Lunar', year: '2020', content: 'A moon phase calendar with astronomical data.' },
  { name: 'Momentum', year: '2020', content: 'A personal finance tracker with budgeting tools.' },
  { name: 'Nebula', year: '2020', content: 'A space photography gallery and sharing platform.' },
  { name: 'Oracle', year: '2020', content: 'A predictive analytics dashboard for business intelligence.' },
  { name: 'Paradox', year: '2019', content: 'A puzzle game with mind-bending challenges.' },
  { name: 'Quasar', year: '2019', content: 'A high-performance database management system.' },
  { name: 'Radiant', year: '2019', content: 'A lighting design tool for architects and designers.' },
  { name: 'Sapphire', year: '2019', content: 'A gemstone identification and cataloging app.' },
  { name: 'Tempo', year: '2019', content: 'A music tempo detection and BPM analyzer.' },
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
  const [openProjects, setOpenProjects] = useState<Set<string>>(new Set())
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [initialMousePosition, setInitialMousePosition] = useState({ x: 0, y: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
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
          <p className={styles.description}>
            A collection of my recent work and side projects, showcasing my skills in web development and design.
          </p>
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

