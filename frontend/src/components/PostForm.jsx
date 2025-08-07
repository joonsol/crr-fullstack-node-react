import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostForm = () => {
  const [posts, setPosts] = useState([]);

  // 서버에서 데이터 불러오기
  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/posts');
      setPosts(res.data);
    } catch (error) {
      console.error('데이터 불러오기 실패:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📃 게시글 목록</h2>
      {posts.length === 0 ? (
        <p>게시글이 없습니다.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id || post._id}>
              <strong>{post.title}</strong> - {post.body || post.content}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostForm;
