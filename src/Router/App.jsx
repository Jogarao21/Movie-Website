import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Router/Home'
import About from './Router/About'
import Navbar from './Router/Navbar'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='*' element={<h1>404 PAGE NOT FOUND</h1>}/>          
        </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App