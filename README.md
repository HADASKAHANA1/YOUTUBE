# project

אשלח לךאת כל הקוד ותמצא לי את הבעיה:
import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

const defaultVideos = [
  { id: '1', title: 'Video 1', url: '/videos/video 1.mp4', thumbnail: '/thumbnails/1.png', description: 'Description for Video 1', uploadedBy: 'User 1' },
  { id: '2', title: 'Video 2', url: '/videos/video 2.mp4', thumbnail: '/thumbnails/2.png', description: 'Description for Video 2', uploadedBy: 'User 2' },
  { id: '3', title: 'Video 3', url: '/videos/video 3.mp4', thumbnail: '/thumbnails/3.png', description: 'Description for Video 3', uploadedBy: 'User 3' },
  { id: '4', title: 'Video 4', url: '/videos/video 4.mp4', thumbnail: '/thumbnails/4.png', description: 'Description for Video 4', uploadedBy: 'User 4' },
  { id: '5', title: 'Video 5', url: '/videos/video 5.mp4', thumbnail: '/thumbnails/5.png', description: 'Description for Video 5', uploadedBy: 'User 5' },
  { id: '6', title: 'Video 6', url: '/videos/video 6.mp4', thumbnail: '/thumbnails/6.png', description: 'Description for Video 6', uploadedBy: 'User 6' },
  { id: '7', title: 'Video 7', url: '/videos/video 7.mp4', thumbnail: '/thumbnails/7.png', description: 'Description for Video 7', uploadedBy: 'User 7' },
  { id: '8', title: 'Video 8', url: '/videos/video 8.mp4', thumbnail: '/thumbnails/8.png', description: 'Description for Video 8', uploadedBy: 'User 8' },
  { id: '9', title: 'Video 9', url: '/videos/video 9.mp4', thumbnail: '/thumbnails/9.png', description: 'Description for Video 9', uploadedBy: 'User 9' },
  { id: '10', title: 'Video 10', url: '/videos/video 10.mp4', thumbnail: '/thumbnails/10.png', description: 'Description for Video 10', uploadedBy: 'User 10' }
];

const UserContextProvider = (props) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [videos, setVideos] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setVideos(defaultVideos);
  }, []);

  const addUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  const login = (username) => {
    const user = users.find(user => user.username === username);
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const addVideo = (newVideo, uploader) => {
    newVideo.id = Math.random().toString(36).substr(2, 9);
    newVideo.uploadedBy = uploader.username; // Set uploadedBy field to uploader's username
    setVideos([...videos, newVideo]);

    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        videos: [...currentUser.videos, newVideo.id]
      });
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const editVideo = (updatedVideo) => {
    setVideos(videos.map((video) => (video.id === updatedVideo.id ? updatedVideo : video)));
  };
  
  const deleteVideo = (videoId) => {
    setVideos(videos.filter((video) => video.id !== videoId));
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        videos: currentUser.videos.filter((id) => id !== videoId)
      });
    }
  };
  
  return (
    <UserContext.Provider value={{ users, addUser, login, logout, currentUser, setCurrentUser, videos, addVideo, editVideo, deleteVideo, darkMode, toggleDarkMode }}>
      {props.children}
    </UserContext.Provider>
  );
  
};

export default UserContextProvider;

