import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Comm from '../Images/comment.png';
import Like from '../Images/Like (1).png';
import img1 from '../Images/download.png';
import Nav from './Nav';

function Full_Blog() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("User")));
  const [expandedBlogs, setExpandedBlogs] = useState({});
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const { title } = useParams();
  const [expanded, setExpanded] = useState(false);
const [comment, setcomment] = useState("")
  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/blog");
        setBlogs(response.data); // Ensure blogs is set properly
        const blog = response.data.find(item => item.title === title);
        if (blog) {
          setBlog(blog);
          setComments(blog.comments || []);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    getBlogs();
  }, [title]);

  if (!blog) {
    return <p>Blog not found</p>;
  }

  const data = blogs.filter(item => item.author.name === blog.author.name);
const handelfollow = async(e)=>{
  try{
const handel = await axios.put("http://localhost:5000/follow", {followerid : user._id, reciverid : e})
alert("Your are following "+ handel.data.name)
  }catch(e){

  }
}
const handel_comment = async(e) =>{
  try{
const res = await axios.put("http://localhost:5000/comment",{blogid : e, personid : user._id, comment} ) 
alert("Comment added success fully")
  }catch(e){
    console.log(e)
  }
}
const likepost = async(e)=>{
try{
const data = axios.put("http://localhost:5000/like", {id : e})
}catch(e){
console.log(e)
}
}
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const toggleExpandBlog = (index) => {
    setExpandedBlogs(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  return (
    <div>
      <Nav />
      <div className='container' style = {{display: 'flex', flexDirection : 'column'}} >
        <h1>{blog.title}</h1><br/>
        <h3>By {blog.author.name}</h3>
        <p>{blog.content}</p>
        <p>Category: {blog.category}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
            <img src={Comm} style={{ maxHeight: '20px' }} alt="Comments" />
          </div>
          <div><img src={Like} style={{ maxHeight: '20px' }} alt="Like" onClick={()=>likepost(blog._id)}/>   {blog.likes}</div>
        </div>
      </div>
      <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">Comments</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <div>
            <h4>Add Comment : </h4>
            <div class="input-group mb-3">
  <input type="text" class="form-control" onChange={(e)=>setcomment(e.target.value)} placeholder="Comment" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
  <div class="input-group-append">
  <button type="button" onClick={()=>handel_comment(blog._id)} class="btn btn-outline-dark">Send</button>
  </div>
</div>
          </div>
          <div>
            {comments.length > 0 ? comments.map((item, index) => (
              <div key={index} style={{ display: 'flex', flexDirection : 'column', justifyContent : "flex-start" }}>
                <div style={{ display: 'flex', alignItems: 'center', flexDirection : 'row' }}>
                  <img src={img1} style={{ maxHeight: 25 }} alt="User" />
                  <h6>{item.name}:</h6>
                </div>
                <p style = {{marginLeft : '30px'}}>{item.comment}</p>
              </div>
            )) : <h1>No comments</h1>}
          </div>
        </div>
      </div>
      <div  className='container' style = {{display: 'flex', flexDirection : 'column', marginTop : "20px"}}>
      
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop : '100px' }}>
          <h1> Author: {blog.author.name}</h1>
          <button onClick={() => handelfollow(blog.author._id)} type="button" className="btn btn-outline-dark" style={{ height: 44 }}>Follow</button>
        </div>
        
        <div className='row'>
          {data.map((relatedBlog, index) => (
            <div className='col-sm-6' key={index}>
              <div className='card' style={{ marginBottom: '10px' }}>
                <div className='card-body'>
                  <div
                    style={{
                      borderRadius: '1px',
                      borderColor: 'lightgray',
                      borderBottom: '1px solid lightgray',
                      marginBottom: 10,
                      cursor: 'pointer',
                      paddingBottom: 15
                    }}>
                    <Link to={`/blog/${relatedBlog.title}`} style={{ textDecoration: 'none', color: 'black' }}>
                      <div style={{ display: 'flex', marginBottom: 3, alignItems: 'center' }}>
                        <img src={img1} style={{ maxHeight: 25 }} alt="Author" />
                        <b>{relatedBlog.author.name}</b>
                      </div>
                      <h4><b>{relatedBlog.title}</b></h4>
                      <p>{expandedBlogs[index] ? relatedBlog.content : `${relatedBlog.content.slice(0, 150)}...`}</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div><b>Category</b>: {relatedBlog.category}</div>
                        <button onClick={() => handelfollow(blog.author._id)} type="button" className="btn btn-outline-dark" style={{ height: 44 }}>Follow</button>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Full_Blog;
