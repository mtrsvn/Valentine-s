import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'

const ValentineButtons = () => {
  const [yesClicked, setYesClicked] = useState(false)

  const handleYesClick = () => {
    setYesClicked(true)
    
    const duration = 2000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 25, spread: 360, ticks: 50, zIndex: 1000 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 30 * (timeLeft / duration)
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.2, 0.4), y: Math.random() - 0.2 },
        colors: ['#ff6b9d', '#c44569', '#f7b731', '#5f27cd'],
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.6, 0.8), y: Math.random() - 0.2 },
        colors: ['#ff6b9d', '#c44569', '#f7b731', '#5f27cd'],
      })
    }, 300)
  }

  useEffect(() => {
  }, [])

  if (yesClicked) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
        className="text-center py-8"
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-12 h-12 bg-pink-500 rounded-full"></div>
          <svg className="w-16 h-16 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          <div className="w-12 h-12 bg-purple-500 rounded-full"></div>
        </div>
        <h3 className="font-playfair text-4xl text-pink-600 mb-4">
          Yay! I knew you'd say yes!
        </h3>
        <p className="font-poppins text-xl text-purple-600">
          You've made me the happiest person in the world!
        </p>
      </motion.div>
    )
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative min-h-[120px]">
      <button
        onClick={handleYesClick}
        className="relative px-12 py-4 bg-gradient-to-r from-pink-500 to-rose-600 text-white font-poppins font-semibold text-xl rounded-full shadow-lg hover:shadow-2xl transition-shadow duration-300"
      >
        Yes!
      </button>

      <button
        className="px-12 py-4 bg-gradient-to-r from-gray-300 to-gray-400 text-gray-700 font-poppins font-semibold text-xl rounded-full shadow-lg cursor-default select-none"
        aria-label="No"
      >
        No
      </button>
    </div>
  )
}

export default ValentineButtons
