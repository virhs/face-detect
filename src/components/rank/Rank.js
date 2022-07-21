import React from 'react'

const Rank = ({name, entries}) => {
  return (
    <div style={{color:'white'}}>
      <h3>Hi {name} your entry count is...</h3>
      <h1>{entries}</h1>
    </div>
  )
}

export default Rank
