import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostList from './pages/PostList';
import SinglePost from './pages/SinglePost';
import PostForm from './pages/PostForm';
import Navbar from './components/Navbar';

function App() {
  const [newPost, setNewPost] = useState(null);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<PostList newPost={newPost} />} />
        <Route path="/posts/:id" element={<SinglePost />} />
        <Route path="/create" element={<PostForm onNewPost={setNewPost} />} />
        <Route path="/edit/:id" element={<PostForm editMode={true} />} />
      </Routes>
    </Router>
  );
}

export default App; 