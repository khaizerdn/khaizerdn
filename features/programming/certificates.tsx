'use client'

import { useState } from 'react'
import SimpleCardWithIconLayout from '@/layouts/SimpleCardWithIconLayout'
import type { SimpleCardWithIconItem } from '@/layouts/SimpleCardWithIconLayout'

// Helper function to get public asset path with basePath support
const getPublicAssetPath = (path: string): string => {
  const basePath = process.env.NODE_ENV === 'production' ? '/khaizerdn' : ''
  return `${basePath}/assets/features/programming/assets/${path}`
}

// Import all certificate images (except WhitecloakLaunchPad which has corrupted EXIF data)
import whitecloakLogo from './assets/whitecloak.jpg'
// WhitecloakLaunchPad.jpg has corrupted EXIF data, so we use it from public folder
const whitecloakLaunchPadPath = getPublicAssetPath('WhitecloakLaunchPad.jpg')
import cvsuCarmonaLogo from './assets/cvsucarmona.jpg'
import studentResearchCongress1 from './assets/5thStudentResearchCongress.jpg'
import studentResearchCongress2 from './assets/5thStudentResearchCongress1.jpg'
import studentResearchCongress3 from './assets/5thStudentResearchCongress2.jpg'
import creotecLogo from './assets/creotec.png'
import creotecInternship from './assets/CreotecInternship.jpg'
import universityOfCaloocanLogo from './assets/UniversityOfCaloocan1.png'
import universityOfCaloocan from './assets/UniversityOfCaloocan.jpg'
import paesLogo from './assets/PAES.png'
import paes from './assets/PAES1.jpg'
import terraHertzLogo from './assets/TerraHertz1.jpg'
import terraHertz from './assets/TerraHertz.jpg'
import globeTelecomLogo from './assets/GlobeTelecom.png'
import globeTelecom from './assets/GlobeTelecom.jpg'

// Data is inside this component
const certificatesData: SimpleCardWithIconItem[] = [
  {
    title: 'LaunchPad Competition',
    issuer: 'Whitecloak Technologies Inc.',
    issuerUrl: 'https://whitecloak.com',
    year: '2025',
    description: 'Successfully completing the LaunchPad Competition of White Cloak Technologies Inc. from October 27 - December 2,2025.',
    logo: whitecloakLogo.src,
    images: [whitecloakLaunchPadPath],
  },
  {
    title: 'Breakthrough: AI-driven Future of Manufacturing and Logistics Operations',
    issuer: 'Globe Telecom',
    issuerUrl: 'https://www.globe.com.ph/',
    year: '2025',
    description:
      'Attended and participated in Globe Business Breakthrough: AI-driven Future of Manufacturing and Logistics Operations.',
    logo: globeTelecomLogo.src,
    images: [globeTelecom.src],
  },
  {
    title: 'Internship',
    issuer: 'CREOTEC Philippines Inc.',
    issuerUrl: 'https://www.facebook.com/profile.php?id=100064414875970',
    year: '2024',
    description: 'Successfully completing his/her Two hundred forty hours (240 hours) of On-the-Job Training in Creotec Philippines Inc. relevant and related to his/her course, Bachelor of Science in Computer Engineering.',
    logo: creotecLogo.src,
    images: [creotecInternship.src],
  },
  {
    title: 'Introducing Design Thinking and the SDGs to Engineering Students',
    issuer: 'Philippine Association of Engineering Schools (PAES)',
    issuerUrl: 'http://paesphil.org/',
    year: '2025',
    description:
      'Attending the PAES webinar entitled, "Introducing Design Thinking and the SDGs to Engineering Students."',
    logo: paesLogo.src,
    images: [paes.src],
  },
  {
    title: '5th Student Research Congress',
    issuer: 'Cavite State University of Carmona',
    issuerUrl: 'https://carmona.cvsu.edu.ph',
    year: '2025',
    description:
      'Presenting their research paper titled "DOXION: Digital Locker for Document Submission Management at Cavite State University - Carmona Campus" in the 5h Student Research Congress under the Information and Communication Technology Session: Computer Engineering category.',
    logo: cvsuCarmonaLogo.src,
    images: [
      studentResearchCongress1.src,
      studentResearchCongress2.src,
      studentResearchCongress3.src,
    ],
  },
  {
    title: 'Introduction to Firebase as a Backend for React Applications',
    issuer: 'University of Caloocan City',
    issuerUrl: 'https://ucc-caloocan.edu.ph/',
    year: '2025',
    description:
      'Participating in the "Introduction to Firebase as a Backend for React Applications" webinar held via Google Meet on March 19, 2025.',
    logo: universityOfCaloocanLogo.src,
    images: [universityOfCaloocan.src],
  },
  {
    title: 'Submarine Cable System',
    issuer: 'Terra Hertz',
    issuerUrl: 'https://www.terrahertz.net/',
    year: '2025',
    description:
      'Participating in the Live Webinar by Terra Hertz entitled Submarine Cable System.',
    logo: terraHertzLogo.src,
    images: [terraHertz.src],
  },
]

export default function ProgrammingCertificates() {
  const [visibleCount, setVisibleCount] = useState(3)
  const totalCards = certificatesData.length
  const visibleCertificates = certificatesData.slice(0, visibleCount)
  const remaining = totalCards - visibleCount
  
  const handleShowMore = () => {
    // Reveal 3 cards at a time
    setVisibleCount(prev => Math.min(prev + 3, totalCards))
  }

  return (
    <SimpleCardWithIconLayout
      title="Certificates"
      description="Certifications and achievements in software development"
      items={visibleCertificates}
      id="certificates"
      showAll={visibleCount >= totalCards}
      onShowMore={remaining > 0 ? handleShowMore : undefined}
      remaining={remaining}
    />
  )
}

