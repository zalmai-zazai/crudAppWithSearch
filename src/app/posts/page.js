'use client';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [currentPostId, setCurrentPostId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5004/posts');
      const sortedPosts = response.data.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      setPosts(sortedPosts);
    } catch (error) {
      console.log(error);
    }
  };
  const handelDelete = async (id) => {
    // const currentPost = posts.find((post) => post.id === id);

    // if (currentPost) {
    await axios.delete(`http://localhost:5004/posts/${currentPostId}`);
  };

  const handelUpdate = async (e) => {
    e.preventDefault();
    //   await axios.put(`http://localhost:5004/posts/`, { title, content });
    await axios.put(`http://localhost:5004/posts/${currentPostId}`, {
      title,
      content,
    });
  };
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const openModal = (post) => {
    setCurrentPostId(post.id);
    setTitle(post.title);
    setContent(post.content);
  };
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve user from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const logoutUser = () => {
    localStorage.setItem('user', '');
  };

  useEffect(() => {
    fetchData();
  }, [posts]);

  return (
    user && (
      <div className="container">
        <h4 className="my-4"> Welcome, {user}</h4>
        <div className="mt-4 d-flex  justify-content-between ">
          <h1>All Posts</h1>
          <input
            type="text"
            className="form-control w-25"
            placeholder="Search by title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Link className="btn btn-primary " href={'/posts/create'}>
            Create Post
          </Link>
          <Link
            className="mx-2 btn btn-primary"
            onClick={logoutUser}
            href={'/'}
          >
            {' '}
            Logout
          </Link>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.map((post) => (
              <tr key={post.id}>
                <th scope="row">{post.id}</th>
                <td>{post.title}</td>
                <td>{post.content}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-success mx-3"
                    data-bs-toggle="modal"
                    data-bs-target={`#updateModal-${post.id}`}
                    onClick={() => openModal(post)}
                  >
                    Update
                  </button>

                  <div
                    className="modal fade"
                    id={`updateModal-${post.id}`}
                    tabIndex="-1"
                    //   aria-labelledby={`exampleModalLabel-${post.id}`}
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id={`exampleModalLabel-${post.id}`}
                          >
                            Update record: {post.id}
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <form onSubmit={handelUpdate}>
                          <div className="modal-body">
                            <div className="mb-3">
                              <label
                                htmlFor="recipient-name"
                                className="col-form-label"
                              >
                                Title:
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="recipient-name"
                                value={title}
                                onChange={(e) => {
                                  setTitle(e.target.value);
                                }}
                              />
                            </div>
                            <div className="mb-3">
                              <label
                                htmlFor="message-text"
                                className="col-form-label"
                              >
                                Content:
                              </label>
                              <textarea
                                className="form-control"
                                id="message-text"
                                value={content}
                                onChange={(e) => {
                                  setContent(e.target.value);
                                }}
                              ></textarea>
                            </div>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                            <button
                              className="btn btn-primary"
                              data-bs-dismiss="modal"
                            >
                              Update
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  {/* Start of delete button and modal */}
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-toggle="modal"
                    data-bs-target={`#deleteModal-${post.id}`}
                    onClick={() => openModal(post)}
                  >
                    Delete
                  </button>
                  <div
                    className="modal fade"
                    aria-hidden="true"
                    id={`deleteModal-${post.id}`}
                    tabIndex="-1"
                    aria-labelledby={`exampleModalLabel-${post.id}`}
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="exampleModalLabel"
                          >
                            Do you want delete record: {post.id}?
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body">...</div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Close
                          </button>
                          <button
                            onClick={() => handelDelete()}
                            type="button"
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );
};

export default Posts;
