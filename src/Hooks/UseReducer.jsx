import React, { useReducer } from 'react'

const App = () => {
  const initializerArg = 0
  const [state, dispatch] = useReducer(reducer, initializerArg)
  function reducer(state, action){
    switch (action){
      case "increment":
        return state+1 
      case "decrement":
        return state - 1
      default:
        return state


    }

  }
  return (
    <div>
      <h1>Counter:{state}</h1>
      <button onClick={()=>dispatch("increment")}>Increment</button>
      <button onClick={()=>dispatch("decrement")}>Decrement</button>
    </div>
  )
}

export default App