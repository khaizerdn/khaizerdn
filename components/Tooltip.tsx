'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface TooltipProps {
  content: string
  isVisible: boolean
  children: React.ReactNode
  className?: string
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export default function Tooltip({ 
  content, 
  isVisible, 
  children, 
  className = '',
  onMouseEnter,
  onMouseLeave 
}: TooltipProps) {
  return (
    <span 
      className={`relative inline-flex items-center justify-center ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-full mb-4 px-3 py-1.5 bg-gray-50 backdrop-blur-sm border border-gray-200 text-gray-700 text-xs font-light rounded-lg whitespace-nowrap z-50 pointer-events-none tracking-normal"
            style={{ 
              left: 0,
              right: 0,
              marginLeft: 'auto',
              marginRight: 'auto',
              width: 'fit-content',
            }}
          >
            {content}
            <div 
              className="absolute top-full left-1/2 -translate-x-1/2 -mt-0.3"
            >
              <div className="relative">
                <div className="w-0 h-0 border-l-[7px] border-r-[7px] border-t-[7px] border-l-transparent border-r-transparent border-t-gray-200 absolute left-1/2 -translate-x-1/2"></div>
                <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-gray-50 relative"></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  )
}

