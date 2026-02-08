import { motion } from 'framer-motion'
import { useState } from 'react'

interface EnvelopeProps {
  onOpen: () => void
}

const Envelope = ({ onOpen }: EnvelopeProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-screen"
    >
        <motion.div
          className="relative cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={onOpen}
          style={{ willChange: 'transform' }}
          initial={false}
          animate={{
            y: isHovered ? -18 : 0,
            rotate: isHovered ? -3 : 0,
            scale: isHovered ? 1.02 : 1,
          }}
          transition={{
            y: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
            rotate: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
            scale: { duration: 0.25, ease: 'easeOut' },
          }}
          whileTap={{ scale: 0.98 }}
        >
        <motion.div
          animate={{
            y: isHovered ? 0 : [0, -10, 0],
          }}
          transition={{
            duration: 1.2,
            repeat: isHovered ? 0 : Infinity,
            ease: 'easeInOut',
            repeatType: 'loop',
          }}
        >
        <div className="relative w-64 h-44 sm:w-80 sm:h-56">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-300 to-pink-400 rounded-lg shadow-2xl" />
          
          <motion.div
            className="absolute left-0 right-0 top-0 h-24 sm:h-32 origin-top"
            style={{
              clipPath: 'polygon(0 0, 50% 60%, 100% 0)',
            }}
            animate={{
              rotateX: isHovered ? -30 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-full h-full bg-gradient-to-br from-pink-400 to-pink-500 shadow-lg" />
          </motion.div>

          <div
            className="absolute left-0 right-0 top-0 h-24 sm:h-32"
            style={{
              clipPath: 'polygon(0 0, 50% 60%, 100% 0)',
              background: 'linear-gradient(135deg, #f9a8d4 0%, #ec4899 100%)',
            }}
          />

        </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default Envelope
