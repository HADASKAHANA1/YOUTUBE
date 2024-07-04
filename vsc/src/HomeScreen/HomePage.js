import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../Users/UserContext';
import './HomePage.css';

function HomePage() {
  const { currentUser, logout, videos } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false); // הוספת state ל-Dark Mode
  const navigate = useNavigate();

  // סטייט ופונקציה לשינוי ה-Dark Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // קבוצת סגנונות ל-Dark Mode ולברירת המחדל
  const themeClass = darkMode ? 'dark-theme' : '';

  // פונקציה לסינון הסרטונים לפי החיפוש
  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // טיפול בשינוי במילוי שדה החיפוש
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // טיפול בלחיצה על כפתור ההעלאה
  const handleUploadClick = () => {
    if (currentUser) {
      navigate('/upload');
    } else {
      alert('You must be logged in to upload a video.');
    }
  };

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

      {/* Right section */}
      <div className="header-right">
        {/* Authentication buttons */}
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
          <div className="auth-buttons">
            <Link to="/login" className="btn">Sign In</Link>
          </div>
        )}
      </div>

      {/* Upload button */}
      <div className="auth-buttons">
        <button className="btn" onClick={handleUploadClick}>Upload Video</button>
      </div>

      {/* Logout button */}
      {currentUser && (
        <div className="auth-buttons">
          <button className="btn" onClick={logout}>Logout</button>
        </div>
      )}

      {/* Theme toggle button */}
      <div className="auth-buttons">
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
