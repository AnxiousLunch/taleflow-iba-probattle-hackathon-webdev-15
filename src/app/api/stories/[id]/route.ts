import { connectDB } from '@/lib/db'
import { NextResponse } from 'next/server'
import { RowDataPacket } from 'mysql2'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const connection = await connectDB()
  
  try {
    // Fetch story details
    const [stories] = await connection.query<(Story & RowDataPacket)[]>(`
      SELECT s.*, COUNT(c.id) as chapter_count
      FROM stories s
      LEFT JOIN chapters c ON s.id = c.story_id
      WHERE s.id = ?
      GROUP BY s.id
    `, [params.id])

    if (!stories || stories.length === 0) {
      await connection.end()
      return NextResponse.json(
        { error: 'Story not found' },
        { status: 404 }
      )
    }

    // Fetch chapters for the story
    const [chapters] = await connection.query<(chapters & RowDataPacket)[]>(`
      SELECT id, title, chapter_number, created_at, updated_at
      FROM chapters
      WHERE story_id = ?
      ORDER BY chapter_number ASC
    `, [params.id])

    const story = stories[0]
    story.chapters = chapters

    await connection.end()
    return NextResponse.json(story)
  } catch (error) {
    console.error('Error fetching story details:', error)
    await connection.end()
    return NextResponse.json(
      { error: 'Failed to fetch story details' },
      { status: 500 }
    )
  }
}