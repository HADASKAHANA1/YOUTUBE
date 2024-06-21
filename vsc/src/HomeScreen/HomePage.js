import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../Users/UserContext';
import './HomePage.css';

function HomePage() {
  const { currentUser, logout, videos } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Filter videos based on searchQuery
  const filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleUploadClick = () => {
    if (currentUser) {
      navigate('/upload');
    } else {
      alert('You must be logged in to upload a video.');
    }
  };

  return (
    <div className="homepage-container">
      <div className="homepage-header">
        <div className="logo">
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" alt="YouTube Logo" />
        </div>
        <div className="auth-buttons">
          {currentUser ? (
            <div className="user-info">
              {currentUser.profilePicture && (
                <div className="profile-picture">
                  <img src={currentUser.profilePicture} alt="Profile" />
                </div>
              )}
              <span>Welcome, {currentUser.username}</span>
              <button className="btn" onClick={logout}>Logout</button>
            </div>
          ) : (
            <Link to="/login" className="btn">Sign In</Link>
          )}
        </div>
      </div>
      
      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search videos..."
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>

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
      
      <div className="upload-button-container">
        <button className="btn upload-button" onClick={handleUploadClick}>Upload Video</button>
      </div>
    </div>
  );
}

export default HomePage;
