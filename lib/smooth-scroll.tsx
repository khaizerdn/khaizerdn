'use client'

import { useEffect } from 'react'
import Scrollbar from 'smooth-scrollbar'

export default function SmoothScroll() {
  useEffect(() => {
    // Wait for DOM to be ready
    if (typeof window === 'undefined') return

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

