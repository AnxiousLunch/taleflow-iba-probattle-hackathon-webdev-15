"use client"

import { useState, useEffect } from "react"
import StoryCard from "./StoryCard"

interface PublicProfileProps {
  username: string
  userRole: string
}

export default function PublicProfile({ username, userRole }: PublicProfileProps) {
  const [stories, setStories] = useState([])

  useEffect(() => {
    // Fetch public stories for the user
    // This should be replaced with an actual API call
    const fetchStories = async () => {
      const response = await fetch(`/api/stories/${username}`)
      const data = await response.json()
      setStories(data.stories)
    }
    fetchStories()
  }, [username])

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Public Stories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <StoryCard key={story.id} story={story} userRole={userRole} />
        ))}
      </div>
    </div>
  )
}

