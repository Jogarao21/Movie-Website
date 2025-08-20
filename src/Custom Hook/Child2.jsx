import React from 'react'
import useCounter from './Counter'

const Child2 = () => {
  const {open, OpenModal} = useCounter()
  return (
    <div>
      <h1>Child2</h1>
      <button onClick={OpenModal}>open</button>
      {open&& (
        <>
        <h1>Can you see me child2</h1>
        <button onClick={OpenModal}>close</button>
        </>
      )}
      
      </div>
  )
}

export default Child2