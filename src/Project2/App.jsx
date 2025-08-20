import React, { useState } from 'react'

const App = () => {
  const Images=[
    'https://cdn.pixabay.com/photo/2025/05/02/23/23/australia-9574728_1280.jpg',
    'https://cdn.pixabay.com/photo/2025/06/15/21/04/golden-retriever-puppy-amber-9661916_1280.jpg',
    'https://cdn.pixabay.com/photo/2025/04/01/11/26/blue-tit-9506658_640.jpg']
  const[activeIndex, setActiveIndex]= useState(0)
  function handlePrev(){
     setActiveIndex((activeIndex-1+Images.length)%Images.length)
  }
  function handleNext(){
     setActiveIndex((activeIndex+1)%Images.length)
  }
  return (
    <div>
      <h1>Carouse1</h1>
      <img src={Images[activeIndex]} alt="" height="500px" width="500px"/>
      <button onClick={handlePrev}>Prev</button>
      <button onClick={handleNext}>Next</button>
    </div>
  )
}

export default App