"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"

export default function StoryPage() {
  const { id } = useParams()
  const [story, setStory] = useState({ title: "", content: "", author: "" })
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState([])

  useEffect(() => {
    // Fetch story and comments
    // This should be replaced with actual API calls
    const fetchStory = async () => {
      const response = await fetch(`/api/story/${id}`)
      const data = await response.json()
      setStory(data.story)
      setComments(data.comments)
    }
    fetchStory()
  }, [id])

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Submit comment
    // This should be replaced with an actual API call
    await fetch(`/api/story/${id}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment }),
    })
    setComment("")
    // Refresh comments
    const response = await fetch(`/api/story/${id}/comments`)
    const data = await response.json()
    setComments(data.comments)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-4">{story.title}</h1>
      <p className="text-gray-300 mb-2">By {story.author}</p>
      <div className="bg-gray-700 p-6 rounded-lg shadow-lg mb-8">
        <p>{story.content}</p>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Comments</h2>
      <form onSubmit={handleCommentSubmit} className="mb-6">
        <textarea
          className="w-full p-2 bg-gray-700 text-white rounded"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Leave a comment..."
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Submit Comment
        </button>
      </form>
      <div className="space-y-4">
        {comments.map((comment, index) => (
          <div key={index} className="bg-gray-700 p-4 rounded-lg">
            <p>{comment.content}</p>
            <p className="text-sm text-gray-400 mt-2">By {comment.author}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

