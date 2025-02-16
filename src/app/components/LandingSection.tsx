// import { forwardRef } from "react"
// import { ArrowDownIcon } from "@heroicons/react/24/solid"

// interface LandingSectionProps {
//   onExploreClick: () => void
// }

// const LandingSection = forwardRef<HTMLDivElement, LandingSectionProps>(({ onExploreClick }, ref) => {
//   return (
//     <div
//       ref={ref}
//       className="h-screen flex flex-col justify-center items-center snap-start bg-gradient-to-br from-gray-800 via-gray-900 to-blue-900"
//     >
//       <h1 className="text-5xl md:text-7xl font-bold mb-4 text-center">Welcome to TaleFlow</h1>
//       <p className="text-xl md:text-2xl mb-8 text-center max-w-2xl">
//         Collaborate, version, and share your stories with the world.
//       </p>
//       <button
//         onClick={onExploreClick}
//         className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
//       >
//         Explore
//       </button>
//       <ArrowDownIcon className="h-12 w-12 mt-16 animate-bounce text-blue-400" />
//     </div>
//   )
// })

// LandingSection.displayName = "LandingSection"

// export default LandingSection

import { forwardRef } from "react"
import { motion } from "framer-motion"
import { ArrowDownIcon, BookOpenIcon } from "@heroicons/react/24/solid"

interface LandingSectionProps {
  onExploreClick: () => void
}

const LandingSection = forwardRef<HTMLDivElement, LandingSectionProps>(({ onExploreClick }, ref) => {
  return (
    <div ref={ref} className="h-screen flex flex-col justify-center items-center snap-start relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2, delay: 1 }}
      >
        <div className="w-full h-full bg-[url('/pattern.svg')] bg-repeat opacity-20" />
      </motion.div>
      <motion.div
        className="text-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.div
          className="mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.6 }}
        >
          <BookOpenIcon className="h-24 w-24 text-blue-400 mx-auto" />
        </motion.div>
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-4 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Welcome to TaleFlow
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl mb-8 text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Collaborate, version, and share your stories with the world.
        </motion.p>
        <motion.button
          onClick={onExploreClick}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 relative z-10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          Explore
        </motion.button>
      </motion.div>
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
      >
        <ArrowDownIcon className="h-12 w-12 animate-bounce text-blue-400" />
      </motion.div>
    </div>
  )
})

LandingSection.displayName = "LandingSection"

export default LandingSection

