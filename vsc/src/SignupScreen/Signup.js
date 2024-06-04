import React from 'react';
import './Signup.css';

function Signup({ onToggle }) {
  return (
    <div className="signup-container">
      <div className="signup-box">
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
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" className="form-control" placeholder="Confirm Password" />
          </div>
          <div className="form-group">
            <label>Display Name</label>
            <input type="text" className="form-control" placeholder="Enter display name" />
          </div>
          <div className="form-group">
            <label>Profile Picture</label>
            <input type="file" className="form-control" />
          </div>
          <button type="submit" className="btn">Sign Up</button>
        </form>
        <div className="text-center mt-3">
          <span>Already have an account? <button onClick={onToggle} className="link-button">Sign In</button></span>
        </div>
      </div>
    </div>
  );
}

export default Signup;
