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
