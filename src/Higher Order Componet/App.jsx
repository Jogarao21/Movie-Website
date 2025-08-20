import React from 'react'
import withCounter from './Higher Order Componet/withCounter.jsx'

const App = ({incrementCount}) => {
  return (
    <div>
      <button onClick={incrementCount}>Increment</button>
    </div>
  )
}

export default withCounter(App)