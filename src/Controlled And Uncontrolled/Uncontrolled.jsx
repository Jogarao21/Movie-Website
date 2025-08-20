import React, { useRef } from 'react'

const Uncntrolled = () => {
  const inputRef = useRef('')
  function handleClick(){
    console.log(inputRef.current.value)
  }
  return (
    <div>
      <h1>Uncontrolled</h1>
      <input ref={inputRef} placeholder='Uncontrolled Component' />
      <button onClick={handleClick}>Submit</button>
    </div>
  )
}

export default Uncntrolled