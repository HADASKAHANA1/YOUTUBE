import React, { useContext, useRef, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../Users/UserContext';
import './VideoPage.css';

function VideoPage() {
  const { id } = useParams();
  const { videos, currentUser, deleteVideo, darkMode, addComment, deleteComment, editComment, likeVideo, unlikeVideo } = useContext(UserContext);
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState('');
  const [editingCommentIndex, setEditingCommentIndex] = useState(null);
  const [editedComment, setEditedComment] = useState('');

  // חפש את הסרטון הנוכחי
  const currentVideo = videos ? videos.find((vid) => vid.id === id) : null;
  const otherVideos = videos ? videos.filter((vid) => vid.id !== id) : [];
  console.log(currentVideo.url)

  // אם אין סרטון נוכחי, נווט הביתה
  useEffect(() => {
    if (!currentVideo) {
      navigate('/');
      return;
    }
    
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
  }, [currentVideo, navigate]);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      deleteVideo(id);
      navigate('/');
    }
  };

  const handleAddComment = () => {
    if (!currentUser) {
      alert('You must be logged in to comment.');
      return;
    }
  
    if (newComment.trim()) {
      addComment(id, { text: newComment, user: currentUser.username });
      setNewComment('');
    }
  };

  const handleEditComment = (index, text) => {
    setEditingCommentIndex(index);
    setEditedComment(text);
  };

  const handleSaveEditComment = (index) => {
    if (editedComment.trim()) {
      editComment(id, index, editedComment);
      setEditingCommentIndex(null);
      setEditedComment('');
    }
  };

  const handleDeleteComment = (commentIndex) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      deleteComment(id, commentIndex);
    }
  };

  const handleLike = () => {
    if (!currentUser) {
      alert('You must be logged in to like a video.');
      return;
    }
    
    if (currentVideo && currentVideo.likes && currentVideo.likes.includes(currentUser.username)) {
      unlikeVideo(id);
    } else {
      likeVideo(id);
    }
  };

  if (!currentVideo) {
    return null; // מצאנו פתרון אחר לביצוע הנוויגציה במקרה הזה
  }
  console.log("video  ",currentVideo)

  return (
    <div className={`video-page ${darkMode ? 'dark-theme' : ''}`}>
      <Link to="/" className="home-link">
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" alt="YouTube Logo" className="youtube-logo" />
      </Link>

      <div className="video-content">
        <div className={`video-details ${darkMode ? 'dark-theme' : ''}`}>
          <video controls src={currentVideo.url} className="video-player" ref={videoRef} />
          <h2>{currentVideo.title}</h2>
          <p>Uploaded by: {currentVideo.uploadedBy}</p>
          <p>{currentVideo.description}</p>
          <div className="like-section">
            <button onClick={handleLike} className="like-button">
              {currentUser && currentVideo.likes && currentVideo.likes.includes(currentUser.username) ? (
                <i className="bi bi-hand-thumbs-up-fill"></i>
              ) : (
                <i className="bi bi-hand-thumbs-up"></i>
              )}
            </button>
            <span>{currentVideo.likes ? currentVideo.likes.length : 0} Likes</span>
          </div>

          {currentUser && currentUser.username === currentVideo.uploadedBy && (
            <div className="edit-delete-buttons">
              <Link to={`/edit/${id}`} className="edit-button">Edit Video</Link>
              <button onClick={handleDelete} className="delete-button">Delete Video</button>
            </div>
          )}

          <div className={`comments-section ${darkMode ? 'dark-theme' : ''}`}>
            <h3>Comments</h3>
            <ul>
              {currentVideo.comments && currentVideo.comments.map((comment, index) => (
                <li key={index}>
                  {editingCommentIndex === index ? (
                    <div>
                      <textarea value={editedComment} onChange={(e) => setEditedComment(e.target.value)} />
                      <button onClick={() => handleSaveEditComment(index)}>Save</button>
                      <button onClick={() => setEditingCommentIndex(null)}>Cancel</button>
                    </div>
                  ) : (
                    <div>
                      <strong>{comment.user}:</strong> {comment.text}
                      {currentUser && currentUser.username === comment.user && (
                        <span>
                          <button onClick={() => handleEditComment(index, comment.text)}>Edit</button>
                          <button onClick={() => handleDeleteComment(index)} className="delete-comment-button">Delete</button>
                        </span>
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
            {currentUser && (
              <div className="add-comment">
                <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Add a comment" />
                <button onClick={handleAddComment}>Comment</button>
              </div>
            )}
          </div>
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
    </div>
  );
}

export default VideoPage;
