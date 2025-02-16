export interface Story {
    id: string;
    title: string;
    content: string;
    author: string;
    authorId: string;
    createdAt: string;
    likes: number;
    comments: number;
    author_username: string;
    isPublic: boolean;
    reactions: {
      likes: number;
      hearts: number;
      bookmarks: number;
    };
    tags: string[];
  }

  export interface ApiStory {
    id: string
    title: string
    summary: string
    genre: string
    is_public: boolean
    created_at: string
    updated_at: string
    chapters: Chapter[]
    cover_image?: string
    total_views: number
    average_rating: number
    rating_count: number
    author_username: string
  }
  
  export interface Comment {
    id: string;
    content: string;
    author: {
      id: string;
      name: string;
      avatar: string;
    };
    createdAt: string;
    likes: number;
  }