/* Light mode */
.edit-video-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f0f0;
  }
  
  .edit-video-box {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 400px;
  }
  
  .edit-video-box h2 {
    text-align: center;
    margin-bottom: 1rem;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
  }
  
  .form-control {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .btn {
    display: block;
    width: 100%;
    padding: 0.5rem;
    background-color: #ff0000;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .btn:hover {
    background-color: #cc0000;
  }
  
  .preview-image {
    display: block;
    margin-top: 1rem;
    max-width: 100%;
    border-radius: 5px;
  }
  
  .error {
    color: red;
    font-size: 0.9rem;
    margin-top: 0.5rem;
    background-color: #ffebee;
    padding: 0.5rem;
    border: 1px solid #ffcdd2;
    border-radius: 5px;
  }
  
  /* Dark mode */
  .edit-video-container.dark-theme {
    background-color: #333;
    color: #ccc; /* Text color in dark mode */
  }
  
  .edit-video-box.dark-theme {
    background: #444;
    box-shadow: 0 2px 10px rgba(255, 255, 255, 0.1);
  }
  
  .edit-video-box.dark-theme h2 {
    color: #eee; /* Heading color in dark mode */
  }
  
  .form-control.dark-theme {
    background-color: #555;
    color: #ccc;
  }
  
  .btn.dark-theme {
    background-color: #ff4444;
    color: #fff;
  }
  
  .btn.dark-theme:hover {
    background-color: #cc4444;
  }
  
  .error.dark-theme {
    color: #ffb3b3;
    background-color: #441111;
    border: 1px solid #ffeeee;
  }
  
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { UserContext } from '../Users/UserContext';
import './EditVideo.css';

function EditVideo() {
  const { id } = useParams();
  const { videos, editVideo, currentUser, darkMode } = useContext(UserContext);
  const navigate = useNavigate();
  const currentVideo = videos.find((vid) => vid.id === id);

  const [formData, setFormData] = useState({
    title: '',
    thumbnail: null,
    videoFile: null,
    description: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (currentVideo) {
      setFormData({
        title: currentVideo.title,
        thumbnail: currentVideo.thumbnail,
        videoFile: currentVideo.url,
        description: currentVideo.description
      });
    }
  }, [currentVideo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, thumbnail: URL.createObjectURL(file) });
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, videoFile: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.title) {
      newErrors.title = 'Title is required';
    }

    if (!formData.thumbnail) {
      newErrors.thumbnail = 'Thumbnail is required';
    }

    if (!formData.videoFile) {
      newErrors.videoFile = 'Video file is required';
    }

    if (!formData.description) {
      newErrors.description = 'Description is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const updatedVideo = {
      id: currentVideo.id,
      title: formData.title,
      thumbnail: formData.thumbnail,
      url: formData.videoFile,
      description: formData.description,
      uploadedBy: currentVideo.uploadedBy
    };
    editVideo(updatedVideo);

    navigate(`/videos/${id}`);
  };

  return (
    <div className={`edit-video-container ${darkMode ? 'dark-theme' : ''}`}>
      <div className={`edit-video-box ${darkMode ? 'dark-theme' : ''}`}>
        <div className="logo-container">
          <Link to="/" className="logo-link">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" alt="YouTube Logo" className="youtube-logo" />
          </Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className={`form-control ${darkMode ? 'dark-theme' : ''}`}
              placeholder="Enter title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && <p className={`error ${darkMode ? 'dark-theme' : ''}`}>{errors.title}</p>}
          </div>
          <div className="form-group">
            <label>Thumbnail</label>
            <input type="file" className={`form-control ${darkMode ? 'dark-theme' : ''}`} onChange={handleImageChange} />
            {errors.thumbnail && <p className={`error ${darkMode ? 'dark-theme' : ''}`}>{errors.thumbnail}</p>}
            {formData.thumbnail && (
              <img src={formData.thumbnail} alt="Thumbnail Preview" className="preview-image" />
            )}
          </div>
          <div className="form-group">
            <label>Video File</label>
            <input type="file" className={`form-control ${darkMode ? 'dark-theme' : ''}`} onChange={handleVideoChange} />
            {errors.videoFile && <p className={`error ${darkMode ? 'dark-theme' : ''}`}>{errors.videoFile}</p>}
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              className={`form-control ${darkMode ? 'dark-theme' : ''}`}
              placeholder="Enter description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && <p className={`error ${darkMode ? 'dark-theme' : ''}`}>{errors.description}</p>}
          </div>
          <button type="submit" className={`btn ${darkMode ? 'dark-theme' : ''}`}>Update</button>
        </form>
      </div>
    </div>
  );
}

export default EditVideo;


/* General styles for the homepage and My Videos page */
.homepage-container,
.myvideos-container {
  padding: 20px;
  background-color: #fff; /* Light mode background */
  color: #333; /* Dark text color */
  min-height: 100vh; /* Minimum height of full viewport */
  overflow-y: auto; /* Scroll only when necessary */
}

.logo {
  height: 50px;
}

.auth-buttons {
  margin-right: 85%; /* Adjust as needed */
}

