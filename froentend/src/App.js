import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Component/Login';
import Register from './Component/Register';
import Write from './Component/Write';
import PrivateRoute from './Component/PrivateRoute';
import Home from './Component/Home';
import Full_Blog from './Component/Full_Blog';
import Profile from './Component/Profile';
function App() {
  const token = localStorage.getItem("token")
console.log(token)


  return (
    <div>
       <Router>
      <Routes>
      

        
        <Route path="/login" element={<Login />} />
        <Route path="/write" element={<Write />} />
       
        <Route path="/register" element={<Register />} />

       
        <Route
          path="/home"
          element={
            
                <Home />
             
        }
        />
        
      <Route path = '/blog/:title' element= {<Full_Blog/>}/>
      <Route path = '/profile' element = {<Profile/>}/>
      </Routes>
     
    </Router>
   
    </div>
   
  );
};
export default App