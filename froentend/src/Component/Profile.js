import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import Like from '../Images/Like (1).png';
import img1 from '../Images/download.png';
import '../Styles/profile.css'; 
import axios from 'axios';
import Login from './Login';
import { Link } from 'react-router-dom';
function Profile() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("User")));
    const [blogs, setBlogs] = useState([]);
    const [following, setfoll] = useState(null)
    console.log(user.followings)
    useEffect(() => {
        const fetchUserDetails = async () => {
          try {
            
            const response = await axios.post('http://localhost:5000/follower', { userIds : user.followings });
           setfoll(response.data)
          } catch (error) {
            console.error(error);
      
          }
        };
        fetchUserDetails()
    },[user.following])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post("http://localhost:5000/profile_blog", { authorid: user._id });
                setBlogs(response.data);
                console.log(following)
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };
        if (user) {
            fetchData();
        }
    }, [user]);
    const likepost = async(e)=>{
        try{
        const data = axios.put("http://localhost:5000/like", {id : e})
        }catch(e){
        console.log(e)
        }
        }
    const toggleContent = (index) => {
        setBlogs(prevBlogs => {
            const updatedBlogs = [...prevBlogs];
            updatedBlogs[index].expanded = !updatedBlogs[index].expanded;
            return updatedBlogs;
        });
    };

    return (
        <div>
            <Nav />
            <div className="container text-center">
                <div className="row">
                    <div className="col-md-8 " style = {{}}>
                        <div>
                        <h2>Your Blogs :</h2>
                        <div className="row">
                            {blogs.map((blog, index) => (
                                <div key={blog._id} className="col-md-6">
                                   <Link to={`/blog/${blog.title}`} style = {{textDecoration : 'none', color : 'black'}}>
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div><h3 className="card-title">{blog.title}</h3> <img src={Like} style={{ maxHeight: '20px' }} alt="Like" onClick={()=>likepost(blog._id)} />   {blog.likes}</div>
                                            
                                            <p className="card-text">{blog.content.slice(0, 100)}</p>
                                            {blog.content.length > 2 && (
                                                <button className="btn btn-link" onClick={() => toggleContent(index)}>
                                                    {blog.expanded ? 'Read Less' : 'Read More'}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    </Link>
                                    
                                </div>
                            ))}
                        </div>
                        </div>
                        <div>
                       
                        </div>
                    </div>
                    <div className="col-md-4 right-column">
                        <div className="">
                            <img src={img1} alt="Profile" className="profile-image" />
                            <h2 className="profile-name">{user.name}</h2>
                            <Link to = '/write'>
                            <button type="button" class="btn btn-outline-dark">Write</button></Link>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
