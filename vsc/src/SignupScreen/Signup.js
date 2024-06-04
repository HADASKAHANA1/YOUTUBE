import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';

function Signup() {
  // State for form data
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    displayName: '',
    profilePicture: null,
  });

  // State for form errors
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profilePicture: URL.createObjectURL(file) });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    // Validate username
    if (!formData.username) {
      newErrors.username = 'Username is required';
    }

    // Validate password length
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Validate display name
    if (!formData.displayName) {
      newErrors.displayName = 'Display name is required';
    }

    // Validate profile picture
    if (!formData.profilePicture) {
      newErrors.profilePicture = 'Profile picture is required';
    }

    // Check if there are any errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors if validation passes
    setErrors({});
    
    // Handle registration
    console.log('Form submitted successfully:', formData);
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <div className="logo">
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" alt="YouTube Logo" />
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
            <p className="password-requirement">Password must be at least 8 characters long</p>
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
            <label>Display Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter display name"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
            />
            {errors.displayName && <p className="error">{errors.displayName}</p>}
          </div>
          <div className="form-group">
            <label>Profile Picture</label>
            <input type="file" className="form-control" onChange={handleImageChange} />
            {errors.profilePicture && <p className="error">{errors.profilePicture}</p>}
            {formData.profilePicture && (
              <img src={formData.profilePicture} alt="Profile Preview" className="preview-image" />
            )}
          </div>
          <button type="submit" className="btn">Sign Up</button>
        </form>
        <div className="text-center mt-3">
          <span>Already have an account? <Link to="/" className="link-button">Sign In</Link></span>
        </div>
      </div>
    </div>
  );
}

export default Signup;
