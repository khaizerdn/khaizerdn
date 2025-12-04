'use client'

import { useState } from 'react'
import SimpleCardLayout from '@/layouts/SimpleCardLayout'
import type { SimpleCardItem } from '@/layouts/SimpleCardLayout'
import doxionImage from './assets/Doxion.png'
import doxionImage1 from './assets/Doxion1.png'
import doxionImage3 from './assets/Doxion3.jpg'
import doxionImage4 from './assets/Doxion4.jpg'

// Data is inside this component
const projectsData: SimpleCardItem[] = [
  {
    title: 'Doxion',
    description:
      'A document submission system of Cavite State University, integrated with kiosk interfaces and scalable smart lockers powered by Raspberry Pi and ESP8266, significantly improving operational efficiency for students and faculty.',
    technologies: [
      'React',
      'Node.js',
      'MySQL',
      'C++',
      'Raspberry Pi 4B',
      'ESP8266',
      'HTML5',
      'CSS3',
      'JavaScript',
    ],
    github: 'https://github.com/khaizerdn/Doxion',
    images: [doxionImage.src, doxionImage1.src, doxionImage3.src, doxionImage4.src],
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

