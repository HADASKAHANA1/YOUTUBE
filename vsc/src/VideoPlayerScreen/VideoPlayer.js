// src/components/VideoPlayer.js
import React from 'react';
import './VideoPlayer.css';

function VideoPlayer({ video }) {
  return (
    <div className="video-player-container">
      <div className="video-wrapper">
        <iframe
          width="100%"
          height="500"
          src={`https://www.youtube.com/embed/${video.id}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={video.title}
        ></iframe>
      </div>
      <div className="video-details">
        <h1 className="video-title">{video.title}</h1>
        <div className="video-info">
          <span>{video.views} views • {new Date(video.date).toLocaleDateString()}</span>
        </div>
        <div className="video-channel">
          <span>{video.channel}</span>
        </div>
        <div className="video-description">
          <p>{video.description}</p>
        </div>
      </div>
    </div>
  );
}

export default VideoPlayer;
