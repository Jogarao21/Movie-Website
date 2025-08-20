import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './AxiosCRUD/Home';
import Create from './AxiosCRUD/Create';
import Edit from './AxiosCRUD/Edit';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<Create />} />
        <Route path='/edit/:id' element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;