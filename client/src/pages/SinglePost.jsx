import React from 'react';
import { useParams } from 'react-router-dom';
import useApi from '../hooks/useApi';
import { postService } from '../services/api';

function SinglePost() {
  const { id } = useParams();
  const { data: post, loading, error } = useApi(postService.getPost, id);

  if (loading) return <div>Loading post...</div>;
  if (error) return <div>Error loading post.</div>;
  if (!post) return <div>Post not found.</div>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p><strong>Category:</strong> {post.category?.name || 'Uncategorized'}</p>
      <div>{post.content}</div>
    </div>
  );
}

export default SinglePost; 