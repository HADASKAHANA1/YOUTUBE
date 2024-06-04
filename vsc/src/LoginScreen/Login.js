import React from 'react';
import './Login.css';

function Login({ onToggle }) {
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" alt="YouTube Logo" />
        </div>
        <form>
          <div className="form-group">
            <label>Username</label>
            <input type="text" className="form-control" placeholder="Enter username" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Password" />
          </div>
          <button type="submit" className="btn">Sign In</button>
        </form>
        <div className="text-center mt-3">
          <span>Don't have an account? <button onClick={onToggle} className="link-button">Sign Up</button></span>
        </div>
      </div>
    </div>
  );
}

export default Login;
