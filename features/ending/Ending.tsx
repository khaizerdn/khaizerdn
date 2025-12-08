'use client'

import { motion } from 'framer-motion'
import styles from './Ending.module.css'

export default function Ending() {
  return (
    <section id="ending" className={styles.section}>
      <div className={styles.content}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={styles.text}
        >
          <p className={styles.message}>Thank you for visiting!</p>
        </motion.div>
      </div>
    </section>
  )
}

