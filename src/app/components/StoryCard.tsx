"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { UserRole } from "@/types"
import { Story } from "@/types/story"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { BookOpen, Lock, MessageSquare, Heart, ThumbsUp } from "lucide-react"

interface ProfileData {
  username: string;
  bio: string;
  avatar: string;
  stories: Story[];
  statistics: {
    totalStories: number;
    totalLikes: number;
    totalComments: number;
    followers: number;
  };
}

export default function ProfilePage() {
  const { username } = useParams()
  const [activeTab, setActiveTab] = useState("public")
  const [userRole, setUserRole] = useState<UserRole>("creator")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [profileData, setProfileData] = useState<ProfileData | null>(null)

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true)
        // TODO: Replace with actual API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        setProfileData({
          username: username as string,
          bio: "Professional storyteller and creative writer",
          avatar: "/api/placeholder/150/150",
          stories: [
            {
              id: "1",
              title: "The Journey Begins",
              content: "Preview of the story...",
              author: username as string,
              authorId: "1",
              createdAt: new Date().toISOString(),
              likes: 150,
              comments: 23,
              isPublic: true,
              reactions: { likes: 150, hearts: 89, bookmarks: 34 },
              tags: ["adventure", "fantasy"]
            },
            // Add more stories...
          ],
          statistics: {
            totalStories: 15,
            totalLikes: 1243,
            totalComments: 456,
            followers: 89
          }
        })
        setIsLoading(false)
      } catch (err) {
        setError("Failed to load profile")
        setIsLoading(false)
      }
    }

    fetchProfileData()
  }, [username])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    )
  }

  if (error || !profileData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white p-8">
        <div className="text-red-500">{error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        {/* Profile Header */}
        <div className="flex items-center gap-8 mb-12">
          <img
            src={profileData.avatar}
            alt={profileData.username}
            className="w-32 h-32 rounded-full border-4 border-blue-500"
          />
          <div>
            <h1 className="text-4xl font-bold mb-2">{profileData.username}</h1>
            <p className="text-gray-300 mb-4">{profileData.bio}</p>
            <div className="flex gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold">{profileData.statistics.totalStories}</p>
                <p className="text-gray-400">Stories</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{profileData.statistics.totalLikes}</p>
                <p className="text-gray-400">Likes</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{profileData.statistics.followers}</p>
                <p className="text-gray-400">Followers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="public" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="public" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Public Stories
            </TabsTrigger>
            {userRole === "creator" && (
              <TabsTrigger value="private" className="flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Private Stories
              </TabsTrigger>
            )}
          </TabsList>

          <AnimatePresence mode="wait">
            <TabsContent value="public">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {profileData.stories
                  .filter(story => story.isPublic)
                  .map(story => (
                    <StoryCard key={story.id} story={story} />
                  ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="private">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {profileData.stories
                  .filter(story => !story.isPublic)
                  .map(story => (
                    <StoryCard key={story.id} story={story} />
                  ))}
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </motion.div>
    </div>
  )
}
