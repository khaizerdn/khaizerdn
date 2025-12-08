import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/lib/smooth-scroll'
import { ThemeProvider } from '@/lib/theme-context'
import { ProjectsProvider } from '@/lib/projects-context'
import { CertificatesProvider } from '@/lib/certificates-context'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const siteUrl = process.env.NODE_ENV === 'production' 
  ? 'https://khaizerdn.github.io/khaizerdn' 
  : 'http://localhost:3000'

export const metadata: Metadata = {
  title: 'khaizerdn',
  description: "Hi, I'm Khaizer, a software engineer passionate about building innovative solutions and creating meaningful digital experiences.",
  keywords: ['portfolio', 'software engineer', 'web developer', 'next.js', 'react'],
  authors: [{ name: 'khaizerdn' }],
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: 'khaizerdn',
    description: "Hi, I'm Khaizer, a software engineer passionate about building innovative solutions and creating meaningful digital experiences.",
    type: 'website',
    url: siteUrl,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'khaizerdn - Software Engineer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'khaizerdn',
    description: "Hi, I'm Khaizer, a software engineer passionate about building innovative solutions and creating meaningful digital experiences.",
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} style={{ fontFamily: inter.style.fontFamily }}>
      <body style={{ fontFamily: inter.style.fontFamily }}>
        <ThemeProvider>
        <ProjectsProvider>
        <CertificatesProvider>
        <SmoothScroll />
        <main className="main-layout">
          <div className="main-content">
            {children}
          </div>
        </main>
        </CertificatesProvider>
        </ProjectsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

