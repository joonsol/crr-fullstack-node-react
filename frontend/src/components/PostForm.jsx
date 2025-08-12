import React, { useEffect, useState } from 'react'
import axios from "axios"
const PostForm = () => {
  const [posts, setPosts] = useState([])
  const API = import.meta.env.VITE_API_URL

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${API}/api/posts`)
      console.log(res)
      setPosts(res.data)
    } catch (error) {
      console.log('데이터 불러오기 실패', error)
    }
  }
  useEffect(() => {
    fetchPosts()
  })

  return (
    <div>
      <ul>

      {posts.map((post)=>(
        <li key={post._id}>
          {post.title}
        </li>
      ))}
      </ul>
    </div>
  )
}

export default PostForm