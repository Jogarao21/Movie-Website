import React, { useState } from 'react'

const App = () => {
   const [name, setName] =useState("")
  return (
    <div>
      <input onChange={(e)=>setName(e.target.value)} />
      <h1>My Name is {name}</h1>
    </div>
  )
}

export default App