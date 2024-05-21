import React, { useState } from 'react';
import axios from 'axios'
import img1 from '../Images/image.png'
const Register = () => {

    const[name , setname] = useState('')
    const[email , setemail] = useState('')
    const[password , setpassword] = useState('')
    const[conform , setconform] = useState('')
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(password !== conform){
        alert("correct conform password")
        return
    }
    if(!email){
        alert("email required")
        return
    }

   try{
const send = await axios.post("http://localhost:5000/register", {name, email, password})
console.log(send.data)
localStorage.setItem("User", send.data)
   }catch(e){
    console.log(e)
   }
  };

  return (
    <div>
     
      <header className="header">
        <nav className="navbar navbar-expand-lg navbar-light py-3">
          <div className="container">
           
            <a href="#" className="navbar-brand">
              <img src={img1}alt="logo" width="40" />
            </a>
          </div>
        </nav>
      </header>

     
      <div className="container">
        <div className="row py-5 mt-4 align-items-center">
         
          <div className="col-md-5 pr-lg-5 mb-5 mb-md-0">
            <img src="https://res.cloudinary.com/mhmd/image/upload/v1569543678/form_d9sh6m.svg" alt="" className="img-fluid mb-3 d-none d-md-block" />
            <h1>Create an Account</h1>
           
          </div>

         
          <div className="col-md-7 col-lg-6 ml-auto">
            <form onSubmit={handleSubmit}>
              <div className="row">

               
                <div className="input-group col-lg-6 mb-4">
                 
                  <input type="text" onChange={(e)=> setname(e.target.value)} name="firstName" placeholder="First Name" className="form-control bg-white border-left-0 border-md" />
                </div>

              
                <div className="input-group col-lg-12 mb-4">
                  
                  <input type="email" name="email" onChange={(e) => {
        setemail(e.target.value);
    }}placeholder="Email Address" className="form-control bg-white border-left-0 border-md" />
                </div>
       
                <div className="input-group col-lg-12 mb-4">
                  
                
                  <input type="tel" name="phone" placeholder="Phone Number" className="form-control bg-white border-md border-left-0 pl-3" />
                </div>

             
                <div className="input-group col-lg-6 mb-4">
                
                  <input type="number" onChange={(e)=>setpassword(e.target.value)}name="password" placeholder="Password" className="form-control bg-white border-left-0 border-md" />
                </div>

              
                <div className="input-group col-lg-6 mb-4">
                 
                  <input type="text" onChange={(e)=>setconform(e.target.value)}name="passwordConfirmation" placeholder="Confirm Password" className="form-control bg-white border-left-0 border-md" />
                </div>
 
                <div className="form-group col-lg-12 mx-auto mb-0">
                  <button type="submit" className="btn btn-primary btn-block py-2 btn-dark">
                    <span className="font-weight-bold">Create your account</span>
                  </button>
                </div>

            
                <div className="text-center w-100">
                  <p className="text-muted font-weight-bold">Already Registered? <a href="/login" className="text-primary ml-2">Login</a></p>
                </div>

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
