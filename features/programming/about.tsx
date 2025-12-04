'use client'

import ParagraphAndContainerLayout from '@/layouts/ParagraphAndContainerLayout'
import type { Feature } from '@/layouts/ParagraphAndContainerLayout'
import { Code, Coffee, Rocket } from 'lucide-react'

// Data is inside this component
const aboutContent = {
  title: 'Hi, I\'m Khaizer!',
  paragraphs: [
    "A Cum Laude graduate with Bachelor's degree in Computer Engineering, skilled Full-Stack Developer, and experienced in cloud platforms such as AWS and Hetzner. With proven track record in building complete web, mobile, and desktop applications, with additional experience in game development using Unity and Lua.",
    "I believe in continuous learning, critical thinking, and the philosophy of Ikigai, finding what I love, what I'm good at, what the world needs, and what I can be paid for. I embrace continuous improvement and view problems as opportunities to create something better.",
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

