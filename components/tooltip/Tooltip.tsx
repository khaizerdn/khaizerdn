'use client'

import { motion, AnimatePresence } from 'framer-motion'
import styles from './Tooltip.module.css'

interface TooltipProps {
  children: React.ReactNode
  show: boolean
  className?: string
}

export default function Tooltip({ children, show, className }: TooltipProps) {
  return (
    <AnimatePresence>
      {show && (
        <div className={styles.tooltipContainer}>
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className={styles.tooltipWrapper}
          >
            <div className={styles.tooltipArrowOuter}>
              <div className={styles.tooltipArrowInner}></div>
            </div>
            <div className={`${styles.tooltip} ${className || ''}`}>
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}


