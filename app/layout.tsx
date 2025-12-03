import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'
import SmoothScroll from '@/components/SmoothScroll'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'khaizerdn | Software Engineer Portfolio',
  description: 'Personal portfolio website showcasing projects, skills, and experience as a software engineer.',
  keywords: ['portfolio', 'software engineer', 'web developer', 'next.js', 'react'],
  authors: [{ name: 'khaizerdn' }],
  openGraph: {
    title: 'khaizerdn | Software Engineer Portfolio',
    description: 'Personal portfolio website showcasing projects, skills, and experience.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'khaizerdn | Software Engineer Portfolio',
    description: 'Personal portfolio website showcasing projects, skills, and experience.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <SmoothScroll />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

