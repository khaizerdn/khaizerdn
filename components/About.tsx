'use client'

import { motion } from 'framer-motion'
import { Code, Coffee, Rocket } from 'lucide-react'

const features = [
  {
    icon: Code,
    title: 'Clean Code',
    description: 'Writing maintainable and scalable code following best practices.',
  },
  {
    icon: Rocket,
    title: 'Performance',
    description: 'Building fast and efficient applications optimized for speed.',
  },
  {
    icon: Coffee,
    title: 'Problem Solving',
    description: 'Turning complex problems into elegant solutions.',
  },
]

export default function About() {
  return (
    <section id="about" className="py-20 md:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            <span className="text-white">
              About Me
            </span>
          </h2>
          <div className="w-16 h-px bg-white/30 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col h-full"
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white tracking-tight">
              Passionate Software Engineer
            </h3>
            <div className="flex-grow">
              <p className="text-gray-400 mb-5 leading-relaxed text-lg font-light">
                I'm a software engineer passionate about creating exceptional digital
                experiences. With expertise in modern web technologies, I specialize in
                building responsive, performant applications that solve real-world problems.
              </p>
              <p className="text-gray-400 mb-5 leading-relaxed text-lg font-light">
                My journey in software development has been driven by curiosity and a
                commitment to continuous learning. I enjoy working with cutting-edge
                technologies and contributing to open-source projects.
              </p>
              <p className="text-gray-400 leading-relaxed text-lg font-light">
                When I'm not coding, you can find me exploring new technologies, reading
                tech blogs, or contributing to the developer community.
              </p>
            </div>
            <div className="w-16 h-px bg-white/30 mt-auto"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 gap-6"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex items-start gap-5">
                    <div className="p-3 rounded-xl bg-white text-black shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Icon size={22} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2 text-white tracking-tight">
                        {feature.title}
                      </h4>
                      <p className="text-gray-400 font-light leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