.auth-buttons .btn {
  background-color: white;
  color: black;
  padding: 8px 16px;
  border: none;
  text-align: left;
}

.search-bar {
  margin-left: 45%; /* Adjust as needed */
  position: absolute;
  align-items: center;
}

.user-info {
  position: absolute;
  top: 20px;
  right: 20px;
}

.user-info .profile-picture {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
  position: relative;
  float: right;
}

.user-info .profile-picture img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-left: 15%; /* Adjust as needed */
}

.video-item {
  position: relative;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.video-item:hover {
  transform: scale(1.05);
}

.video-thumbnail {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.video-item h3 {
  margin: 10px;
  font-size: 16px;
}

.video-details {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px;
  display: flex;
  align-items: center;
}

.video-details .uploader-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.video-details .uploader-info img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

/* Styles for dark mode */
.dark-theme {
  background-color: #777; /* Dark background */
  color: #333; /* Dark text color */
}

.dark-theme .auth-buttons .btn {
  background-color: #777; /* Dark background for buttons */
  color: #fff; /* Light text color for buttons */
}

.dark-theme .auth-buttons .btn:hover {
  background-color: #555; /* Darker background on hover */
}

.dark-theme .video-item {
  background-color: #555; /* Dark background for video items */
  color: #fff; /* Light text color for video items */
}

.dark-theme .search-bar input {
  background-color: #888; /* Dark mode input background */
  color: #fff; /* Light text color for input */
  border: 1px solid #666;
}

.dark-theme .user-info span {
  color: #fff; /* Light text color for user info */
}
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../Users/UserContext';
import './HomePage.css';

function HomePage() {
  const { currentUser, logout, videos, darkMode, toggleDarkMode } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to handle upload button click
  const handleUploadClick = () => {
    if (currentUser) {
      navigate('/upload');
    } else {
      alert('You must be logged in to upload a video.');
    }
  };

  // Function to filter videos based on search query
  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to filter user's videos
  const userVideos = currentUser ? videos.filter(video => video.uploadedBy === currentUser.username) : [];

  return (
    <div className={`homepage-container ${darkMode ? 'dark-theme' : ''}`}>
      {/* Logo */}
      <Link to="/" className="logo">
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" alt="YouTube Logo" />
      </Link>

      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search videos..."
          value={searchQuery}
          onChange={handleSearchInputChange}
          className={darkMode ? 'dark-mode-input' : ''}
        />
      </div>

      {/* Authentication buttons */}
      <div className="auth-buttons">
        {currentUser ? (
          <div className="user-info">
            {currentUser.profilePicture && (
              <div className="profile-picture">
                <img src={currentUser.profilePicture} alt="Profile" />
              </div>
            )}
            <span>Welcome, {currentUser.username}</span>
          </div>
        ) : (
          <Link to="/login" className="btn">Sign In</Link>
        )}

        {/* Upload button */}
        <button className="btn" onClick={handleUploadClick}>Upload Video</button>

        {/* Logout button */}
        {currentUser && (
          <button className="btn" onClick={logout}>Logout</button>
        )}

        {/* Theme toggle button */}
        <button className={`btn dark-mode-btn ${darkMode ? 'btn-dark' : ''}`} onClick={toggleDarkMode}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>

        {/* My Videos button */}
        {currentUser && (
          <Link to="/myvideos" className="btn">
            My Videos
          </Link>
        )}
      </div>

      {/* Video grid */}
      <div className="video-grid">
        {filteredVideos.map((video) => (
          <div key={video.id} className="video-item">
            <Link to={`/videos/${video.id}`}>
              <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
              <h3>{video.title}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;


/* קובץ CSS עבור דף הנחיתה */

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0; /* רקע בצבע אפור בהיר */
}

.login-box {
  background: white; /* רקע לבן */
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
}

.logo {
  text-align: center;
  margin-bottom: 1rem;
}

.logo img {
  width: 150px;
}

.required-fields {
  color: #888;
  font-size: 0.9rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-control {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn {
  display: block;
  width: 100%;
  padding: 0.5rem;
  background-color: #ff0000; /* רקע כפתור בצבע אדום */
  color: white; /* צבע טקסט לבן */
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn:hover {
  background-color: #cc0000; /* רקע כפתור בצבע אדום כהה */
}

.link-button {
  color: #ff0000; /* צבע קישור בצבע אדום */
  text-decoration: none;
}

.link-button:hover {
  text-decoration: underline;
}

.error {
  color: red; /* צבע טקסט שגיאה באדום */
  font-size: 0.9rem;
  margin-top: 0.5rem;
  background-color: #ffebee; /* רקע רקע תיקוני שגיאה בצהוב */
  padding: 0.5rem;
  border: 1px solid #ffcdd2;
  border-radius: 5px;
}

.dark-theme .login-container {
  background-color: #333; /* רקע בצבע אפור כהה */
  color: #fff; /* צבע טקסט לבן */
}

.dark-theme .login-box {
  background: #444; /* רקע בצבע אפור כהה */
  color: #fff; /* צבע טקסט לבן */
  box-shadow: 0 2px 10px rgba(255, 255, 255, 0.1);
}

.dark-theme .form-control {
  background-color: #555; /* רקע רקע הקלט של הלכה כהה */
  color: #fff; /* צבע טקסט לבן */
  border-color: #777; /* גבול רקע רקע הקלט של הלכה כהה */
}

.dark-theme .btn {
  background-color: #ff0000; /* רקע כפתור בצבע אדום */
  color: white; /* צבע טקסט לבן */
}

.dark-theme .btn:hover {
  background-color: #cc0000; /* רקע כפתור בצבע אדום כהה */
}

.dark-theme .error {
  color: #ffcccc; /* צבע טקסט שגיאה באדום כהה */
  background-color: #660000; /* רקע רקע תיקוני שגיאה בצהוב */
  border-color: #ffcccc; /* גבול רקע רקע תיקוני שגיאה בצהוב */
}
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../Users/UserContext';
import './Login.css';

function Login() {
  const { users, login, darkMode } = useContext(UserContext);
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

  const handleSubmit = (e) => {
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

    const user = users.find(user => user.username === formData.username && user.password === formData.password);

    if (user) {
      setLoginError('');
      login(formData.username);
      navigate('/');
    } else {
      setLoginError('Invalid username or password');
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


/* General styles for the homepage and My Videos page */
.homepage-container,
.myvideos-container {
  padding: 20px;
  background-color: #fff; /* Light mode background */
  color: #333; /* Dark text color */
  min-height: 100vh; /* Minimum height of full viewport */
  overflow-y: auto; /* Scroll only when necessary */
}

.logo {
  height: 50px;
}

.auth-buttons {
  margin-right: 85%; /* Adjust as needed */
}

.auth-buttons .btn {
  background-color: white;
  color: black;
  padding: 8px 16px;
  border: none;
  text-align: left;
}

.search-bar {
  margin-left: 45%; /* Adjust as needed */
  position: absolute;
  align-items: center;
}

.user-info {
  position: absolute;
  top: 20px;
  right: 20px;
}

.user-info .profile-picture {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
  position: relative;
  float: right;
}

.user-info .profile-picture img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-left: 15%; /* Adjust as needed */
}

.video-item {
  position: relative;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.video-item:hover {
  transform: scale(1.05);
}

.video-thumbnail {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.video-item h3 {
  margin: 10px;
  font-size: 16px;
}

.video-details {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px;
  display: flex;
  align-items: center;
}

.video-details .uploader-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.video-details .uploader-info img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

/* Styles for dark mode */
.dark-theme {
  background-color: #777; /* Dark background */
  color: #333; /* Dark text color */
}

.dark-theme .auth-buttons .btn {
  background-color: #777; /* Dark background for buttons */
  color: #fff; /* Light text color for buttons */
}

.dark-theme .auth-buttons .btn:hover {
  background-color: #555; /* Darker background on hover */
}

.dark-theme .video-item {
  background-color: #555; /* Dark background for video items */
  color: #fff; /* Light text color for video items */
}

.dark-theme .search-bar input {
  background-color: #888; /* Dark mode input background */
  color: #fff; /* Light text color for input */
  border: 1px solid #666;
}

.dark-theme .user-info span {
  color: #fff; /* Light text color for user info */
}
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../Users/UserContext';
import './MyVideosPage.css';

function MyVideosPage() {
  const { currentUser, logout, videos, darkMode, toggleDarkMode } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter videos based on search query and current user
  let filteredVideos = videos;
  if (currentUser) {
    filteredVideos = videos.filter(video =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) && video.uploadedBy === currentUser.username
    );
  }

  return (
    <div className={`myvideos-container ${darkMode ? 'dark-theme' : ''}`}>
      {/* Logo */}
      <Link to="/" className="logo">
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" alt="YouTube Logo" />
      </Link>

      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search videos..."
          value={searchQuery}
          onChange={handleSearchInputChange}
          className={darkMode ? 'dark-mode-input' : ''}
        />
      </div>

      {/* Authentication buttons */}
      <div className="auth-buttons">
        {currentUser ? (
          <div className="user-info">
            {currentUser.profilePicture && (
              <div className="profile-picture">
                <img src={currentUser.profilePicture} alt="Profile" />
              </div>
            )}
            <span>Welcome, {currentUser.username}</span>
          </div>
        ) : (
          <Link to="/login" className="btn">Sign In</Link>
        )}

        {/* Upload button */}
        {currentUser && (
          <button className="btn" onClick={() => navigate('/upload')}>Upload Video</button>
        )}

        {/* Logout button */}
        {currentUser && (
          <button className="btn" onClick={logout}>Logout</button>
        )}

        {/* Theme toggle button */}
        <button className={`btn dark-mode-btn ${darkMode ? 'btn-dark' : ''}`} onClick={toggleDarkMode}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>

        {/* All Videos button */}
        <Link to="/" className="btn">
          All Videos
        </Link>
      </div>

      {/* Display videos or no videos message */}
      {filteredVideos.length > 0 ? (
        <div className="video-grid">
          {filteredVideos.map((video) => (
            <div key={video.id} className="video-item">
              <Link to={`/videos/${video.id}`}>
                <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
                <h3>{video.title}</h3>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-videos-message">
          No videos to display.
        </div>
      )}
    </div>
  );
}

export default MyVideosPage;


/* Signup.css */

/* Light mode */
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}

.signup-box {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
}

.logo {
  text-align: center;
  margin-bottom: 1rem;
}

.logo img {
  width: 150px;
}

.required-fields {
  color: #888;
  font-size: 0.9rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-control {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn {
  display: block;
  width: 100%;
  padding: 0.5rem;
  background-color: #ff0000;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn:hover {
  background-color: #cc0000;
}

.link-button {
  color: #ff0000;
  text-decoration: none;
}

.link-button:hover {
  text-decoration: underline;
}

.error {
  color: red;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  background-color: #ffebee;
  padding: 0.5rem;
  border: 1px solid #ffcdd2;
  border-radius: 5px;
}

.registration-success {
  color: green;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  background-color: #e8f5e9;
  padding: 0.5rem;
  border: 1px solid #c8e6c9;
  border-radius: 5px;
}

.preview-image {
  width: 100%;
  margin-top: 0.5rem;
  border-radius: 5px;
}

/* Dark mode */
.signup-container.dark-theme {
  background-color: #333;
  color: #ccc; /* Text color in dark mode */
}

.signup-box.dark-theme {
  background: #444;
  box-shadow: 0 2px 10px rgba(255, 255, 255, 0.1);
}

.required-fields.dark-theme {
  color: #888;
}

.form-control.dark-theme {
  background-color: #555;
  color: #ccc;
}

.btn.dark-theme {
  background-color: #ff4444;
  color: #fff;
}

.btn.dark-theme:hover {
  background-color: #cc4444;
}

.link-button.dark-theme {
  color: #ff4444;
}

.link-button.dark-theme:hover {
  text-decoration: underline;
}

.error.dark-theme {
  color: #ffb3b3;
  background-color: #441111;
  border: 1px solid #ffeeee;
}

.registration-success.dark-theme {
  color: #a5d6a7;
  background-color: #1b5e20;
  border: 1px solid #4caf50;
}
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../Users/UserContext';
import './Signup.css';

function Signup() {
  const { addUser, darkMode } = useContext(UserContext);
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

  const handleSubmit = (e) => {
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
    addUser({ ...formData });
    setRegistrationSuccess(true);
    navigate('/login'); // Link back to the login screen
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profilePicture: URL.createObjectURL(file) });
    }
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
            <input type="file" className="form-control" onChange={handleImageChange} />
            {errors.profilePicture && <p className="error">{errors.profilePicture}</p>}
            {formData.profilePicture && (
              <img src={formData.profilePicture} alt="Profile Preview" className="preview-image" />
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

/* Light mode */
.upload-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}

.upload-box {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
}

.upload-box h2 {
  text-align: center;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-control {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn {
  display: block;
  width: 100%;
  padding: 0.5rem;
  background-color: #ff0000;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn:hover {
  background-color: #cc0000;
}

.preview-image {
  display: block;
  margin-top: 1rem;
  max-width: 100%;
  border-radius: 5px;
}

.error {
  color: red;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  background-color: #ffebee;
  padding: 0.5rem;
  border: 1px solid #ffcdd2;
  border-radius: 5px;
}

/* Dark mode */
.upload-container.dark-theme {
  background-color: #333;
  color: #ccc; /* Text color in dark mode */
}

.upload-box.dark-theme {
  background: #444;
  box-shadow: 0 2px 10px rgba(255, 255, 255, 0.1);
}

.upload-box.dark-theme h2 {
  color: #eee; /* Heading color in dark mode */
}

.form-control.dark-theme {
  background-color: #555;
  color: #ccc;
}

.btn.dark-theme {
  background-color: #ff4444;
  color: #fff;
}

.btn.dark-theme:hover {
  background-color: #cc4444;
}

.error.dark-theme {
  color: #ffb3b3;
  background-color: #441111;
  border: 1px solid #ffeeee;
}
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../Users/UserContext';
import './Upload.css';

function Upload() {
  const { addVideo, currentUser, darkMode } = useContext(UserContext); // צוריך לוודא שהתומך גם במצב חושך
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    thumbnail: null,
    videoFile: null,
    description: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, thumbnail: URL.createObjectURL(file) });
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, videoFile: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.title) {
      newErrors.title = 'Title is required';
    }

    if (!formData.thumbnail) {
      newErrors.thumbnail = 'Thumbnail is required';
    }

    if (!formData.videoFile) {
      newErrors.videoFile = 'Video file is required';
    }

    if (!formData.description) {
      newErrors.description = 'Description is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const newVideo = {
      title: formData.title,
      thumbnail: formData.thumbnail,
      url: formData.videoFile,
      description: formData.description
    };
    addVideo(newVideo, currentUser); // Pass currentUser as uploader

    navigate('/');
  };

  return (
    <div className={`upload-container ${darkMode ? 'dark-theme' : ''}`}>
      <div className={`upload-box ${darkMode ? 'dark-theme' : ''}`}>
        <h2>Upload Video</h2>
        <div className="logo">
          <Link to="/" className="logo-link">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" alt="YouTube Logo" />
          </Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className={`form-control ${darkMode ? 'dark-theme' : ''}`}
              placeholder="Enter title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && <p className={`error ${darkMode ? 'dark-theme' : ''}`}>{errors.title}</p>}
          </div>
          <div className="form-group">
            <label>Thumbnail</label>
            <input type="file" className={`form-control ${darkMode ? 'dark-theme' : ''}`} onChange={handleImageChange} />
            {errors.thumbnail && <p className={`error ${darkMode ? 'dark-theme' : ''}`}>{errors.thumbnail}</p>}
            {formData.thumbnail && (
              <img src={formData.thumbnail} alt="Thumbnail Preview" className="preview-image" />
            )}
          </div>
          <div className="form-group">
            <label>Video File</label>
            <input type="file" className={`form-control ${darkMode ? 'dark-theme' : ''}`} onChange={handleVideoChange} />
            {errors.videoFile && <p className={`error ${darkMode ? 'dark-theme' : ''}`}>{errors.videoFile}</p>}
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              className={`form-control ${darkMode ? 'dark-theme' : ''}`}
              placeholder="Enter description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && <p className={`error ${darkMode ? 'dark-theme' : ''}`}>{errors.description}</p>}
          </div>
          <button type="submit" className={`btn ${darkMode ? 'dark-theme' : ''}`}>Upload</button>
        </form>
      </div>
    </div>
  );
}

export default Upload;

/* VideoPage.css */

.video-page {
  display: flex;
}

.home-link {
  position: absolute;
  left: 20px;
  top: 20px;
  z-index: 1000;
}

.youtube-logo {
  height: 40px;
}

.video-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.video-details.dark-theme {
  background-color: #333; /* רקע כהה במצב חושך */
  color: white; /* צבע טקסט לבן במצב חושך */
}

.video-details h2 {
  text-align: center;
}

.video-details p {
  text-align: center;
}

.video-player {
  width: 100%;
  height: 70vh; /* גובה הוידאו המותאם למצב חושך */
  border-radius: 10px;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.video-list {
  width: 20%; /* רוחב רשימת הוידאו במצב חושך */
  margin-left: 2rem; /* מרווח מימין */
  padding: 1rem; /* ריווח פנימי */
  margin-top: 2rem; /* מרווח מלמעלה */
}

.video-list.dark-theme {
  background-color: #333; /* רקע כהה במצב חושך */
  color: white; /* צבע טקסט לבן במצב חושך */
}

.video-item-link {
  display: block;
  text-decoration: none;
  color: inherit;
}

.video-item {
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 5px;
  background-color: #f0f0f0;
  transition: background-color 0.3s ease;
}

.video-item:hover {
  background-color: #e0e0e0;
}

.video-item img {
  width: 100%;
  border-radius: 5px;
}

.video-item h3 {
  text-align: center;
  font-size: 1rem;
  margin-top: 0.5rem;
}

.video-thumbnail {
  width: 100%;
  border-radius: 5px;
}

import React, { useContext, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UserContext } from '../Users/UserContext';
import './VideoPage.css';

function VideoPage() {
  const { id } = useParams();
  const { videos, darkMode } = useContext(UserContext); // ודא שיש לך darkMode ב־UserContext
  const videoRef = useRef(null);
  const currentVideo = videos.find((vid) => vid.id === id);

  // סינון הוידאו הנוכחי מהרשימה
  const otherVideos = videos.filter((vid) => vid.id !== id);

  useEffect(() => {
    const videoElement = videoRef.current;

    const handleLoadedMetadata = () => {
      if (videoElement && videoElement.readyState >= 2) {
        videoElement.play().catch(error => {
          console.error('Failed to start playback:', error);
        });
      }
    };

    if (videoElement) {
      videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      }
    };
  }, [currentVideo]);

  if (!currentVideo) {
    return <div>Video not found</div>;
  }

  return (
    <div className={`video-page ${darkMode ? 'dark-theme' : ''}`}>
      {/* קישור לדף הבית */}
      <Link to="/" className="home-link">
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" alt="YouTube Logo" className="youtube-logo" />
      </Link>

      <div className={`video-details ${darkMode ? 'dark-theme' : ''}`}>
        <video controls src={currentVideo.url} className="video-player" ref={videoRef} />
        <h2>{currentVideo.title}</h2>
        <p>הועלה על ידי: {currentVideo.uploadedBy}</p>
        <p>{currentVideo.description}</p>
      </div>

      <div className={`video-list ${darkMode ? 'dark-theme' : ''}`}>
        {otherVideos.map((vid) => (
          <Link key={vid.id} to={`/videos/${vid.id}`} className="video-item-link">
            <div className="video-item">
              <img src={vid.thumbnail} alt={vid.title} className="video-thumbnail" />
              <h3>{vid.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default VideoPage;


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserContextProvider from './Users/UserContext';
import HomePage from './HomeScreen/HomePage';
import Login from './LoginScreen/Login';
import Signup from './SignupScreen/Signup';
import Upload from './UploadScreen/Upload';
import VideoPage from './VideoScreen/VideoPage';
import EditVideo from './EditVideo/EditVideo';
import MyVideosPage from './MyVideosPage/MyVideosPage'; // Adjust the path as necessary
import ScrollToTop from './ScrollToTop';

function App() {
  return (
    <UserContextProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/videos/:id" element={<VideoPage />} />
          <Route path="/edit/:id" element={<EditVideo />} />
          <Route path="/myvideos" element={<MyVideosPage />} />
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;

