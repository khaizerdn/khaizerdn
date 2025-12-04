import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/lib/smooth-scroll'
import { ThemeProvider } from '@/lib/theme-context'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'khaizerdn',
  description: "Hi, I'm Khaizer, a software engineer passionate about building innovative solutions and creating meaningful digital experiences.",
  keywords: ['portfolio', 'software engineer', 'web developer', 'next.js', 'react'],
  authors: [{ name: 'khaizerdn' }],
  openGraph: {
    title: 'khaizerdn',
    description: "Hi, I'm Khaizer, a software engineer passionate about building innovative solutions and creating meaningful digital experiences.",
    type: 'website',
    images: [
      {
        url: '/og-image.jpg', // Place your image at public/og-image.jpg
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
    images: ['/og-image.jpg'], // Same image for Twitter
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
        <ThemeProvider>
          <SmoothScroll />
          <main className="min-h-screen">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}

