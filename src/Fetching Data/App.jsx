import React, { useEffect, useState } from 'react';
import './App.css'

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((d) => {
        if (Array.isArray(d)) {
          setData(d);
        } else {
          console.error("Expected an array but got:", d);
          setData([]);
        }
      })
      .catch((err) => console.error("API error:", err));
  }, []);

  return (
    <div className='App'>
      {
        data.map((item, index) => (
          <div className='Card' key={index}>
            <img src={item.image} alt="image" height={'100px'} width={'100px'} />
            <p>{item.title}</p>
            <p>{item.description}</p>
            <p>{item.price} 💲</p>
            <p>{item?.rating?.rate ?? 'N/A'} ⭐</p>
          </div>
        ))
      }
    </div>
  );
};

export default App;
