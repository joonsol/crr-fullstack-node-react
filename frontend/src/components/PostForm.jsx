import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PostForm.css'; // ✅ 분리된 CSS

const PostForm = () => {
  const API = import.meta.env.VITE_API_URL; // 예: http://localhost:3000

  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody]   = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  // 목록 불러오기 (GET)
  const fetchPosts = async () => {
    try {
      setLoading(true);
      setErr('');
      const res = await axios.get(`${API}/api/posts`);
      const data = Array.isArray(res.data) ? res.data : res.data.posts ?? [];
      setPosts(data);
    } catch (error) {
      console.log('데이터 불러오기 실패', error);
      setErr('목록을 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(); // 최초 1회
  }, []);

  // 생성 (POST)
  const onCreate = async () => {
    if (!title.trim()) return;
    try {
      setLoading(true);
      await axios.post(`${API}/api/posts`, { title, body });
      setTitle('');
      setBody('');
      await fetchPosts();
    } catch {
      alert('등록 실패');
    } finally {
      setLoading(false);
    }
  };

  // 수정 (PUT)
  const onUpdate = async (post) => {
    const id = post._id ?? post.id;
    const nextTitle = prompt('새 제목', post.title ?? '');
    if (nextTitle == null) return;
    const nextBody = prompt('새 내용', post.body ?? '');
    if (nextBody == null) return;

    try {
      setLoading(true);
      await axios.put(`${API}/api/posts/${id}`, { ...post, title: nextTitle, body: nextBody });
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

      {/* 작성 폼 */}
      <div className="post-controls">
        <input
          className="post-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목"
          aria-label="제목 입력"
        />
        <textarea
          className="post-textarea"
          rows={3}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="내용(선택)"
          aria-label="내용 입력"
        />
        <div className="post-buttons">
          <button className="btn" onClick={onCreate} disabled={loading}>등록</button>
          <button className="btn" onClick={fetchPosts} disabled={loading}>새로고침</button>
        </div>
      </div>

      {/* 상태 표시 */}
      {loading && <p className="post-info">불러오는 중…</p>}
      {err && <p className="post-error">{err}</p>}

      {/* ✅ 목록 (ul) */}
      <ul className="post-list">
        {posts.map((post) => {
          const key = post._id ?? post.id;
          return (
            <li key={key} className="post-item">
              <h4 className="post-item-title">{post.title}</h4>
              <p>
                {post.content}
              </p>
              {post.body && <p className="post-item-body">{post.body}</p>}
              <div className="post-actions">
                <button className="btn-secondary" onClick={() => onUpdate(post)} disabled={loading}>수정</button>
                <button className="btn-danger" onClick={() => onDelete(key)} disabled={loading}>삭제</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PostForm;
