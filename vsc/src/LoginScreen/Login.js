import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../Users/UserContext';
import './Login.css';

function Login() {
  const { login, darkMode } = useContext(UserContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = 'Username is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      let res = await fetch('http://localhost:8000/api/tokens', {
      method: 'POST',
      'headers': {
          'Content-Type': 'application/json',
        },
      body: JSON.stringify({username: formData.username, password: formData.password}),
    });
    const resBody = await res.json();
    if (res.status !== 200) {
      localStorage.setItem("authenticated", false);
      setLoginError(resBody.error);
      //return;
  }
       localStorage.setItem("authenticated", true);
       localStorage.setItem("token", resBody.token);
       localStorage.setItem("userId", resBody.user.id);
       localStorage.setItem("user",resBody.user)


       setLoginError('');
       login(resBody.user);
       navigate('/');
    
   
  } catch (error) {
    localStorage.setItem("authenticated", false);
    console.error('Error during login:', error);
  }

 
  };

  return (
    <div className={`login-container ${darkMode ? 'dark-theme' : ''}`}>
      <div className="login-box">
        <div className="logo">
          {/* Make the YouTube logo clickable using React Router's Link */}
          <Link to="/" className="logo-link">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" alt="YouTube Logo" />
          </Link>
        </div>
        <form onSubmit={handleSubmit}>
          <p className="required-fields">All fields are required</p>
          {loginError && <p className="error">{loginError}</p>}
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className={`form-control ${darkMode ? 'dark-mode-input' : ''}`}
              placeholder="Enter username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.username && <p className="error">{errors.username}</p>}
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className={`form-control ${darkMode ? 'dark-mode-input' : ''}`}
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <button type="submit" className="btn">Sign In</button>
        </form>
        <div className="text-center mt-3">
          <span>Don't have an account? <Link to="/signup" className="link-button">Sign Up</Link></span>
        </div>
      </div>
    </div>
  );
}

export default Login;