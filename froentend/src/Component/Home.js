import React from 'react'
import Nav from './Nav'
import Left from './Left'
import Right from './Right'
import '../Styles/home.css'
function Home() {
  return (
    <div>
<Nav/>

<div class="row">
<div class="col-8"style={{ borderRadius: '2px', borderColor: 'lightgray',borderRight :  '1px solid lightgray' }}>
    <div style = {{margin : 45}}>
    <Left/>
    </div>
    </div>
<div class="col-4"style={{ borderRadius: '2px', borderColor: 'lightgray'  }}>
    <div style = {{margin : 45}}>
    <Right/>
    </div>
   
    
    </div>

  </div>
    
   
    </div>
  )
}

export default Home