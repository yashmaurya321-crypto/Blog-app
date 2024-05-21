import React, { useEffect, useState } from 'react';
import Blogs from '../blogs';
import img1 from '../Images/download.png';
import '../Styles/right.css'
import axios from 'axios';
function Right() {
  const[person, setpreson] = useState([])

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("User")));
  useEffect(()=>{
const getdata = async() =>{
  try {
    const response = await axios.get("http://localhost:5000/person")
setpreson(response.data)
  } catch (error) {
    console.log(error)
  }
}
getdata()
   },[])
   const handelfollow = async(e)=>{
    try{
  const handel = await axios.put("http://localhost:5000/follow", {followerid : user._id, reciverid : e})
  alert("Your are following "+ handel.data.name)
    }catch(e){
  
    }
  }
  return (
    <div>
      <div>
        <h3><b>Follow top writers</b></h3>
        <div className= 'scrollable-list'style={{ overflowY: 'scroll', maxHeight: '450px', msOverflowX: 'hidden', msOverflowY: 'hidden' , maxWidth : '300px'}}>
          {person.map((blog, index) => (
            <div key={index} style={{ display: 'flex', borderRadius: '1px', borderColor: 'lightgray', borderBottom: '1px solid lightgray', alignItems: 'center', marginBottom: 5 }}>
              <div className='col-sm-8'> <img src={img1} alt="Profile" style={{ maxHeight: 35 }} />
              <span style={{ marginLeft: 10 }}>{blog.name}</span></div>
             <div className='col-sm-4'><button onClick={() => handelfollow(blog.author._id)} type="button" className="btn btn-outline-dark" style={{ height: 44 }}>Follow</button></div>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Right;
