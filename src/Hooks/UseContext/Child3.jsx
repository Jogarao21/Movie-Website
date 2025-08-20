import React, {useContext} from 'react'
import { Storage1, Storage2 } from './App'

const Child3 = () => {
   const name = useContext(Storage1)
   const age = useContext(Storage2)
  return (
    <div>
     <h1>My name is {name} and My age is {age}</h1>
    </div>
  )
}

export default Child3