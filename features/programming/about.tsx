'use client'

import ParagraphAndContainerLayout from '@/layouts/ParagraphAndContainerLayout'

// Data is inside this component
const aboutContent = {
  title: '',
  paragraphs: [
    "A Cum Laude graduate with Bachelor's degree in Computer Engineering, skilled Full-Stack Developer, and experienced in cloud platforms such as AWS and Hetzner. With proven track record in building complete web, mobile, and desktop applications, with additional experience in game development using Unity and Lua.",
    "I believe in continuous learning, critical thinking, and the philosophy of Ikigai, finding what I love, what I'm good at, what the world needs, and what I can be paid for. I embrace continuous improvement and view problems as opportunities to create something better.",
  ],
}

export default function ProgrammingAbout() {
  return (
    <ParagraphAndContainerLayout
      title="Hi, I'm Khaizer!"
      description=""
      content={aboutContent}
      id="about"
    />
  )
}

