// import Link from "next/link"
// import { BookOpenIcon } from "@heroicons/react/24/solid"

// interface NavbarProps {
//   onCreateClick: () => void
//   onBlogClick: () => void
// }

// export default function Navbar({ onCreateClick, onBlogClick }: NavbarProps) {
//   return (
//     <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-800 bg-opacity-90 backdrop-blur-sm">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           <div className="flex items-center">
//             <Link href="/" className="flex items-center">
//               <BookOpenIcon className="h-8 w-8 text-blue-400" />
//               <span className="ml-2 text-xl font-bold">TaleFlow</span>
//             </Link>
//           </div>
//           <div className="flex items-center space-x-4">
//             <button
//               onClick={onCreateClick}
//               className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
//             >
//               Create
//             </button>
//             <button
//               onClick={onBlogClick}
//               className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
//             >
//               Blog
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   )
// }

import Link from "next/link"
import { motion } from "framer-motion"
import { BookOpenIcon } from "@heroicons/react/24/solid"

interface NavbarProps {
  onCreateClick: () => void
  onBlogClick: () => void
}

export default function Navbar({ onCreateClick, onBlogClick }: NavbarProps) {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-gray-900 bg-opacity-80 backdrop-blur-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/" className="flex items-center">
              <BookOpenIcon className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                TaleFlow
              </span>
            </Link>
          </motion.div>
          <motion.div
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.button
              onClick={onCreateClick}
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Create
            </motion.button>
            <motion.button
              onClick={onBlogClick}
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Blog
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  )
}

