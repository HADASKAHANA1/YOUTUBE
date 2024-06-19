import React, { useContext, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { UserContext } from '../Users/UserContext';
import './VideoPage.css';

function VideoPage() {
  const { id } = useParams();
  const { videos } = useContext(UserContext);
  const videoRef = useRef(null);
  const currentVideo = videos.find((vid) => vid.id === id);

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

  // Filter out the current video from the list
  const otherVideos = videos.filter((vid) => vid.id !== id);

  return (
    <div className="video-page">
      <div className="video-details">
        <h2>{currentVideo.title}</h2>
        <video controls src={currentVideo.url} className="video-player" ref={videoRef} />
        <p>{currentVideo.description}</p>
      </div>
      <div className="video-list">
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
