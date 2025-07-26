'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('view_count', { ascending: false })
        .limit(100)

      if (error) {
        console.error('Supabase 에러:', error)
      } else {
        setPosts(data)
      }
    }

    fetchPosts()
  }, [])

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">🔥 MLBPARK 인기글</h1>
      <div className="space-y-4">
        {posts.map((post) => (
          <a
            key={post.url}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white shadow-md rounded-xl p-4 hover:bg-gray-100 transition"
          >
            <h2 className="text-lg font-semibold">{post.title}</h2>
            <div className="text-sm text-gray-500 mt-1 flex justify-between">
              <span>조회수: {post.view_count.toLocaleString()}</span>
              <span>{post.write_time}</span>
            </div>
          </a>
        ))}
      </div>
    </main>
  )
}
