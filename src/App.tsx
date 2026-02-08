import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import BackgroundParticles from './components/BackgroundParticles'
import Envelope from './components/Envelope'
import Letter from './components/Letter'

function App() {
  const [envelopeOpened, setEnvelopeOpened] = useState(false)

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-200 via-pink-200 to-purple-300">
      <BackgroundParticles />
      
      <AnimatePresence mode="wait">
        {!envelopeOpened ? (
          <Envelope key="envelope" onOpen={() => setEnvelopeOpened(true)} />
        ) : (
          <Letter key="letter" />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
