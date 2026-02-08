import { motion, AnimatePresence } from 'framer-motion'
import useScrollReveal from '../hooks/useScrollReveal'
import ValentineQuestion from './ValentineQuestion'

const letterContent = [
  "Sometimes I try to think about how everything started with us, and it still amazes me how someone like you became one of the most important parts of my life. You came into my world and slowly turned ordinary days into something I always look forward to.",

  "You've seen me at my best, but more importantly, you stayed during my worst. You never gave up on me even when I overthink, when I doubt myself, or when things get heavy. You remind me that I'm not alone, and that alone means more than I can ever explain.",

  "Being with you feels like home. It's comfort, laughter, peace, and sometimes chaos but it's the kind of chaos I would always choose. You make life lighter, brighter, and happier.",

  "I love the way you care, the way you understand me, and the way you stay. Every memory with you is something I treasure, and every moment with you is something I want to keep choosing again and again.",

  "I don't know what the future fully holds, but one thing I am sure of is that I want you to be part of it. I want more memories, more laughs, more late night talks, and more days where I get to call you mine.",

  "So today, I just want to ask you something simple but very important to me…",
]

const ParagraphReveal = ({ children, index }: { children: string; index: number }) => {
  return (
    <motion.p
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4 sm:mb-6"
    >
      {children}
    </motion.p>
  )
}

const Letter = () => {
  const { scrollRef, isRevealed, handleScroll } = useScrollReveal({ threshold: 0.85 })

  return (
    <div className="flex justify-center items-center min-h-screen py-4 px-3 sm:py-6 sm:px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ willChange: 'transform' }}
        className="relative max-w-3xl w-full bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col"
      >
        <div className="absolute inset-0 bg-white/40 rounded-2xl sm:rounded-3xl pointer-events-none" />

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="relative z-10 overflow-y-auto max-h-[85vh] sm:max-h-[80vh] p-5 sm:p-8 md:p-12 scroll-smooth scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', overscrollBehavior: 'contain' }}
        >
          <div className="text-center mb-5 sm:mb-8">
            <h1 className="font-playfair text-3xl sm:text-5xl md:text-6xl font-semibold text-purple-800 mb-3 sm:mb-4">
              My Dearest
            </h1>
          </div>

          <div className="space-y-6 font-poppins">
            {letterContent.map((paragraph, index) => (
              <ParagraphReveal key={index} index={index}>
                {paragraph}
              </ParagraphReveal>
            ))}
          </div>

          <AnimatePresence>
            {isRevealed && (
              <motion.div
                key="valentine-question"
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <ValentineQuestion />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

export default Letter
