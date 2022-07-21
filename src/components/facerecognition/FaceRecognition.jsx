import React from 'react'
import './FaceRecognition.css'

const FaceRecognition = ({ imageURL, box }) => {
  return (
    <div className='ma center'>
      <div className='mt2 absolute'>
        <img id='image' src={imageURL} width='500px' height='auto' alt=""/>
        <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
      </div>
    </div>
  )
}

export default FaceRecognition
