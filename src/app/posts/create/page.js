'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      // await axios.post('http://localhost:5004/posts', { title, content });
      await axios.post('../api/posts', { title, content });
      router.push('/');
    } catch (error) {
      console.log('Error fron front end' + error);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Create Post</h1>

      <form onSubmit={handelSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Content
          </label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <button className="btn btn-primary">Create</button>
      </form>
    </div>
  );
};

export default CreatePost;
