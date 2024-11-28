'use client';
import React, { useState } from 'react';

const UpdateModal = ({ post, currentPostId, content, title }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const handelUpdate = async () => {
    //   await axios.put(`http://localhost:5004/posts/`, { title, content });
    await axios.put(`http://localhost:5004/posts/${currentPostId}`, {
      title,
      content,
    });
  };

  return (
    <div
      className="modal fade"
      id={`updateModal-${post.id}`}
      tabIndex="-1"
      aria-labelledby={`exampleModalLabel-${post.id}`}
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
                <label htmlFor="recipient-name" className="col-form-label">
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
                <label htmlFor="message-text" className="col-form-label">
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
              <button className="btn btn-primary" data-bs-dismiss="modal">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
