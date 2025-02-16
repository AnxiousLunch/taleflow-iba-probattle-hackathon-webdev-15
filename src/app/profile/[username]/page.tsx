"use client"

import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/cardcn'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/app/components/ui/tabs'
import { Avatar } from '@/app/components/ui/avatar'
import { AvatarImage } from '@/app/components/ui/avatar-image'
import { AvatarFallback } from '@/app/components/ui/avatar-fallback'
import { Badge } from '@/app/components/ui/badge'
import { Input } from '@/app/components/ui/input'
import { Textarea } from '@/app/components/ui/textarea'
import { Label } from '@/app/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select'
import { Switch } from '@/app/components/ui/switch'
import { useState, useEffect } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/components/ui/dialog'
import { 
  Heart, 
  MessageSquare, 
  Lock, 
  Eye, 
  PenSquare, 
  Trash, 
  PlusCircle, 
  Book, 
  BookOpen,
  ChevronRight
} from 'lucide-react'

interface Chapter {
  id: string
  title: string
  content: string
  chapterNumber: number
  createdAt: string
  updatedAt: string
}

interface Story {
  id: string
  title: string
  summary: string
  genre: string
  isPublic: boolean
  createdAt: string
  updatedAt: string
  chapters: Chapter[]
  coverImage?: string
  totalViews: number
  averageRating: number
  ratingCount: number
}

