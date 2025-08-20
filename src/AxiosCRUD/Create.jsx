import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Create = () => {
  const [values, setValues] = useState({ name: "", email: "" });
  const navigate = useNavigate();

  function handleCreate(e) {
    e.preventDefault();
    axios.post('http://localhost:3000/user', values)
      .then(() => {
        navigate('/');
        alert("Data Created Successfully");
      });
  }

  return (
    <div className='form-container'>
      <form onSubmit={handleCreate}>
        <h1>CREATE DATA</h1>
        <input type='text' placeholder='Enter your name' onChange={(e) => setValues({ ...values, name: e.target.value })} name='name' value={values.name} />
        <input type='email' placeholder='Enter your email' onChange={(e) => setValues({ ...values, email: e.target.value })} name='email' value={values.email} />
        <button type='submit'>SUBMIT</button>
      </form>
    </div>
  );
};

export default Create;
