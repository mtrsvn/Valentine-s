import { useState, useCallback, useRef } from 'react'

interface UseScrollRevealOptions {
  threshold?: number
}

const useScrollReveal = ({ threshold = 0.85 }: UseScrollRevealOptions = {}) => {
  const [isRevealed, setIsRevealed] = useState(false)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el || isRevealed) return

    const scrollProgress = el.scrollTop / (el.scrollHeight - el.clientHeight)
    if (scrollProgress >= threshold) {
      setIsRevealed(true)
    }
  }, [threshold, isRevealed])

  return { scrollRef, isRevealed, handleScroll }
}

export default useScrollReveal
