import React from 'react'
import './imagelink.css'

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
  return (
    <div className='f4'>
      <p className='f3'>This Magic Brain will detect face in the pictures you provide. Give it a try!!</p>
      <div className='pa4 br3 shadow-5 w-40 center form' style={{display:'flex', justifyContent:'center'}}>
        <input className='f4 br3 pa2 w-70 center' type="text" placeholder='Enter Image URL' onChange={onInputChange} />
        <button className='w-30 br3 grow f4 ph3 pv2 dib black bg-light' onClick={onSubmit}>Detect</button>
      </div>
    </div>
  )
}

export default ImageLinkForm
