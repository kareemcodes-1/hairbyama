'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

const shuffle = (arr: number[]) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

type Props = {
  progress: number
}

const PixelLoader = ({ progress }: Props) => {
  const [mounted, setMounted] = useState(false)
  const [fadeText, setFadeText] = useState(false)
  const [startExit, setStartExit] = useState(false)
  const [remove, setRemove] = useState(false)

  // ✅ mark client mount
  useEffect(() => {
    setMounted(true)
  }, [])

  // ✅ exit sequence
  useEffect(() => {
    if (progress === 100) {
      setFadeText(true)

      setTimeout(() => setStartExit(true), 350)
      setTimeout(() => setRemove(true), 1100)
    }
  }, [progress])

  /**
   * ✅ SAFE HOOKS ZONE
   * All hooks must run BEFORE any return
   */

  const blockSize = mounted
    ? Math.floor(window.innerWidth * 0.05)
    : 50

  const cols = mounted
    ? Math.ceil(window.innerWidth / blockSize)
    : 20

  const rows = mounted
    ? Math.ceil(window.innerHeight / blockSize)
    : 12

  const total = cols * rows

  const delays = useMemo(
    () => shuffle([...Array(total)].map((_, i) => i)),
    [total]
  )

  // ✅ NOW it's safe to return conditionally
  if (!mounted || remove) return null

  return (
   <div className="fixed inset-0 z-[9999] pointer-events-none">
      {/* PIXEL GRID */}
      <div
        className="absolute inset-0 grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {delays.map((d, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 1 }}
            animate={{ opacity: startExit ? 0 : 1 }}
            transition={{
              duration: 0.15,
              ease: 'linear',
              delay: startExit ? d * 0.003 : 0,
            }}
            className="bg-pink-500"
          />
        ))}
      </div>

      {/* PROGRESS TEXT */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.h1
          animate={{ opacity: fadeText ? 0 : 1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="text-white text-[6rem] font-bold"
        >
          {progress}%
        </motion.h1>
      </div>
    </div>
  )
}

export default PixelLoader
