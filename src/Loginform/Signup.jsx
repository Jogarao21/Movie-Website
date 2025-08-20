import React from 'react';
import '../Loginform/Signup.scss';
import '../Loginform/Login1.scss';

function Signup({ onSwitch }) {
  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Signup Form</h2>
        <div className="toggle-btns">
          <button onClick={onSwitch}>Login</button>
          <button className="active">Signup</button>
        </div>
        <form>
          <input type="email" placeholder="Email Address" required />
          <input type="password" placeholder="Password" required />
          <input type="password" placeholder="Confirm password" required />
          <button type="submit" className="submit-btn">Signup</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
