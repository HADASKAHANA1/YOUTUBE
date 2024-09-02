import React, { useContext, useRef, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../Users/UserContext';
import './VideoPage.css';

function VideoPage() {
  const { id } = useParams();
  const { videos, deleteVideo, darkMode, currentUser, deleteComment, editComment, likeVideo, unlikeVideo } = useContext(UserContext);
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [newComment, setNewComment] = useState('');
  const [editingCommentIndex, setEditingCommentIndex] = useState(null);
  const [editedComment, setEditedComment] = useState('');
  const videoId = parseInt(id);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [otherVideos, setOtherVideos] = useState([]);
  const [onTheSideVideos, setOnTheSideVideos] = useState([]);
  const [author, setAuthor] = useState(null);
  let authorId;
  const [authorProfile , setAuthorProfile] = useState(null)

  const fetchVideos = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/videos/allVideos', {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error('Failed to fetch videos');
      const { videos } = await res.json();
      setOtherVideos(videos);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch videos");
    }
  };

  const fetchVideo = async () => {
    try {

      const res = await fetch(`http://localhost:8000/api/videos/${videoId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error('Failed to fetch video');
      const { video } = await res.json();
      authorId = await video.authorId;
      setCurrentVideo(video);
  
      // Call fetchAuthor after setting the authorId

      fetchAuthor(authorId);
      
    } catch (err) {
      console.error('Error fetching video:', err);
      alert("Failed to fetch video");
    }
  };
  

  const fetchAuthor = async (authorId) => {
    try {
      const res = await fetch(`http://localhost:8000/api/users/${authorId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error('Failed to fetch user');
      const { user } = await res.json();
      setAuthor(user);
     
      setAuthorProfile(user.profilePicture)
    } catch (err) {
      console.error('Error fetching user:', err);
      alert("Failed to fetch user");
    }
  };

  // Fetch all videos and the current video
  useEffect(() => {
    
    

    fetchVideos();
    fetchVideo();

  }, [videoId]);

  // Update `onTheSideVideos` whenever `currentVideo` or `otherVideos` changes
  useEffect(() => {
    if (currentVideo && otherVideos.length) {
      setOnTheSideVideos(otherVideos.filter((vid) => vid.id !== videoId));
    }
  }, [currentVideo, otherVideos, videoId]);

  useEffect(() => {
    if (!currentVideo) return;

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

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      const path = `http://localhost:8000/api/users/${currentUser.id}/videos/${currentVideo.id}`;
      try {
        const res = await fetch(path, {
          method: 'DELETE',
          headers: {
            Authorization: localStorage.getItem("token"),
            'Content-Type': 'application/json',
          },
        });
        if (res.ok) {
          navigate('/');
        } else {
          const { error } = await res.json();
          alert(error);
        }
      } catch (error) {
        console.error('Error during delete:', error);
      }
    }
  };

  const handleAddComment = async() => {
    if (!currentUser) {
      alert('You must be logged in to comment.');
      return;
    }

    if (newComment.trim()) {

      try {
           const res = await fetch(`http://localhost:8000/api/users/${currentUser.id}/videos/${currentVideo.id}/comment`, {
            method: 'POST',
            headers: {
           'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({ text: newComment, user: currentUser.username }),
    });

    if (!res.ok) {
      throw new Error('Failed to add comment');
    }
    setNewComment('');
    fetchVideo();

   
  } catch (error) {
    console.error('Error adding comment:', error);
    return
  }   
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

    if (currentVideo.likes && currentVideo.likes.includes(currentUser.username)) {
      unlikeVideo(id);
    } else {
      likeVideo(id);
    }
  };

  if (!currentVideo) {
    return null; // Handle case where video is not yet loaded
  }

  return (
    <div className={`video-page ${darkMode ? 'dark-theme' : ''}`}>
      <Link to="/" className="home-link">
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" alt="YouTube Logo" className="youtube-logo" />
      </Link>

      <div className="video-content">
        <div className={`video-details ${darkMode ? 'dark-theme' : ''}`}>
          <video controls src={currentVideo.url} className="video-player" ref={videoRef} />
          <h2>{currentVideo.title}</h2>
          <div className='author'>
            {author && (
              <Link to={`/UserPage/${author.id}`}>
                <img 
                  src={authorProfile} 
                  alt="Profile"
                  className="profile-picture"
                />
              </Link>
            )}
            <p>Uploaded by: {currentVideo.uploadedBy}</p>
          </div>
          <p>{currentVideo.description}</p>
          <p>{currentVideo.views} views</p>
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
              <Link to={`/edit/${videoId}`} className="edit-button">Edit Video</Link>
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
          {onTheSideVideos.map((vid) => (
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
