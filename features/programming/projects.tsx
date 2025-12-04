'use client'

import { useState } from 'react'
import SimpleCardLayout from '@/layouts/SimpleCardLayout'
import type { SimpleCardItem } from '@/layouts/SimpleCardLayout'

// Data is inside this component
const projectsData: SimpleCardItem[] = [
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

export default function ProgrammingProjects() {
  const [showAll, setShowAll] = useState(false)
  const visibleProjects = showAll ? projectsData : projectsData.slice(0, 6)
  const remaining = projectsData.length - visibleProjects.length

  return (
    <SimpleCardLayout
      title="Projects"
      description="A collection of projects showcasing my programming expertise"
      items={visibleProjects}
      id="projects"
      showAll={showAll}
      onShowMore={remaining > 0 ? () => setShowAll(true) : undefined}
      remaining={remaining}
    />
  )
}

