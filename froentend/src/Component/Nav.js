import React, { useState } from 'react';
import img1 from '../Images/image.png';
import '../Styles/nav.css';
import img2 from '../Images/download.png';
import Blogs from '../blogs';
import { Link } from 'react-router-dom';
function Nav() {
  const [data, setData] = useState(Blogs);
  const [query, setQuery] = useState('');
  const [clicked, setClicked] = useState('');

  const handleInputChange = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    const filteredBlogs = Blogs.filter(blog =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setData(filteredBlogs);
  };


  return (
    <nav className="navbar navbar-expand-lg justify-content-between" style={{ borderRadius: '2px', borderColor: 'lightgray', borderBottom: '2px solid gray' }}>
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <a className="navbar-brand" href="/home">
            <img src={img1} alt="Logo" width="34" height="34" className="d-inline-block align-text-top" />
          </a>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <div className="input-group position-relative" style={{ maxWidth: 245 }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  aria-label="Search"
                  value={query}
                  onChange={handleInputChange}
                />
                {query && (
                  <div className="scrollable-list position-absolute bg-white border" style={{ top: '100%', left: 0, right: 0, maxHeight: 200, overflowY: 'auto', zIndex: 1000 }}>
                    {data.map((blog, index) => (
                      <div key={index} className="p-2 border-bottom">
                        <Link to={`/blog/${blog.title}`} style = {{textDecoration : 'none', color : 'black'}}>
                        <h6 className="m-0">{blog.title}</h6>
                        </Link>
                        
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </li>
          </ul>
        </div>
        <div className="d-flex align-items-center">
          <Link to = '/profile'> <img src={img2} alt="Profile" style={{ maxHeight: '34px' }} /></Link>
         
        </div>
      </div>
    </nav>
  );
}

export default Nav;

