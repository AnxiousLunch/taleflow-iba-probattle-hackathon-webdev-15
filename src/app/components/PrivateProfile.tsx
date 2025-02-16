"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface PrivateProfileProps {
  username: string
}

export default function PrivateProfile({ username }: PrivateProfileProps) {
  const [story, setStory] = useState("")
  const router = useRouter()

  useEffect(() => {
    // Fetch the user's private story
    // This should be replaced with an actual API call
    const fetchPrivateStory = async () => {
      const response = await fetch(`/api/private-story/${username}`)
      const data = await response.json()
      setStory(data.story)
    }
    fetchPrivateStory()
  }, [username])

  const handleStoryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setStory(e.target.value)
  }

  const handleSave = async () => {
    // Save the story
    // This should be replaced with an actual API call
    await fetch(`/api/private-story/${username}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ story }),
    })
    router.refresh()
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Private Story</h2>
      <textarea
        className="w-full h-64 p-4 bg-gray-700 text-white rounded-lg"
        value={story}
        onChange={handleStoryChange}
        placeholder="Write your private story here..."
      />
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        onClick={handleSave}
      >
        Save Story
      </button>
    </div>
  )
}

