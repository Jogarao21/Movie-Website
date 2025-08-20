import React from 'react'

const Child = ({name, Dark}) => {
  return (
    <>
     <div>My name is {name}</div>
    <button onClick={Dark}>Dark</button>
    </>

  )
}

export default React.memo(Child)