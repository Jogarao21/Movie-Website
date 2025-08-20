import React, { useEffect } from 'react'

const App = () => {
  useEffect(()=>{
    let a = document.getElementById('btn1')
    a.addEventListener('click', ()=>{
      document.body.style.backgroundColor = 'blue'
    })
  })
  return (
    <div>
      <button id='btn1'>Click</button>
    </div>
  )
}

export default App