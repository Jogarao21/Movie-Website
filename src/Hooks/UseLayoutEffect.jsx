import React, { useEffect, useLayoutEffect, useState } from 'react'

const App = () => {
  const[count, setCount]=useState(0)
  useLayoutEffect(()=>{
    document.body.style.backgroundColor = count % 2==0? "blue" : "red"
  }, [count])
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={()=>setCount(count+1)}>+</button>
    </div>
  )
}

export default App