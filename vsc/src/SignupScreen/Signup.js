import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../Users/UserContext';
import './Signup.css';

function Signup() {
  const {  darkMode } = useContext(UserContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    profilePicture: null,
    videos: []
  });

  const [errors, setErrors] = useState({});
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.username) {
      newErrors.username = 'Username is required';
    }

    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.profilePicture) {
      newErrors.profilePicture = 'Profile picture is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
  
    
    try {
       // יצירת אובייקט FormData
    const formDataToSend = new FormData();
    formDataToSend.append('username', formData.username);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('profilePicture', formData.profilePicture);

      // Send the FormData to the server
      let res = await fetch('http://localhost:8000/api/users', {
      method: 'POST',
      
      body:formDataToSend
    });
    const resbody = await res.json();

    if (res.ok){
      setRegistrationSuccess(true);
      navigate('/login'); // Link back to the login screen
    }
    if(!res.ok){
      alert(resbody.error)

    }
  } catch (error) {
    console.error('Error during registration:', error);
    // Handle registration errors
  }

  };

  const handleFileUpload = (event) => {
     const file = event.target.files[0];
  setFormData((prevFormData) => ({
    ...prevFormData,
    profilePicture: file
  }));
  };


  // CSS class for dark mode
  const themeClass = darkMode ? 'dark-theme' : '';

  return (
    <div className={`signup-container ${themeClass}`}>
      <div className="signup-box">
        <div className="logo">
          {/* Make the YouTube logo clickable using React Router's Link */}
          <Link to="/" className="logo-link">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" alt="YouTube Logo" />
          </Link>
        </div>
        <form onSubmit={handleSubmit}>
          <p className="required-fields">All fields are required</p>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
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
              className="form-control"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
          </div>
          <div className="form-group">
            <label>Profile Picture</label>
            <input id="file-upload" type="file" name="fileUpload" className="form-control" accept='image/png, image/jpeg' onChange={handleFileUpload} />
            {errors.profilePicture && <p className="error">{errors.profilePicture}</p>}
            {formData.profilePicture && (
              <img src={URL.createObjectURL(formData.profilePicture) } alt="Profile Preview" className="preview-image" />
            )}
          </div>
          <button type="submit" className="btn">Sign Up</button>
        </form>
        <div className="text-center mt-3">
          <span>Already have an account? <Link to="/login" className="link-button">Sign In</Link></span>
        </div>
        {registrationSuccess && <p className="registration-success">Registration successful! You are now signed up.</p>}
      </div>
    </div>
  );
}

export default Signup;