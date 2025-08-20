import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Edit = () => {
  const [values, setValues] = useState({ name: "", email: "" });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3000/user/${id}`)
      .then((res) => setValues(res.data));
  }, [id]);

  function handleEdit(e) {
    e.preventDefault();
    axios.put(`http://localhost:3000/user/${id}`, values)
      .then(() => {
        navigate('/');
        alert("Data Updated Successfully");
      });
  }

  return (
    <div className='form-container'>
      <form onSubmit={handleEdit}>
        <h1>EDIT DATA</h1>
        <input type='text' placeholder='Enter your name' onChange={(e) => setValues({ ...values, name: e.target.value })} name='name' value={values.name} />
        <input type='email' placeholder='Enter your email' onChange={(e) => setValues({ ...values, email: e.target.value })} name='email' value={values.email} />
        <button type='submit'>SUBMIT</button>
      </form>
    </div>
  );
};

export default Edit;
