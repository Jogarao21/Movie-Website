import React, { useState } from 'react'

const withCounter = (OriginalComponent) => {
  function NewComponent(){
    const[count, setCount]=useState(0)

    function incrementCount(){
      setCount(count+1)
    }
    
  return (
    
      <div>
        <h1>{count}</h1>
        <OriginalComponent incrementCount={incrementCount}/>
        
      </div>
   
  )
    
  }
  return NewComponent
  

}

export default withCounter