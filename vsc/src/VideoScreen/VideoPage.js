import React, { useContext, useRef, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../Users/UserContext';
import './VideoPage.css';

function VideoPage() {
  const { id } = useParams();
  const { videos, currentUser, deleteVideo, darkMode } = useContext(UserContext);
  const videoRef = useRef(null);
  const navigate = useNavigate(); // הוספת הפונקציה useNavigate
  const currentVideo = videos.find((vid) => vid.id === id);

  // Filtering out the current video from the list
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

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      deleteVideo(id);
      navigate('/'); // ניווט לעמוד הבית לאחר מחיקת הוידאו
    }
  };

  if (!currentVideo) {
    // אם הוידאו לא קיים, ננתב לעמוד הבית
    navigate('/');
    return null;
  }

  return (
    <div className={`video-page ${darkMode ? 'dark-theme' : ''}`}>
      {/* Link to homepage */}
      <Link to="/" className="home-link">
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" alt="YouTube Logo" className="youtube-logo" />
      </Link>

      <div className={`video-details ${darkMode ? 'dark-theme' : ''}`}>
        <video controls src={currentVideo.url} className="video-player" ref={videoRef} />
        <h2>{currentVideo.title}</h2>
        <p>Uploaded by: {currentVideo.uploadedBy}</p>
        <p>{currentVideo.description}</p>
        
        {/* Edit and Delete Buttons */}
        {currentUser && currentUser.username === currentVideo.uploadedBy && (
          <div className="edit-delete-buttons">
            <Link to={`/edit/${id}`} className="edit-button">Edit Video</Link>
            <button onClick={handleDelete} className="delete-button">Delete Video</button>
          </div>
        )}
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
