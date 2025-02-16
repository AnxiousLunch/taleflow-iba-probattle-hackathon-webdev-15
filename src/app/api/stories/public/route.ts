import { connectDB } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const connection = await connectDB()
  
  try {
    const { searchParams } = new URL(req.url)
    const currentUser = searchParams.get('currentUser')

    const [stories] = await connection.query(`
      SELECT 
        s.*,
        COUNT(DISTINCT c.id) as chapter_count
      FROM stories s
      LEFT JOIN chapters c ON s.id = c.story_id
      WHERE s.is_public = TRUE
      AND s.author_username != ?
      GROUP BY 
        s.id, s.title, s.author_username, s.summary, 
        s.genre, s.is_public, s.created_at, s.updated_at
      ORDER BY s.created_at DESC
    `, [currentUser])

    await connection.end()
    return NextResponse.json(stories)
  } catch (error) {
    console.error('Error fetching public stories:', error)
    await connection.end()
    return NextResponse.json(
      { error: 'Failed to fetch public stories' },
      { status: 500 }
    )
  }
}