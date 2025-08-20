import React, { useState } from 'react'

const App = () => {
  const [count, setCount] = useState(0)
  function handleCounter(){
    setCount(count+1)
  }
  return (
    <div><h1>{count}</h1>
    <button onClick={handleCounter}>+</button></div>
  )
}

export default App