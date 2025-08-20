import React, { useState } from 'react'

const Controlled = () => {
  const[data, setData]=useState('')
  function handleClick(){
    console.log(data);

  }
  return (
    <div>
      <h1>Controlled</h1>
      <input placeholder='Controlled Component' onChange={(e)=>setData(e.target.value)} />
      <button onClick={handleClick}>Submit</button>
    </div>
  )
}

export default Controlled