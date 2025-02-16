// // src/app/page.tsx
// "use client"

// import { useState, useEffect, useRef } from "react"
// import { useInView } from "react-intersection-observer"
// import Navbar from "./components/Navbar"
// import LandingSection from "./components/LandingSection"
// import HomeSection from "./components/HomeSection"
// import BlogSection from "./components/BlogSection"
// import CreateOverlay from "./components/CreateOverlay"

// export default function Home() {
//   const [showNavbar, setShowNavbar] = useState(false)
//   const [showCreateOverlay, setShowCreateOverlay] = useState(false)
//   const [showBlogSection, setShowBlogSection] = useState(false)
  
//   const { ref, inView } = useInView({
//     threshold: 0.5,
//   })
  
//   const homeSectionRef = useRef<HTMLDivElement>(null)
//   const blogSectionRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     setShowNavbar(!inView)
//   }, [inView])


//   const scrollToHomeSection = () => {
//     homeSectionRef.current?.scrollIntoView({ behavior: "smooth" })
//   }

//   const toggleBlogSection = () => {
//     setShowBlogSection((prev) => !prev)
//     if (!showBlogSection) {
//       setTimeout(() => {
//         blogSectionRef.current?.scrollIntoView({ behavior: "smooth" })
//       }, 100)
//     }
//   }

//   return (
//     <main className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white overflow-hidden">
//       <Navbar 
//         className={`transition-opacity duration-300 ${showNavbar ? 'opacity-100' : 'opacity-0'}`}
//         onCreateClick={() => setShowCreateOverlay(true)} 
//         onBlogClick={toggleBlogSection} 
//       />
//       <div className="h-screen overflow-y-auto snap-y snap-mandatory scrollbar-hide">
//         <LandingSection ref={ref} onExploreClick={scrollToHomeSection} />
//         <HomeSection ref={homeSectionRef} />
//         {showBlogSection && <BlogSection ref={blogSectionRef}/>}
//       </div>
//       {showCreateOverlay && (
//         <CreateOverlay onClose={() => setShowCreateOverlay(false)} />
//       )}
//     </main>
//   )
// }

"use client"

import { useState, useEffect, useRef } from "react"
import { useInView } from "react-intersection-observer"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "./components/Navbar"
import LandingSection from "./components/LandingSection"
import HomeSection from "./components/HomeSection"
import BlogSection from "./components/BlogSection"
import CreateOverlay from "./components/CreateOverlay"
// import ParticlesBackground from "./components/ParticlesBackground"

export default function Home() {
  const [showNavbar, setShowNavbar] = useState(false)
  const [showCreateOverlay, setShowCreateOverlay] = useState(false)
  const [showBlogSection, setShowBlogSection] = useState(false)

  const { ref, inView } = useInView({
    threshold: 0.5,
  })

  const homeSectionRef = useRef<HTMLDivElement>(null)
  const blogSectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setShowNavbar(!inView)
  }, [inView])

  const scrollToHomeSection = () => {
    homeSectionRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const toggleBlogSection = () => {
    setShowBlogSection((prev) => !prev)
    if (!showBlogSection) {
      setTimeout(() => {
        blogSectionRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white overflow-hidden">
    
      <AnimatePresence>
        {showNavbar && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Navbar onCreateClick={() => setShowCreateOverlay(true)} onBlogClick={toggleBlogSection} />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="h-screen overflow-y-auto snap-y snap-mandatory scrollbar-hide">
        <LandingSection ref={ref} onExploreClick={scrollToHomeSection} />
        <HomeSection ref={homeSectionRef} />
        <AnimatePresence>
          {showBlogSection && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
            >
              <BlogSection ref={blogSectionRef} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {showCreateOverlay && <CreateOverlay onClose={() => setShowCreateOverlay(false)} />}
      </AnimatePresence>
    </main>
  )
}

