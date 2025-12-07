'use client'

import { motion } from 'framer-motion'
import styles from './Certificates.module.css'

interface Certificate {
  name: string
  issuer: string
  year: string
  link?: string
  image: string
}

const certificates: Certificate[] = [
  {
    name: 'Meta Front-End Developer Professional Certificate',
    issuer: 'Meta',
    year: '2024',
    link: '#',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop'
  },
  {
    name: 'Google UX Design Professional Certificate',
    issuer: 'Google',
    year: '2023',
    link: '#',
    image: 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=800&h=600&fit=crop'
  },
  {
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    year: '2023',
    link: '#',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop'
  },
  {
    name: 'JavaScript Algorithms and Data Structures',
    issuer: 'freeCodeCamp',
    year: '2022',
    link: '#',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=600&fit=crop'
  }
]

export default function Certificates() {
  return (
    <section id="certificates" className={styles.section}>
      <div className={styles.content}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={styles.header}
        >
          <h2 className={styles.title}>CERTIFICATES</h2>
          <p className={styles.description}>
            Professional certifications and achievements that validate my technical expertise and commitment to continuous learning.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className={styles.certificatesContainer}
        >
          {certificates.map((cert, index) => (
            <motion.a
              key={cert.name}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.certificateItem}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '50px' }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.imageContainer}>
                <img src={cert.image} alt={cert.name} className={styles.certImage} />
              </div>
              <div className={styles.certContent}>
                <div className={styles.certHeader}>
                  <span className={styles.certName}>{cert.name}</span>
                </div>
                <div className={styles.certFooter}>
                  <span className={styles.certIssuer}>{cert.issuer}</span>
                  <span className={styles.certYear}>{cert.year}</span>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

