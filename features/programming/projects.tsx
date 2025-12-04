'use client'

import { useState } from 'react'
import SimpleCardLayout from '@/layouts/SimpleCardLayout'
import type { SimpleCardItem } from '@/layouts/SimpleCardLayout'
import doxionImage from './assets/Doxion.png'
import doxionImage1 from './assets/Doxion1.png'
import doxionImage3 from './assets/Doxion3.jpg'
import doxionImage4 from './assets/Doxion4.jpg'
import tweetheartImage from './assets/Tweetheart.png'
import tweetheartImage1 from './assets/Tweetheart1.png'
import tweetheartImage2 from './assets/Tweetheart2.png'
import tweetheartImage3 from './assets/Tweetheart3.png'
import tweetheartImage4 from './assets/Tweetheart4.png'

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
  {
    title: 'Tweetheart',
    description:
      'A complete MVP dating application made during the Whitecloak LaunchPad Competition.',
    technologies: [
      'React',
      'React Router',
      'Axios',
      'Socket.IO Client',
      'CSS Modules',
      'Vite',
      'Node.js',
      'Express',
      'MariaDB',
      'JWT',
      'bcrypt',
      'Socket.IO',
      'Multer',
      'Sharp',
      'AWS SDK',
      'Nodemailer',
      'AWS S3',
    ],
    github: 'https://github.com/khaizerdn/Tweetheart',
    live: 'https://khaizerdn.github.io/Tweetheart/',
    images: [
      tweetheartImage.src,
      tweetheartImage1.src,
      tweetheartImage2.src,
      tweetheartImage3.src,
      tweetheartImage4.src,
    ],
  },
  {
    title: 'Shuttlecav',
    description:
      'A mobile application developed for residents of Carmona Estates to track transportation usage and manage credit loading. The system integrates with NFC cards, which are linked to the mobile app users account.',
    technologies: [
      'React',
      'React Native',
      'Expo',
      'Node.js',
      'MySQL',
      'Raspberry Pi 4B',
      'HTML5',
      'CSS3',
      'JavaScript',
    ],
    github: 'https://github.com/khaizerdn/Shuttlecav',
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

