import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import confetti from 'canvas-confetti'

const ValentineQuestion = () => {
  const [accepted, setAccepted] = useState(false)
  const [coverNo, setCoverNo] = useState(false)
  const hoveringYes = useRef(false)

  const yesBtnRef = useRef<HTMLButtonElement | null>(null)
  const noBtnRef = useRef<HTMLButtonElement | null>(null)
  const [yesOffset, setYesOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (coverNo && yesBtnRef.current && noBtnRef.current) {
      const yesRect = yesBtnRef.current.getBoundingClientRect()
      const noRect = noBtnRef.current.getBoundingClientRect()
      setYesOffset({
        x: noRect.left - yesRect.left + yesOffset.x,
        y: noRect.top - yesRect.top + yesOffset.y,
      })
    }
  }, [coverNo])

  const handleNoEnter = () => {
    if (accepted) return
    setCoverNo(true)
  }

  const handleNoLeave = () => {
    if (accepted) return
    // Don't snap back if mouse moved onto the covering Yes button
    setTimeout(() => {
      if (!hoveringYes.current) {
        setCoverNo(false)
        setYesOffset({ x: 0, y: 0 })
      }
    }, 10)
  }

  const handleYesEnter = () => {
    hoveringYes.current = true
  }

  const handleYesLeave = () => {
    hoveringYes.current = false
    if (coverNo && !accepted) {
      setCoverNo(false)
      setYesOffset({ x: 0, y: 0 })
    }
  }

  const handleYesClick = () => {
    setAccepted(true)

    const duration = 3000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 }

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()
      if (timeLeft <= 0) return clearInterval(interval)

      const particleCount = 40 * (timeLeft / duration)

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.4), y: Math.random() - 0.2 },
        colors: ['#ff6b9d', '#c44569', '#f7b731', '#5f27cd', '#ff9ff3'],
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.6, 0.9), y: Math.random() - 0.2 },
        colors: ['#ff6b9d', '#c44569', '#f7b731', '#5f27cd', '#ff9ff3'],
      })
    }, 250)
  }

  const [hearts, setHearts] = useState<{ id: number; x: number; delay: number }[]>([])

  useEffect(() => {
    if (accepted) {
      setHearts(
        Array.from({ length: 12 }, (_, i) => ({
          id: i,
          x: Math.random() * 100,
          delay: Math.random() * 2,
        }))
      )
    }
  }, [accepted])

  if (accepted) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-center py-8 sm:py-12 relative overflow-hidden"
      >
        {hearts.map((h) => (
          <motion.span
            key={h.id}
            className="absolute text-2xl pointer-events-none"
            style={{ left: `${h.x}%`, bottom: 0 }}
            initial={{ opacity: 0, y: 0 }}
            animate={{ y: [-20, -300], opacity: [0, 1, 0] }}
            transition={{
              duration: 3,
              delay: h.delay + 0.4,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          >
            ❤️
          </motion.span>
        ))}

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.3, 1], opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="text-5xl sm:text-6xl mb-4 sm:mb-6"
        >
          <motion.span
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
            style={{ display: 'inline-block' }}
          >
            ❤️
          </motion.span>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          className="font-playfair text-2xl sm:text-4xl md:text-5xl font-semibold text-pink-600 mb-3 sm:mb-4"
        >
          You just made me the happiest person
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
          className="font-poppins text-lg text-purple-600 mt-2"
        >
          I love you more than words can say!
        </motion.p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="text-center pt-6 pb-8 sm:pt-8 sm:pb-12"
    >
      <motion.h2
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="font-playfair text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-purple-800 mb-6 sm:mb-10"
      >
        Will you be my Valentine's?
      </motion.h2>

      <div className="relative mx-auto w-full max-w-md px-4" style={{ minHeight: 140 }}>
        <div className="flex items-center justify-center gap-4 sm:gap-8 relative" style={{ minHeight: 100 }}>
          <motion.button
            ref={yesBtnRef}
            onClick={handleYesClick}
            animate={{ x: yesOffset.x, y: yesOffset.y }}
            transition={{ type: 'spring', stiffness: 500, damping: 28 }}
            className="px-7 py-2.5 sm:px-10 sm:py-3 bg-gradient-to-r from-pink-400 to-rose-500 text-white font-poppins font-semibold text-lg sm:text-xl rounded-full shadow-lg hover:shadow-2xl hover:from-pink-500 hover:to-rose-600 active:scale-95 transition-colors duration-200 z-10 cursor-pointer relative"
            onMouseEnter={handleYesEnter}
            onMouseLeave={handleYesLeave}
            style={{ pointerEvents: 'auto' }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            Yes!
          </motion.button>

          <button
            ref={noBtnRef}
            onMouseEnter={handleNoEnter}
            onMouseLeave={handleNoLeave}
            onClick={handleNoEnter}
            className="px-7 py-2.5 sm:px-10 sm:py-3 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-600 font-poppins font-semibold text-lg sm:text-xl rounded-full shadow-md"
          >
            No
          </button>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-sm text-purple-400 mt-4 font-poppins"
        >
          (Choose wisely)
        </motion.p>
      </div>
    </motion.div>
  )
}

export default ValentineQuestion
