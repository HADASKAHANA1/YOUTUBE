// src/components/VideoList.js
import React from 'react';
import './Videolist.css';

function Videolist({ videos, onSelectVideo }) {
  return (
    <div className="video-list-container">
      {videos.map((video) => (
        <div key={video.id} className="video-item" onClick={() => onSelectVideo(video)}>
          <img src={`https://img.youtube.com/vi/${video.id}/0.jpg`} alt={video.title} />
          <div className="video-item-details">
            <h4>{video.title}</h4>
            <p>{video.channel}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Videolist;
