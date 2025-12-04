'use client'

import { useEffect } from 'react'
import Scrollbar from 'smooth-scrollbar'

// Detect if device is mobile/touch device
const isMobileDevice = () => {
  if (typeof window === 'undefined') return false
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    ('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0)
}

export default function SmoothScroll() {
  useEffect(() => {
    // Wait for DOM to be ready
    if (typeof window === 'undefined') return

    // Use native smooth scrolling on mobile devices
    if (isMobileDevice()) {
      // Enable native CSS smooth scrolling
      document.documentElement.style.scrollBehavior = 'smooth'
      
      // Handle anchor link clicks with native smooth scroll
      const handleAnchorClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement
        const anchor = target.closest('a[href^="#"]')
        if (anchor) {
          const href = anchor.getAttribute('href')
          if (href && href !== '#') {
            e.preventDefault()
            const targetElement = document.querySelector(href) as HTMLElement
            if (targetElement) {
              const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset
              window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
              })
            }
          }
        }
      }

      document.addEventListener('click', handleAnchorClick)

      return () => {
        document.removeEventListener('click', handleAnchorClick)
        document.documentElement.style.scrollBehavior = 'auto'
      }
    }

    // Use smooth-scrollbar for desktop
    const scrollbar = Scrollbar.init(document.body, {
      damping: 0.03,
      thumbMinSize: 20,
      renderByPixels: false,
      alwaysShowTracks: false,
      continuousScrolling: true,
      delegateTo: window,
    })

    // Lock scroll position when a modal is open (html.modal-open)
    let lockedY = scrollbar.scrollTop
    scrollbar.addListener((status) => {
      const html = document.documentElement
      if (html.classList.contains('modal-open')) {
        // keep page frozen at lockedY
        scrollbar.setPosition(status.offset.x, lockedY)
      } else {
        lockedY = status.offset.y
      }
    })

    // Enable smooth scrolling for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href^="#"]')
      if (anchor) {
        const href = anchor.getAttribute('href')
        if (href && href !== '#') {
          e.preventDefault()
          const targetElement = document.querySelector(href) as HTMLElement
          if (targetElement && scrollbar) {
            const offsetTop = targetElement.getBoundingClientRect().top + scrollbar.scrollTop
            scrollbar.scrollTo(0, offsetTop, 2000)
          }
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)

    return () => {
      document.removeEventListener('click', handleAnchorClick)
      if (scrollbar) {
        scrollbar.destroy()
      }
    }
  }, [])

  return null
}