export default function ProfilePage() {
  const params = useParams()
  const router = useRouter()
  const username = params?.username as string
  const [activeTab, setActiveTab] = useState('public')
  const [isCreatingStory, setIsCreatingStory] = useState(false)
  const [isCreatingChapter, setIsCreatingChapter] = useState(false)
  const [selectedStory, setSelectedStory] = useState<Story | null>(null)
  const [newStory, setNewStory] = useState({
    title: '',
    summary: '',
    genre: '',
    isPublic: false,
    mainCharacters: ''
  })
  const [discoverStories, setDiscoverStories] = useState([])
const [isLoadingStories, setIsLoadingStories] = useState(false)
  const [newChapter, setNewChapter] = useState({
    title: '',
    content: '',
    chapterNumber: 1
  })

  // These would be fetched from the database in a real implementation
  const [publicStories, setPublicStories] = useState<Story[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(`${username}_public_stories`)
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  const [privateStories, setPrivateStories] = useState<Story[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(`${username}_private_stories`)
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  useEffect(() => {
    const fetchUserStories = async () => {
      try {
        // Fetch public stories
        const publicResponse = await fetch(`/api/stories/user?username=${username}&isPublic=true`)
        if (publicResponse.ok) {
          const publicData = await publicResponse.json()
          const normalizedPublicData = publicData.map((story: Story) => ({
            id: story.id,
            title: story.title,
            summary: story.summary,
            genre: story.genre,
            isPublic: story.isPublic,
            createdAt: story.createdAt,
            updatedAt: story.updatedAt,
            chapters: story.chapters?.map(chapter => ({
              id: chapter.id, // <-- Must exist in API response
              // ... chapter fields
            })) || [],
            coverImage: story.coverImage,
            totalViews: story.totalViews,
            averageRating: story.averageRating,
            ratingCount: story.ratingCount,
            // authorUsername: story.author_username
          }));
          setPublicStories(normalizedPublicData)
        }
  
        // Fetch private stories
        const privateResponse = await fetch(`/api/stories/user?username=${username}&isPublic=false`)
        if (privateResponse.ok) {
          const privateData = await privateResponse.json()
          const normalizedPrivateData = privateData.map((story: Story) => ({
            id: story.id,
            title: story.title,
            summary: story.summary,
            genre: story.genre,
            isPublic: story.isPublic,
            createdAt: story.createdAt,
            updatedAt: story.updatedAt,
            chapters: story.chapters || [],
            coverImage: story.coverImage,
            totalViews: story.totalViews,
            averageRating: story.averageRating,
            ratingCount: story.ratingCount,
            // authorUsername: story.author_username
          }));
          setPrivateStories(normalizedPrivateData)
        }
      } catch (error) {
        console.error('Error fetching user stories:', error)
      }
    }
  
    fetchUserStories()
  }, [username])
  
  useEffect(() => {
    const fetchDiscoverStories = async () => {
      try {
        setIsLoadingStories(true)
        const response = await fetch(`/api/stories/public?currentUser=${username}`)
        if (response.ok) {
          const data = await response.json()
          const normalizedData = data.map((story: Story) => ({
            ...story,
            chapters: story.chapters || [] // Ensure chapters array exists
          }))
          setDiscoverStories(normalizedData)
        }
      } catch (error) {
        console.error('Error fetching public stories:', error)
      } finally {
        setIsLoadingStories(false)
      }
    }
  
    if (activeTab === 'discover') {
      fetchDiscoverStories()
    }
  }, [activeTab, username])


  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewStory(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleChapterInputChange = (e) => {
    const { name, value } = e.target
    setNewChapter(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSwitchChange = (checked) => {
    setNewStory(prev => ({
      ...prev,
      isPublic: checked
    }))
  }

  const handleGenreChange = (value) => {
    setNewStory(prev => ({
      ...prev,
      genre: value
    }))
  }

  

  const handleCreateStory = async () => {
    try {
      const response = await fetch('/api/stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newStory.title,
          summary: newStory.summary,
          genre: newStory.genre,
          main_characters: newStory.mainCharacters,
          is_public: newStory.isPublic,
          author_username: username
        }),
      });
  
      const apiStory: Story = await response.json();
      
      const normalizedStory: Story = {
        ...apiStory,
        isPublic: apiStory.isPublic,
        createdAt: apiStory.createdAt,
        updatedAt: apiStory.updatedAt,
        coverImage: apiStory.coverImage,
        totalViews: apiStory.totalViews,
        averageRating: apiStory.averageRating,
        ratingCount: apiStory.ratingCount,
        // authorUsername: apiStory.authorUsername,
        chapters: apiStory.chapters || []
      };
  
      if (normalizedStory.isPublic) {
        setPublicStories(prev => [...prev, normalizedStory]);
      } else {
        setPrivateStories(prev => [...prev, normalizedStory]);
      }
    } catch (error) {
      console.error('Error creating story:', error);
    }
  };


  const handleCreateChapter = async () => {
    if (!selectedStory) return;

    const newChapterObj: Chapter = {
      id: Date.now().toString(),
      title: newChapter.title,
      content: newChapter.content,
      chapterNumber: newChapter.chapterNumber || selectedStory.chapters.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    const updatedStory = {
      ...selectedStory,
      chapters: [...selectedStory.chapters, newChapterObj],
      updatedAt: new Date().toISOString()
    }

    if (updatedStory.isPublic) {
      setPublicStories(prev => 
        prev.map(story => story.id === updatedStory.id ? updatedStory : story)
      )
    } else {
      setPrivateStories(prev => 
        prev.map(story => story.id === updatedStory.id ? updatedStory : story)
      )
    }

    setNewChapter({
      title: '',
      content: '',
      chapterNumber: updatedStory.chapters.length + 1
    })
    setIsCreatingChapter(false)
    setSelectedStory(updatedStory)
  }

  // Add function to toggle story publicity
  const toggleStoryPublicity = async (story: Story) => {
    try {
      const response = await fetch(`/api/stories/${story.id}/visibility`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_public: !story.isPublic })
      });
  
      if (response.ok) {
        const updatedStory: Story = {
          ...story,
          isPublic: !story.isPublic,
          updatedAt: new Date().toISOString()
        };
  
        if (updatedStory.isPublic) {
          setPublicStories(prev => [...prev, updatedStory]);
          setPrivateStories(prev => prev.filter(s => s.id !== story.id));
        } else {
          setPrivateStories(prev => [...prev, updatedStory]);
          setPublicStories(prev => prev.filter(s => s.id !== story.id));
        }
      }
    } catch (error) {
      console.error('Error updating story visibility:', error);
    }
  };
  
  // Add function to delete story
  const deleteStory = (story: Story) => {
    if (story.isPublic) {
      setPublicStories(prev => prev.filter(s => s.id !== story.id))
    } else {
      setPrivateStories(prev => prev.filter(s => s.id !== story.id))
    }
  }

  const openStoryDetails = (story: Story) => {
    setSelectedStory(story)
  }

  const closeStoryDetails = () => {
    setSelectedStory(null)
  }

  const addChapterToStory = (story: Story) => {
    setSelectedStory(story)
    setNewChapter({
      title: '',
      content: '',
      chapterNumber: story.chapters.length + 1
    })
    setIsCreatingChapter(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-6">
          <div className="flex items-center gap-6">
            <Avatar className="w-24 h-24 border-4 border-blue-500">
              <AvatarImage src="https://via.placeholder.com/100" />
              <AvatarFallback>{username[0]?.toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-4xl font-bold">{username}</h1>
              <p className="text-gray-400 mt-2">Story Weaver · World Builder</p>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary">Fantasy</Badge>
                <Badge variant="secondary">Sci-Fi</Badge>
                <Badge variant="secondary">Mystery</Badge>
              </div>
            </div>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 px-6 py-3">
            Follow
          </Button>
        </div>

        {/* Create Story Button */}
        <div className="mb-6">
          <Dialog open={isCreatingStory} onOpenChange={setIsCreatingStory}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700 px-6 py-3 flex items-center gap-2">
                <PlusCircle className="w-5 h-5" />
                Create New Story
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 text-white border-gray-700 max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create a New Story</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Fill in the details to start your new creative journey.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter story title"
                    value={newStory.title}
                    onChange={handleInputChange}
                    className="bg-gray-700 border-gray-600"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="summary">Summary</Label>
                  <Textarea
                    id="summary"
                    name="summary"
                    placeholder="Briefly describe your story..."
                    value={newStory.summary}
                    onChange={handleInputChange}
                    className="bg-gray-700 border-gray-600 min-h-[100px]"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="genre">Genre</Label>
                  <Select value={newStory.genre} onValueChange={handleGenreChange}>
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue placeholder="Select genre" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="fantasy">Fantasy</SelectItem>
                      <SelectItem value="sci-fi">Science Fiction</SelectItem>
                      <SelectItem value="mystery">Mystery</SelectItem>
                      <SelectItem value="romance">Romance</SelectItem>
                      <SelectItem value="thriller">Thriller</SelectItem>
                      <SelectItem value="horror">Horror</SelectItem>
                      <SelectItem value="historical">Historical Fiction</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="mainCharacters">Main Characters</Label>
                  <Textarea
                    id="mainCharacters"
                    name="mainCharacters"
                    placeholder="Describe your main characters..."
                    value={newStory.mainCharacters}
                    onChange={handleInputChange}
                    className="bg-gray-700 border-gray-600"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    id="isPublic"
                    checked={newStory.isPublic}
                    onCheckedChange={handleSwitchChange}
                  />
                  <Label htmlFor="isPublic">Make this story public</Label>
                </div>
              </div>

              <DialogFooter>
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={handleCreateStory}
                  disabled={!newStory.title || !newStory.summary || !newStory.genre}
                >
                  Create Story
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Create Chapter Dialog */}
        <Dialog open={isCreatingChapter} onOpenChange={setIsCreatingChapter}>
          <DialogContent className="bg-gray-800 text-white border-gray-700 max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Chapter to "{selectedStory?.title}"</DialogTitle>
              <DialogDescription className="text-gray-400">
                Create a new chapter for your story.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="chapterTitle">Chapter Title</Label>
                <Input
                  id="chapterTitle"
                  name="title"
                  placeholder="Enter chapter title"
                  value={newChapter.title}
                  onChange={handleChapterInputChange}
                  className="bg-gray-700 border-gray-600"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="chapterNumber">Chapter Number</Label>
                <Input
                  id="chapterNumber"
                  name="chapterNumber"
                  type="number"
                  min="1"
                  placeholder="Enter chapter number"
                  value={newChapter.chapterNumber}
                  onChange={handleChapterInputChange}
                  className="bg-gray-700 border-gray-600"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="chapterContent">Chapter Content</Label>
                <Textarea
                  id="chapterContent"
                  name="content"
                  placeholder="Write your chapter content..."
                  value={newChapter.content}
                  onChange={handleChapterInputChange}
                  className="bg-gray-700 border-gray-600 min-h-[200px]"
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700"
                onClick={handleCreateChapter}
                disabled={!newChapter.title || !newChapter.content}
              >
                Add Chapter
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Story Detail View */}
        {selectedStory && !isCreatingChapter && (
          <Card className="bg-gray-800 mb-8">
            <CardHeader className="border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <Button
                    variant="ghost"
                    className="mb-2 text-gray-400 hover:text-white p-0"
                    onClick={closeStoryDetails}
                  >
                    ← Back to Stories
                  </Button>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Book className="w-6 h-6" />
                    {selectedStory.title}
                    <Badge className="ml-2">{selectedStory.genre}</Badge>
                    {selectedStory.isPublic ? (
                      <Badge variant="secondary" className="ml-1">Public</Badge>
                    ) : (
                      <Badge variant="outline" className="ml-1">Private</Badge>
                    )}
                  </CardTitle>
                </div>
                <div>
                  <Button
                    onClick={() => addChapterToStory(selectedStory)}
                    className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                  >
                    <PlusCircle className="w-4 h-4" />
                    Add Chapter
                  </Button>
                </div>
              </div>
              <p className="text-gray-300 mt-2">{selectedStory.summary}</p>
              <div className="flex gap-6 mt-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  <span>{selectedStory.chapters.length} chapters</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{selectedStory.totalViews} views</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  <span>{selectedStory.averageRating}/5 ({selectedStory.ratingCount})</span>
                </div>
                <div>
                  <span>Created: {new Date(selectedStory.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="py-6">
              <h3 className="text-xl font-semibold mb-4">Chapters</h3>
              {selectedStory.chapters.length > 0 ? (
                <div className="space-y-3">
                 {selectedStory.chapters
  .sort((a, b) => a.chapterNumber - b.chapterNumber)
  .map((chapter) => (
    <Card key={chapter.id} className="bg-gray-700 hover:bg-gray-600 transition cursor-pointer">
                      <CardContent className="p-4 flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">
                            Chapter {chapter.chapterNumber}: {chapter.title}
                          </h4>
                          <p className="text-sm text-gray-400">
                            Last updated: {new Date(chapter.updatedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No chapters yet. Start building your story!</p>
                  <Button
                    onClick={() => addChapterToStory(selectedStory)}
                    className="mt-4 bg-blue-600 hover:bg-blue-700"
                  >
                    Create First Chapter
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {!selectedStory && (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-2 bg-gray-800">
              <TabsTrigger 
                value="public" 
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white"
              >
                Public Works
              </TabsTrigger>
              <TabsTrigger 
                value="private" 
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                Private Works
              </TabsTrigger>
              <TabsTrigger 
                value="discover" 
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
              >
                Discover Stories
              </TabsTrigger>
            </TabsList>

            {/* Public Tab Content */}
            <TabsContent value="public">
              <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <PenSquare className="w-6 h-6" />
                  Published Stories
                </h2>
                {publicStories.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {publicStories.map((story) => (
  <Card key={story.id} className="bg-gray-800 hover:bg-gray-700 transition overflow-hidden">  
                        <div className="h-40 bg-gray-700 relative">
                          {story.coverImage ? (
                            <img 
                              src={story.coverImage} 
                              alt={story.title} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-900 to-purple-900">
                              <Book className="w-12 h-12 text-white opacity-50" />
                            </div>
                          )}
                          <Badge className="absolute top-2 right-2">{story.genre}</Badge>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-lg mb-2">{story.title}</h3>
                          <p className="text-sm text-gray-300 mb-3 line-clamp-3">{story.summary}</p>
                          <div className="flex justify-between text-xs text-gray-400">
                            <div className="flex items-center gap-1">
                              <BookOpen className="w-4 h-4" />
                              <span>{story.chapters.length} chapters</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              <span>{story.averageRating}/5</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="px-4 py-3 bg-gray-750 flex justify-between">
                          <span className="text-xs text-gray-400">
                            Updated {new Date(story.updatedAt).toLocaleDateString()}
                          </span>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-blue-400 hover:text-blue-300 px-2"
                            onClick={() => openStoryDetails(story)}
                          >
                            View
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="p-8 bg-gray-800 text-center">
                    <p className="text-gray-400 mb-4">You don't have any public stories yet.</p>
                    <Button
                      onClick={() => setIsCreatingStory(true)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Create Your First Story
                    </Button>
                  </Card>
                )}
              </section>
            </TabsContent>

            {/* Private Tab Content */}
            <TabsContent value="private">
              <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Lock className="w-6 h-6" />
                  Drafts & Private Works
                </h2>
                {privateStories.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {privateStories.map((story) => (
  <Card key={story.id} className="bg-gray-800 hover:bg-gray-700 transition overflow-hidden">
                        <div className="h-40 bg-gray-700 relative">
                          {story.coverImage ? (
                            <img 
                              src={story.coverImage} 
                              alt={story.title} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-900">
                              <Lock className="w-12 h-12 text-white opacity-50" />
                            </div>
                          )}
                          <Badge className="absolute top-2 right-2" variant="outline">{story.genre}</Badge>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-lg mb-2">{story.title}</h3>
                          <p className="text-sm text-gray-300 mb-3 line-clamp-3">{story.summary}</p>
                          <div className="flex justify-between text-xs text-gray-400">
                            <div className="flex items-center gap-1">
                              <BookOpen className="w-4 h-4" />
                              <span>{story.chapters.length} chapters</span>
                            </div>
                            <span>Last updated: {new Date(story.updatedAt).toLocaleDateString()}</span>
                          </div>
                        </CardContent>
                        <CardFooter className="px-4 py-3 bg-gray-750 flex justify-between">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-green-400 border-green-500 hover:bg-green-900 hover:text-green-300"
                            onClick={() => toggleStoryPublicity(story)}
                          >
                            Make Public
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-400 hover:text-red-300 mr-2"
                            onClick={() => deleteStory(story)}
                          >
                            <Trash className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-blue-400 hover:text-blue-300"
                            onClick={() => openStoryDetails(story)}
                          >
                            View
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="p-8 bg-gray-800 text-center">
                    <p className="text-gray-400 mb-4">You don't have any private stories yet.</p>
                    <Button
                      onClick={() => setIsCreatingStory(true)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Create Your First Story
                    </Button>
                  </Card>
                )}
              </section>
            </TabsContent>

            <TabsContent value="discover">
    <section>
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <BookOpen className="w-6 h-6" />
        Discover Stories
      </h2>
      {isLoadingStories ? (
        <Card className="p-8 bg-gray-800 text-center">
          <p className="text-gray-400">Loading stories...</p>
        </Card>
      ) : discoverStories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {discoverStories.map((story) => (
  <Card key={story.id} className="bg-gray-800 hover:bg-gray-700 transition overflow-hidden">
              <div className="h-40 bg-gray-700 relative">
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-blue-900 to-purple-900">
                  <Book className="w-12 h-12 text-white opacity-50" />
                </div>
                <Badge className="absolute top-2 right-2">{story.genre}</Badge>
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg">{story.title}</h3>
                  <div className="flex flex-col items-end">
                    <Badge variant="outline" className="text-xs mb-1">
                      by {story.author_username}
                    </Badge>
                    {story.average_rating > 0 && (
                      <div className="flex items-center text-xs text-yellow-400">
                        <Star className="w-3 h-3 mr-1" />
                        {story.average_rating.toFixed(1)}
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-300 mb-3 line-clamp-3">{story.summary}</p>
                <div className="flex justify-between text-xs text-gray-400">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{story.chapter_count} chapters</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{story.total_views} views</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="px-4 py-3 bg-gray-750 flex justify-between">
                <span className="text-xs text-gray-400">
                  Updated {new Date(story.updated_at).toLocaleDateString()}
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-blue-400 hover:text-blue-300 px-2"
                  onClick={() => openStoryDetails(story)}
                >
                  Read
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-8 bg-gray-800 text-center">
          <p className="text-gray-400 mb-4">No public stories found from other users.</p>
        </Card>
      )}
    </section>
  </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  )
}


