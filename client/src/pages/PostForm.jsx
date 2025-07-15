import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { postService, categoryService } from '../services/api';

function PostForm({ editMode, onNewPost }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    content: '',
    category: '',
    author: '',
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    categoryService.getAllCategories().then(setCategories);
    if (editMode && id) {
      setLoading(true);
      postService.getPost(id)
        .then((data) => {
          setForm({
            title: data.title || '',
            content: data.content || '',
            category: data.category?._id || '',
            author: data.author?._id || '',
          });
        })
        .catch(() => setError('Failed to load post'))
        .finally(() => setLoading(false));
    }
  }, [editMode, id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (editMode && id) {
        await postService.updatePost(id, form);
      } else {
        // Optimistic UI update: call onNewPost immediately
        if (onNewPost) onNewPost({ ...form, _id: Math.random().toString(36).substr(2, 9) });
        await postService.createPost(form);
      }
      setSuccess(true);
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      setError('Failed to save post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>{editMode ? 'Edit Post' : 'Create Post'}</h2>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>Post saved!</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input name="title" value={form.title} onChange={handleChange} required />
        </div>
        <div>
          <label>Content:</label>
          <textarea name="content" value={form.content} onChange={handleChange} required />
        </div>
        <div>
          <label>Category:</label>
          <select name="category" value={form.category} onChange={handleChange} required>
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Author ID:</label>
          <input name="author" value={form.author} onChange={handleChange} required />
        </div>
        <button type="submit" disabled={loading}>
          {editMode ? 'Update' : 'Create'} Post
        </button>
      </form>
    </div>
  );
}

export default PostForm; 