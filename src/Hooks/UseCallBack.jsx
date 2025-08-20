import React, { useCallback, useMemo, useState } from 'react'
import Child from './Child'
const App = () => {
  const[add, setAdd]=useState(0)
  const[sub, setSub]=useState(0)
  const name= 'shiva shankar'

  const Dark = useCallback(()=>{
    document.body.style.backgroundColor="black";
    document.body.style.color="white";
  })

  const memozied = useMemo(()=>{
    console.log("Hello can u see me")
    return add*2
  }, [add])
  return (
    <div>
      <h1>Add: {add}</h1>
      <h1>Sub: {sub}</h1>
      <h1>Mul: {memozied}</h1>
      <button onClick={()=>setAdd(add + 1)}>Increment</button>
      <button onClick={()=>setSub(sub - 1)}>Decrement</button>
      <Child name={name} Dark={Dark}/>
    </div>
  )
}

export default App