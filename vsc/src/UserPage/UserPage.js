import React, { useEffect, useState , useContext } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './UserPage.css';
import { UserContext } from '../Users/UserContext.js';


function UserPage() {
  const { darkMode , currentUser } = useContext(UserContext);
  const { id } = useParams();
  const [userPage, setUserPage] = useState(null);
  const [userVideos, setUserVideos] = useState([]);
  const userId = parseInt(id);
  const navigate = useNavigate();
  console.log("thid: ",userId);
  let user_id = -1
  if(currentUser) {
    user_id = currentUser._id;
  }
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/users/${userId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) throw new Error('Failed to fetch user');
        const { user } = await res.json();
        setUserPage(user);
        fetchUserVideos(userId); // Fetch videos after getting user
      } catch (err) {
        console.error(err);
        alert('Failed to fetch user');
      }
    };

    const fetchUserVideos = async (userId) => {
      try {
        const res = await fetch(
          `http://localhost:8000/api/users/${userId}/videos`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        );
        if (!res.ok) throw new Error('Failed to fetch user videos');
        const { videos } = await res.json();
        setUserVideos(videos);
      } catch (err) {
        console.error(err);
        alert('Failed to fetch user videos');
      }
    };

    fetchUser();
  }, [userId]);

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div className= {`user-page-container ${darkMode ? 'dark-theme' : ''}`}>
      <header className="user-page-header">
        <Link to="/" className="logo" onClick={handleLogoClick}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
            alt="YouTube Logo"
          />
        </Link>
      </header>
      <main className= {`user-page-main ${darkMode ? 'dark-theme' : ''}`}>
        {/* אזור פרטי המשתמש */}
        {userPage && (
          <div className="user-info-centered">
            <div className="profile-picture-large">
              <img src={userPage.profilePicture} alt="Profile" />
            </div>
            <h1 className="username-title">{`${userPage.username}'s Page`}</h1>
          </div>
        )}



        
        {/* אזור הסרטונים */}
        <div className={`videos-section ${darkMode ? 'dark-theme' : ''}`}>
          <div className="video-grid-user">
            {userVideos.length ? (
              userVideos.map((video) => (
                <div key={video.id} className="video-item">
                  <Link to={`/${user_id}/videos/${video._id}`}>
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="video-thumbnail"
                  />
                  <h3>{video.title}</h3>
                  </Link>
                </div>
              ))
            ) : (
              <p>No videos available</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default UserPage;
