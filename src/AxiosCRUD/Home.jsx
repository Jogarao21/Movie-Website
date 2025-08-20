import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/user')
      .then((res) => setData(res.data));
  }, []);

  function handleDelete(id) {
    axios.delete(`http://localhost:3000/user/${id}`)
      .then(() => {
        setData(prev => prev.filter(item => item.id !== id));
      });
  }

  return (
    <div className="container">
      <h2 className="heading">User Data</h2>

      <Link to="/create">
        <button className="add-button">+ Add New User</button>
      </Link>

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Sr No.</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>
                  <Link to={`/edit/${item.id}`}><button>Edit</button></Link>
                  <button onClick={() => handleDelete(item.id)} className="delete-button">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;

