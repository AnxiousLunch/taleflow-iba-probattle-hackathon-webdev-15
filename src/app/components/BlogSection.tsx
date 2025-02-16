// import { forwardRef } from "react"

// const BlogSection = forwardRef<HTMLDivElement>((props, ref) => {
//   // TODO: Fetch blog posts from the backend
//   const blogPosts = [
//     { id: 1, title: "Getting Started with TaleFlow", excerpt: "Learn how to create your first story..." },
//     { id: 2, title: "Collaborative Writing Tips", excerpt: "Discover the best practices for writing with a team..." },
//     {
//       id: 3,
//       title: "Version Control for Writers",
//       excerpt: "Understanding the importance of tracking your story versions...",
//     },
//   ]

//   return (
//     <div
//       ref={ref}
//       className="min-h-screen snap-start bg-gradient-to-b from-gray-900 to-gray-800 py-16 px-4 sm:px-6 lg:px-8"
//     >
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-4xl font-extrabold text-center mb-12">TaleFlow Blog</h2>
//         <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//           {blogPosts.map((post) => (
//             <div
//               key={post.id}
//               className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
//             >
//               <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
//               <p className="text-gray-300">{post.excerpt}</p>
//               <button className="mt-4 text-blue-400 hover:text-blue-300">Read more</button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// })

// BlogSection.displayName = "BlogSection"

// export default BlogSection

import type React from "react"
import { motion } from "framer-motion"
import { CalendarIcon, UserIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/outline"

interface BlogSectionProps {
  ref: React.RefObject<HTMLDivElement>
}

const blogPosts = [
  {
    title: "The Art of Storytelling",
    excerpt: "Discover the secrets of crafting compelling narratives that captivate your audience.",
    author: "Jane Doe",
    date: "2023-05-01",
    comments: 15,
  },
  {
    title: "World-Building 101",
    excerpt: "Learn how to create immersive and believable fictional worlds for your stories.",
    author: "John Smith",
    date: "2023-04-28",
    comments: 23,
  },
  {
    title: "Character Development Techniques",
    excerpt: "Explore methods to create deep, relatable characters that resonate with readers.",
    author: "Emily Johnson",
    date: "2023-04-25",
    comments: 19,
  },
]

export default function BlogSection({ ref }: BlogSectionProps) {
  return (
    <div
      ref={ref}
      className="min-h-screen snap-start bg-gradient-to-b from-gray-900 to-gray-800 py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Latest Blog Posts
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={index}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-400 mb-4">{post.excerpt}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <UserIcon className="h-4 w-4 mr-1" />
                  <span>{post.author}</span>
                  <CalendarIcon className="h-4 w-4 ml-4 mr-1" />
                  <span>{post.date}</span>
                  <ChatBubbleLeftIcon className="h-4 w-4 ml-4 mr-1" />
                  <span>{post.comments} comments</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

