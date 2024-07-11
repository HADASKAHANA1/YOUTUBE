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

  // CSS class for dark mode
  const themeClass = darkMode ? 'dark-theme' : '';

  // Function to filter videos based on search query
  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`homepage-container ${themeClass}`}>
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