import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../Users/UserContext';
import './VideoPage.css';

function VideoPage() {
  const { id } = useParams();
  const { videos } = useContext(UserContext);
  const video = videos[id];

  if (!video) {
    return <div>Video not found</div>;
  }

  return (
    <div className="video-page">
      <h2>{video.title}</h2>
      <video controls src={video.url} />
      <p>{video.description}</p>
    </div>
  );
}

export default VideoPage;
