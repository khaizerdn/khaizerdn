'use client'

import ParagraphAndContainerLayout from '@/layouts/ParagraphAndContainerLayout'
import type { Feature } from '@/layouts/ParagraphAndContainerLayout'
import { Code, Coffee, Rocket } from 'lucide-react'

// Data is inside this component
const aboutContent = {
  title: 'Passionate Software Engineer',
  paragraphs: [
    "I'm a software engineer passionate about creating exceptional digital experiences. With expertise in modern web technologies, I specialize in building responsive, performant applications that solve real-world problems.",
    "My journey in software development has been driven by curiosity and a commitment to continuous learning. I enjoy working with cutting-edge technologies and contributing to open-source projects.",
    "When I'm not coding, you can find me exploring new technologies, reading tech blogs, or contributing to the developer community.",
  ],
}

const features: Feature[] = [
  {
    icon: Code,
    title: 'Clean Code',
    description: 'Writing maintainable and scalable code following best practices.',
  },
  {
    icon: Rocket,
    title: 'Performance',
    description: 'Building fast and efficient applications optimized for speed.',
  },
  {
    icon: Coffee,
    title: 'Problem Solving',
    description: 'Turning complex problems into elegant solutions.',
  },
]

export default function ProgrammingAbout() {
  return (
    <ParagraphAndContainerLayout
      title="About Me"
      description=""
      content={aboutContent}
      features={features}
      id="about"
    />
  )
}

