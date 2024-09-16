import React, { useContext, useState ,useEffect} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../Users/UserContext';
import './EditUser.css';

function EditUser() {
  const { darkMode,currentUser ,setCurrentUser} = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();
    const userid = parseInt(id);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    profilePicture: null,
    videos: []
  });
  
  useEffect(() => {
    if (currentUser) {
      setFormData({
        username: currentUser.username,
        password: currentUser.password,
        confirmPassword: currentUser.password,
        profilePicture: currentUser.profilePicture,
        videos: currentUser.videos
        
      });
    }
  }, [currentUser]);


  const [errors, setErrors] = useState({});

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
    formDataToSend.append('password', formData.password);
    formDataToSend.append('profilePicture', formData.profilePicture);
       
      // Send the FormData to the server
      let res = await fetch(`http://localhost:8000/api/users/${userid}`, {
      method: 'PUT',
      'headers': {
          Authorization: localStorage.getItem("token"),

        },
      body: formDataToSend
    });
    const resbody = await res.json();

    if (res.ok){
        setCurrentUser(resbody.user)
      navigate('/'); // Link back to the login screen
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
    console.log('event.target.files[0]: ', event.target.files[0]);
    const reader = new FileReader();

    reader.onload = (e) => {
      setFormData((prevFormData)=>{
        let temp = {...prevFormData}
        temp.profilePicture=e.target.result
        return temp
      })
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // CSS class for dark mode
  const themeClass = darkMode ? 'dark-theme' : '';

  return (
    <div className={`edituser-container ${themeClass}`}>
      <div className="edituser-box">
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
              disabled
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
              <img src={formData.profilePicture } alt="Profile Preview" className="preview-image" />
            )}
          </div>
          <button type="submit" className="btn">Update</button>
        </form>
        
      </div>
    </div>
  );
}

export default EditUser;
