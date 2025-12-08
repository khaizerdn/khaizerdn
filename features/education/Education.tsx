'use client'

import { motion } from 'framer-motion'
import styles from './Education.module.css'

interface Education {
  school: string
  degree: string
  year: string
  honor?: string
  gpa?: string
}

const educationData: Education[] = [
  {
    school: 'Cavite State University - Carmona Campus',
    degree: 'Bachelor of Science in Computer Engineering',
    year: '2025',
    honor: 'Cum Laude',
    gpa: '1.607'
  }
]

export default function Education() {
  return (
    <section id="education" className={styles.section}>
      <div className={styles.content}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={styles.header}
        >
          <h2 className={styles.title}>EDUCATION</h2>
          <p className={styles.description}>
            My academic foundation and achievements.
          </p>
        </motion.div>

        <div className={styles.educationContainer}>
          {educationData.map((edu, index) => (
            <motion.div
              key={edu.school}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '100px 0px' }}
              transition={{ duration: 0.6, delay: Math.min(index * 0.05, 1), ease: [0.22, 1, 0.36, 1] }}
              className={styles.educationWrapper}
            >
              <div className={styles.educationItem}>
                <div className={styles.schoolHeader}>
                  <h3 className={styles.schoolName}>{edu.school}</h3>
                  <span className={styles.year}>{edu.year}</span>
                </div>
                
                <div className={styles.detailsWrapper}>
                  <p className={styles.degree}>{edu.degree}</p>
                  {(edu.honor || edu.gpa) && (
                    <div className={styles.achievements}>
                      {edu.honor && <span className={styles.honor}>{edu.honor}</span>}
                      {edu.honor && edu.gpa && <span className={styles.separator}>•</span>}
                      {edu.gpa && <span className={styles.gpa}>GPA: {edu.gpa}</span>}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
