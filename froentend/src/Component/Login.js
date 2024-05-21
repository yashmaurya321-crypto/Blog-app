import React, { useState } from 'react'
import img1 from '../Images/image.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
function Login() {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState(0)
    const navigate = useNavigate()
    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
       const send = await axios.post("http://localhost:5000/login", {email,password})
      
       const { token, user } = send.data;
       console.log("Received token:", token);
       localStorage.setItem("token", token);
    localStorage.setItem("User", JSON.stringify(user));
       
       navigate('/home');
        }catch(err){
            console.log(err)
        }
        
      };
    
      return (
        <div>
         
          <header className="header">
            
                  <img src={img1}alt="logo" width="40"  />
               
          </header>
    
         
          <div className="container">
            <div className="row py-5 mt-4 align-items-center">
             
              <div className="col-md-5 pr-lg-5 mb-5 mb-md-0">
                <img src="https://res.cloudinary.com/mhmd/image/upload/v1569543678/form_d9sh6m.svg" alt="" className="img-fluid mb-3 d-none d-md-block" />
                <h1>Sign In</h1>
               
              </div>
    
             
              <div className="col-md-7 col-lg-6 ml-auto">
                <form onSubmit={handleSubmit}>
                  <div className="row">
    
                   
                  
    
                    
                    
    
                  
                    <div className="input-group col-lg-12 mb-4">
                      
                      <input type="email" onChange={(e)=>setemail(e.target.value)} name="email" placeholder="Email Address" className="form-control bg-white border-left-0 border-md" />
                    </div>
           
                  
    
                 
                    <div className="input-group col-lg-6 mb-4">
                    
                      <input type="password" onChange={(e)=>setpassword(e.target.value)} name="password" placeholder="Password" className="form-control bg-white border-left-0 border-md" />
                    </div>
    
                  
                   
     
                    <div className="form-group col-lg-12 mx-auto mb-0">
                      <button onClick={handleSubmit}type="submit" className="btn btn-primary btn-block py-2 btn-dark">
                        <span className="font-weight-bold">Sign in </span>
                      </button>
                    </div>
    
                
                    <div className="text-center w-100">
                      <p className="text-muted font-weight-bold">Not Registered? <a href="#" className="text-primary ml-2">Register</a></p>
                    </div>
    
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    };

export default Login