// import Link from "next/link"

// interface CreateOverlayProps {
//   onClose: () => void
// }

// export default function CreateOverlay({ onClose }: CreateOverlayProps) {
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full text-center">
//         <h2 className="text-2xl font-bold mb-4">Create Your Story</h2>
//         <p className="mb-6">You need to be logged in to create a story.</p>
//         <div className="space-y-4">
//           <Link
//             href="/login"
//             className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
//           >
//             Log In
//           </Link>
//           <Link
//             href="/signup"
//             className="block w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
//           >
//             Sign Up
//           </Link>
//           <button
//             onClick={onClose}
//             className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

import Link from "next/link"
import { motion } from "framer-motion"

interface CreateOverlayProps {
  onClose: () => void
}

export default function CreateOverlay({ onClose }: CreateOverlayProps) {
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full text-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-bold mb-4">Create Your Story</h2>
        <p className="mb-6">You need to be logged in to create a story.</p>
        <div className="space-y-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/login"
              className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
            >
              Log In
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/signup"
              className="block w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
            >
              Sign Up
            </Link>
          </motion.div>
          <motion.button
            onClick={onClose}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Cancel
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

