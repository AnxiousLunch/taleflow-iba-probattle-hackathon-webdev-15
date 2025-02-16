import { connectDB } from '@/lib/db'
import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { RowDataPacket, ResultSetHeader } from 'mysql2'

export async function POST(req: Request) {
  const connection = await connectDB()
  
  try {
    const {
      title,
      summary,
      genre,
      mainCharacters,
      isPublic,
      authorUsername
    } = await req.json()

    const id = uuidv4()
    
    const [result] = await connection.execute<ResultSetHeader>(
      `INSERT INTO stories (
        id,
        title,
        summary,
        genre,
        main_characters,
        is_public
      ) VALUES (?, ?, ?, ?, ?, ?)`,
      [id, title, authorUsername, summary, genre, mainCharacters, isPublic]
    )

    if (result.affectedRows !== 1) {
      throw new Error('Failed to insert story')
    }

    const [[story]] = await connection.query<(Story & RowDataPacket)[]>(
      'SELECT * FROM stories WHERE id = ?',
      [id]
    )

    await connection.end()
    return NextResponse.json(story)
  } catch (error) {
    console.error('Error creating story:', error)
    await connection.end()
    return NextResponse.json(
      { error: 'Failed to create story' },
      { status: 500 }
    )
  }
}