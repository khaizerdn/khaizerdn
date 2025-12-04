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
    description: 'Participated in the LaunchPad Competition showcasing innovative solutions.',
    logo: whitecloakLogo.src,
    images: [whitecloakLaunchPadPath],
  },
  {
    title: '5th Student Research Congress',
    issuer: 'Cavite State University of Carmona',
    issuerUrl: 'https://carmona.cvsu.edu.ph',
    year: '2025',
    description:
      'Presented the research paper titled "DOXION: Digital Locker for Document Submission Management at Cavite State University - Carmona Campus"',
    logo: cvsuCarmonaLogo.src,
    images: [
      studentResearchCongress1.src,
      studentResearchCongress2.src,
      studentResearchCongress3.src,
    ],
  },
  {
    title: 'Internship',
    issuer: 'CREOTEC Philippines Inc.',
    issuerUrl: 'https://www.facebook.com/profile.php?id=100064414875970',
    year: '2024',
    description: 'Participated in the LaunchPad Competition showcasing innovative solutions.',
    logo: creotecLogo.src,
    images: [creotecInternship.src],
  },
  {
    title: 'Introduction to Firebase as a Backend for React Applications',
    issuer: 'University of Caloocan City',
    issuerUrl: 'https://ucc-caloocan.edu.ph/',
    year: '2025',
    description:
      'Participated in the "Introduction to Firebase as a Backend for React Applications" webinar.',
    logo: universityOfCaloocanLogo.src,
    images: [universityOfCaloocan.src],
  },
  {
    title: 'Introducing Design Thinking and the SDGs to Engineering Students',
    issuer: 'Philippine Association of Engineering Schools (PAES)',
    issuerUrl: 'http://paesphil.org/',
    year: '2025',
    description:
      'Attended the PAES webinar entitled "Introducing Design Thinking and the SDGs to Engineering Students."',
    logo: paesLogo.src,
    images: [paes.src],
  },
  {
    title: 'Submarine Cable System',
    issuer: 'Terra Hertz',
    issuerUrl: 'https://www.terrahertz.net/',
    year: '2025',
    description:
      'Participated in the live webinar by Terra Hertz entitled "Submarine Cable System".',
    logo: terraHertzLogo.src,
    images: [terraHertz.src],
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
]

export default function ProgrammingCertificates() {
  const [showAll, setShowAll] = useState(false)
  const visibleCertificates = showAll ? certificatesData : certificatesData.slice(0, 6)
  const remaining = certificatesData.length - visibleCertificates.length

  return (
    <SimpleCardWithIconLayout
      title="Certificates"
      description="Certifications and achievements in software development"
      items={visibleCertificates}
      id="certificates"
      showAll={showAll}
      onShowMore={remaining > 0 ? () => setShowAll(true) : undefined}
      remaining={remaining}
    />
  )
}

