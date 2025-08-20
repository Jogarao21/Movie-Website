import React, { useRef } from 'react'

const App = () => {
  const inputRef = useRef()
  function handleClick(){
    console.log(inputRef);
    console.log(inputRef.current);
    console.log(inputRef.current.value);
    inputRef.current.focus()
  }

  return (
    <div>
      <input ref={inputRef} placeholder='Enter your name' />
      <button onClick={handleClick}>Submit</button>
    </div>
  )
}

export default App