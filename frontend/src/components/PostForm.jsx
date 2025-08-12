import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "./PostForm.css"
const PostForm = () => {

  const API = import.meta.env.VITE_API_URL

  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');


  const fetchPosts = async () => {
    try {
      setLoading(true)
      setErr('')
      const res = await axios.get(`${API}/api/posts`)
      const data = Array.isArray(res.data) ? res.data : res.data.posts ?? []

      setPosts(data)

      console.log(data)


    } catch (error) {

      console.log('데이터 불러오기 실패', error);
      setErr('목록을 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchPosts()
  }, [])


  const onCreate = async () => {
    if (!title.trim()) return
    try {
      setLoading(true)
      await axios.post(`${API}/api/posts`, { title, content })
      setTitle('')
      setContent('')
      await fetchPosts()
    } catch (error) {
      alert("등록실패")
    } finally {
      setLoading(false)
    }
  }
  // 수정 (PUT)
  const onUpdate = async (post) => {
    const id = post._id ?? post.id;
    const nextTitle = prompt('새 제목', post.title ?? '');
    if (nextTitle == null) return;
    const nextContent = prompt('새 내용', post.content ?? '');
    if (nextContent == null) return;

    try {
      setLoading(true);
      await axios.put(`${API}/api/posts/${id}`, { ...post, title: nextTitle, content: nextContent });
      await fetchPosts();
    } catch {
      alert('수정 실패');
    } finally {
      setLoading(false);
    }
  };

  // 삭제 (DELETE)
  const onDelete = async (id) => {
    if (!confirm('정말 삭제할까요?')) return;
    try {
      setLoading(true);
      await axios.delete(`${API}/api/posts/${id}`);
      await fetchPosts();
    } catch {
      alert('삭제 실패');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-wrap">
      <h2 className="post-title">Posts</h2>
      <div className="post-controls">
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}

          className="post-input"
          placeholder='제목' />
        <textarea value={content} rows={3}
          placeholder='내용입력'
          className='post-textarea'
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <div className="post-buttos">
          <button className="btn" onClick={onCreate} disabled={loading}>등록</button>
          <button className="btn" disabled={loading}>새로고침</button>
        </div>

      </div>

      {/* 상태 표시 */}
      {loading && <p className="post-info">불러오는 중…</p>}
      {err && <p className="post-error">{err}</p>}

      <ul className="post-list">
        {posts.map((post) => {

          const key = post._id ?? post.id

          return (
            <li key={post._id}>
              <h4 className="post-item-title">{post.title}</h4>
              {post.content && <p className="post-item-content">{post.content}</p>}
              <div className="post-actions">
                <button className="btn-secondary" onClick={() => onUpdate(post)} disabled={loading}>수정</button>
                <button className="btn-danger" onClick={() => onDelete(key)} disabled={loading}>삭제</button>
              </div>
            </li>
          )
        })}
      </ul>

    </div>
  )
}

export default PostForm