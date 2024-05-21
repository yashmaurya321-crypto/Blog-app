import React, { useState } from 'react';
import Nav from './Nav';
import '../Styles/write.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Write() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("User")));

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async () => {
    if (!title) {
      alert("Enter title");
    } else if (!category) {
      alert("Enter category");
    } else if (!content) {
      alert("Enter content");
    } else {
      try {
        await axios.post("http://localhost:5000/blog", {
          author: user._id,
          title,
          content,
          category,
          comments: []
        });
        navigate('/profile');
      } catch (error) {
        console.error(error);
      }
    }
  };

  const categories = ['Tech', 'Education', 'Business', 'Politics'];

  return (
    <div>
      <Nav />
      <div
        className="container"
        style={{
          justifyContent: 'center',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="animated-input-fields">
          <div className="input-field">
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              className="input-field__input input-field__input--large"
              placeholder=" "
            />
            <span className="input-field__label">Title</span>
          </div>

          <div className="input-field">
            <textarea
              value={content}
              onChange={handleContentChange}
              className="input-field__input input-field__textarea input-field__textarea--large"
              placeholder=" "
            />
            <span className="input-field__label">Content</span>
          </div>

          <div className="input-field">
            <h6>Category</h6>
            <div className="radio-group" style = {{display : 'flex', flexDirection : 'row'}}>
              {categories.map((cat) => (
                <label key={cat} className="radio-label">
                  <input
                    type="radio"
                    value={cat}
                    checked={category === cat}
                    onChange={handleCategoryChange}
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="btn btn-outline-dark btn-medium"
            onClick={handleSubmit}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Write;
