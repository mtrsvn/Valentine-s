import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const BackgroundParticles = () => {
  const [hearts, setHearts] = useState<{ id: number; x: number; delay: number; duration: number; size: string }[]>([])

  useEffect(() => {
    const newHearts = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 6,
      duration: 7 + Math.random() * 6,
      size: ['text-2xl', 'text-3xl', 'text-4xl', 'text-5xl'][Math.floor(Math.random() * 4)],
    }))
    setHearts(newHearts)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className={`absolute ${heart.size} opacity-20`}
          style={{
            left: `${heart.x}%`,
            bottom: '-10%',
            willChange: 'transform',
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            x: [0, Math.sin(heart.id) * 50],
            rotate: [0, 360],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  )
}

export default BackgroundParticles
