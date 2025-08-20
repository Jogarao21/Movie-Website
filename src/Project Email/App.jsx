import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import './App.css'

  const App = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_1wpct48', 'template_30vtqdo', form.current, {
        publicKey: 'TAj1lvL3S07yI0mye',
      })

  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="user_name" />
      <label>Email</label>
      <input type="email" name="user_email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  );
};
export default App