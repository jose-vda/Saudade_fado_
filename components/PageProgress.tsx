'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export default function PageProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
  })

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="page-progress"
    />
  )
}
