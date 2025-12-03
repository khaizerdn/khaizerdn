'use client'

import { motion } from 'framer-motion'

const skillCategories = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React', level: 90 },
      { name: 'Next.js', level: 85 },
      { name: 'TypeScript', level: 85 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'JavaScript', level: 90 },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', level: 80 },
      { name: 'Python', level: 75 },
      { name: 'REST APIs', level: 85 },
      { name: 'GraphQL', level: 70 },
    ],
  },
  {
    category: 'Tools & Others',
    skills: [
      { name: 'Git', level: 90 },
      { name: 'Docker', level: 70 },
      { name: 'AWS', level: 65 },
      { name: 'CI/CD', level: 75 },
    ],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-20 md:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            <span className="text-white">
              Skills & Technologies
            </span>
          </h2>
          <div className="w-16 h-px bg-white/30 mx-auto mb-6"></div>
          <p className="text-white max-w-2xl mx-auto text-lg font-light">
            Technologies and tools I work with to bring ideas to life
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:border-white/20 hover:bg-white/10 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold mb-8 text-white text-center tracking-tight">
                {category.category}
              </h3>
              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-white font-medium text-sm tracking-wide">{skill.name}</span>
                      <span className="text-xs text-white font-light">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1.2,
                          delay: categoryIndex * 0.1 + skillIndex * 0.1,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="h-1.5 rounded-full bg-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

