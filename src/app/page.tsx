'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Post {
  id: string
  title: string
  url: string
  views: number
  created_at: string
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [error, setError] = useState<null | Error>(null)

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100)

      if (error) setError(error)
      else setPosts(data as Post[])
    }

    fetchPosts()
  }, [])

  if (error) {
    return <div className="text-red-600 text-center mt-10">❌ 에러 발생: {error.message}</div>
  }

  return (
    <main className="min-h-screen bg-[#f9fafb] px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">🔥 MLBPARK 인기 글</h1>
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="bg-white p-5 rounded-xl shadow transition hover:shadow-lg">
              <a href={post.url} target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-blue-600 hover:underline">
                {post.title}
              </a>
              <div className="text-sm text-gray-500 mt-1">
                조회수: {post.views.toLocaleString()} | 등록일: {new Date(post.created_at).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
