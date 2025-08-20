import React, { useState } from 'react'

const App = () => {
  const [data,  setData] = useState([])
  const [value, SetValue] = useState("")
  function handleAdd(){
    setData([...data, value])
  }
  function handleDelete(index){
    setData(data.filter((item, i)=>index!==i))
  }
  return (
    <div>
      <input onChange={(e)=>SetValue(e.target.value)} placeholder='Enter your Task' />
      <button onClick={handleAdd}>Add</button>
      {data.map((item, index)=>{
        return(
          <div key={index}>
            <span>{item}</span>
            <button onClick={()=>handleDelete(index)}>Delete</button>
          </div>
        )
      })}
    </div>
  )
}

export default App