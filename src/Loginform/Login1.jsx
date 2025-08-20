import React from 'react';
import '../Loginform/Login1.scss';
import '../Loginform/Signup.scss';

function Login1({ onSwitch }) {
  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Login Form</h2>
        <div className="toggle-btns">
          <button className="active">Login</button>
          <button onClick={onSwitch}>Signup</button>
        </div>
        <form>
          <input type="email" placeholder="Email Address" required />
          <input type="password" placeholder="Password" required />
          <a href="#" className="forgot-link">Forgot password?</a>
          <button type="submit" className="submit-btn">Login</button>
        </form>
        <p className="bottom-text">Not a member? <span onClick={onSwitch}>Signup now</span></p>
      </div>
    </div>
  );
}

export default Login1;
