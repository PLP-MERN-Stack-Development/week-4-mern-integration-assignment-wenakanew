import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useApi from '../hooks/useApi';
import { postService } from '../services/api';

function PostList({ newPost }) {
  const { data: posts, loading, error } = useApi(postService.getAllPosts);
  const [optimisticPosts, setOptimisticPosts] = useState([]);

  React.useEffect(() => {
    if (newPost) {
      setOptimisticPosts((prev) => [newPost, ...prev]);
    }
  }, [newPost]);

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>Error loading posts.</div>;
  if ((!posts || posts.length === 0) && optimisticPosts.length === 0) return <div>No posts found.</div>;

  const allPosts = [...optimisticPosts, ...(posts || [])];

  return (
    <div>
      <h2>Blog Posts</h2>
      <ul>
        {allPosts.map((post) => (
          <li key={post._id || post.title}>
            <Link to={`/posts/${post._id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList; 