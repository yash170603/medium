"use client"

import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ 
          opacity: 0,
          y: 20,
          scale: 0.98
        }}
        animate={{ 
          opacity: 1,
          y: 0,
          scale: 1
        }}
        exit={{ 
          opacity: 0,
          y: -20,
          scale: 0.98 
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
          staggerChildren: 0.1
        }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

