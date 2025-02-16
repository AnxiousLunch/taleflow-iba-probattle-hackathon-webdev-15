// import { BookOpenIcon, UsersIcon, CloudArrowUpIcon } from "@heroicons/react/24/outline"

// export default function HomeSection() {
//   return (
//     <div className="min-h-screen snap-start bg-gradient-to-b from-gray-900 to-gray-800 py-16 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-4xl font-extrabold text-center mb-12">Discover StoryRepo</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           <FeatureCard
//             icon={<BookOpenIcon className="h-12 w-12 text-blue-400" />}
//             title="Write & Collaborate"
//             description="Create and edit stories with real-time collaboration. Work together seamlessly."
//           />
//           <FeatureCard
//             icon={<CloudArrowUpIcon className="h-12 w-12 text-blue-400" />}
//             title="Version Control"
//             description="Keep track of your story's evolution with powerful versioning tools."
//           />
//           <FeatureCard
//             icon={<UsersIcon className="h-12 w-12 text-blue-400" />}
//             title="Share & Discover"
//             description="Share your stories with the world and discover amazing content from other writers."
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// function FeatureCard({ icon, title, description }) {
//   return (
//     <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
//       <div className="flex justify-center mb-4">{icon}</div>
//       <h3 className="text-xl font-semibold text-center mb-2">{title}</h3>
//       <p className="text-gray-300 text-center">{description}</p>
//     </div>
//   )
// }

import { motion } from "framer-motion"
import { BookOpenIcon, UsersIcon, CloudArrowUpIcon } from "@heroicons/react/24/outline"

export default function HomeSection() {
  return (
    <div className="min-h-screen snap-start bg-gradient-to-b from-gray-900 to-gray-800 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl font-extrabold text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Discover StoryRepo
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<BookOpenIcon className="h-12 w-12 text-blue-400" />}
            title="Write & Collaborate"
            description="Create and edit stories with real-time collaboration. Work together seamlessly."
            delay={0.2}
          />
          <FeatureCard
            icon={<CloudArrowUpIcon className="h-12 w-12 text-blue-400" />}
            title="Version Control"
            description="Keep track of your story's evolution with powerful versioning tools."
            delay={0.4}
          />
          <FeatureCard
            icon={<UsersIcon className="h-12 w-12 text-blue-400" />}
            title="Share & Discover"
            description="Share your stories with the world and discover amazing content from other writers."
            delay={0.6}
          />
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description, delay }) {
  return (
    <motion.div
      className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <motion.div
        className="flex justify-center mb-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
      >
        {icon}
      </motion.div>
      <h3 className="text-xl font-semibold text-center mb-2">{title}</h3>
      <p className="text-gray-300 text-center">{description}</p>
    </motion.div>
  )
}

