import React, { useEffect, useState } from 'react';
import '../Styles/left.css'; 
import { Link } from 'react-router-dom';
import axios from 'axios';
import Like from '../Images/Like (1).png';
import img1 from '../Images/download.png';

const Left = () => {
  const categories = ['Tech', 'Education', 'Business', 'Politics'];
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("User")));
  const [Blog, setBlog] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCategory, setCurrentCategory] = useState(categories[0]); 
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [expandedBlogs, setExpandedBlogs] = useState({});

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/blog");
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    getBlogs();
  }, []);

  useEffect(() => {
    const filtered = Blog.filter(blog => blog.category === currentCategory);
    const sortedFilteredBlogs = filtered.sort((a, b) => b.likes - a.likes);
  setFilteredBlogs(sortedFilteredBlogs);
  }, [Blog, currentCategory]);

  const nextSlide = () => {
    const nextIndex = (currentIndex + 1) % categories.length;
    setCurrentIndex(nextIndex);
    setCurrentCategory(categories[nextIndex]);
  };
  const handelfollow = async(e)=>{
    try{
  const handel = await axios.put("http://localhost:5000/follow", {followerid : user._id, reciverid : e})
  alert("Your are following "+ handel.data.name)
    }catch(e){
  
    }
  }
  const prevSlide = () => {
    const prevIndex = (currentIndex - 1 + categories.length) % categories.length;
    setCurrentIndex(prevIndex);
    setCurrentCategory(categories[prevIndex]);
  };

  const toggleExpand = (index) => {
    setExpandedBlogs(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };
  const likepost = async(e)=>{
    try{
    const data = axios.put("http://localhost:5000/like", {id : e})
    }catch(e){
    console.log(e)
    }
    }
  return (
    <div>
      <div className="text-slider-container">
        <div className="text-slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {categories.map((category, index) => (
            <div key={index} className="slide">
              <h2>{category}</h2>
            </div>
          ))}
        </div>
        <button className="prev-button" onClick={prevSlide}>&#10094;</button>
        <button className="next-button" onClick={nextSlide}>&#10095;</button>
      </div>

      <div className="filtered-blogs-container">
        {filteredBlogs.length > 0 ? (
          <div className="scrollable-list">
            {filteredBlogs.map((blog, index) => (
              <div key={index} style={{ borderRadius: '1px', borderColor: 'lightgray', borderBottom: '1px solid lightgray',marginBottom : 10, cursor : 'pointer', paddingBottom : 15}}>
                <Link to={`/blog/${blog.title}`} style = {{textDecoration : 'none', color : 'black'}}>
                  <div style={{display : 'flex', marginBottom : 3, alignItems : 'center', justifyContent : 'space-between'}} >
                  <div style={{display : 'flex', marginBottom : 3, alignItems : 'center'}}>
                    <img src = {img1} style={{ maxHeight: 25 }} alt="Author" />
                    <b>{blog.author.name}</b>
                  </div>
                  <div>
                  <img src={Like} style={{ maxHeight: '20px' }} alt="Like" onClick={()=>likepost(blog._id)} />   {blog.likes}
                  </div>
                  
                  </div>
                 
                  <h4><b>{blog.title}</b></h4>
                  <p>{expandedBlogs[index] ? blog.content : blog.content.slice(0, 150)}...</p>
                  {/* {blog.content.length > 100 && !expandedBlogs[index] && (
                    <p onClick={() => toggleExpand(index)}>Read More</p>
                  )} */}
                  <div style = {{display: 'flex', justifyContent : 'space-between'}}><div><b>Category</b>: {blog.category}</div> <button onClick={() => handelfollow(blog.author._id)} type="button" className="btn btn-outline-dark" style={{ height: 44 }}>Follow</button></div>
                  {/* Add more details as needed */}
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p>No blogs found for the selected category.</p>
        )}
      </div>
    </div>
  );
};

export default Left;
