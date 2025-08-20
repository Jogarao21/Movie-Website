import React, { useEffect, useMemo, useState } from 'react';
import './App.css'
const App = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((d) => setData(d));
  }, []);

  const filterProducts = useMemo(() => {
    if (category === "All") {
      return data;
    } else {
      return data.filter((item) => item.category === category);
    }
  }, [category, data]);

  return (
    <div className='App'>
      <input
        placeholder='Search Products'
        onChange={(e) => setSearch(e.target.value)}
      />
      <select onChange={(e) => setCategory(e.target.value)} value={category}>
        <option>All</option>
        <option>electronics</option>
        <option>jewelery</option>
        <option>men's clothing</option>
        <option>women's clothing</option>
      </select>
      <div className='product-Container'>
        {filterProducts
          .filter((item) =>
            item.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((item) => {
            return (
              <div key={item.id} className='card'>
                <img src={item.image} alt={item.title} />
                <p>{item.title}</p>
                <p>{item.price} 💲</p>
                <p>{item.category}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default App;
