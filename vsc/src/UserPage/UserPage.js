import React, { useEffect, useState } from 'react';

import { useNavigate, useParams ,Link} from 'react-router-dom';
import './UserPage.css';

function UserPage() {
  const { id } = useParams();
  const [userPage, setUserPage] = useState(null);
  const [userVideos, setUserVideos] = useState([]);
  const userId = parseInt(id);
  const navigate = useNavigate();


  

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/users/${userId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) throw new Error('Failed to fetch user');
        const { user } = await res.json();
        console.log(user)
        setUserPage(user);
        fetchUserVideos(userId); // Fetch videos after getting user
      } catch (err) {
        console.error(err);
        alert("Failed to fetch user");
      }
    };

    const fetchUserVideos = async (userId) => {
      try {
        const res = await fetch(`http://localhost:8000/api/users/${userId}/videos`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) throw new Error('Failed to fetch user videos');
        const { videos } = await res.json();
        setUserVideos(videos);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch user videos");
      }
    };

    fetchUser();
  }, [userId]);

  const handleLogoClick = () => {
    navigate('/')

  };

  return (
    
    <div className="user-page-container">
      <header className="user-page-header">
      <Link to="/" className="logo" onClick={handleLogoClick}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" alt="YouTube Logo" />
      </Link>        
      </header>
      <main className="user-page-main">
      <h1 className='title'>{userPage ? `${userPage.username}'s Page` : 'User Page'}</h1>
        <div className="user-info">
          {userPage && (
            <div className="profile-section">
              <div className="profile-picture">
                <img src={userPage.profilePicture} alt="Profile" />
              </div>
              <h2>{userPage.username}</h2>
            </div>
          )}
        </div>
        <div className="video-grid">
          {userVideos.length ? (
            userVideos.map(video => (
              <div key={video.id} className="video-item">
                <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
                <h3>{video.title}</h3>
              </div>
            ))
          ) : (
            <p>No videos available</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default UserPage;
