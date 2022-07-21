import React from 'react'
import Tilt from 'react-parallax-tilt';
import brain from './brain.png'
import './logo.css'
const Logo = () => {
  return (
    <div className='ma4 mt0' style={{height:'150px',width:'150px'}}>
      <Tilt>
       <div className='brain' style={{ height: '100px', backgroundColor:'pink'}}>
         <img  style={{paddingTop:'23px'}} src={brain} alt="brain" />
       </div>
      </Tilt>
    </div>
  )
}

export default Logo
