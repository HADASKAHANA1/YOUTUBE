import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { UserContext } from '../Users/UserContext';
import './EditVideo.css';

function EditVideo() {
  const { id } = useParams();
  const { videos, editVideo, currentUser, darkMode } = useContext(UserContext);
  const navigate = useNavigate();
  const currentVideo = videos.find((vid) => vid.id === id);

  const [formData, setFormData] = useState({
    title: '',
    thumbnail: null,
    videoFile: null,
    description: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (currentVideo) {
      setFormData({
        title: currentVideo.title,
        thumbnail: currentVideo.thumbnail,
        videoFile: currentVideo.url,
        description: currentVideo.description
      });
    }
  }, [currentVideo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, thumbnail: URL.createObjectURL(file) });
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, videoFile: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.thumbnail) {
      newErrors.thumbnail = 'Thumbnail is required';
    }

    if (!formData.videoFile) {
      newErrors.videoFile = 'Video file is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const updatedVideo = {
      id: currentVideo.id,
      title: formData.title,
      thumbnail: formData.thumbnail,
      url: formData.videoFile,
      description: formData.description,
      uploadedBy: currentVideo.uploadedBy,
      likes: currentVideo.likes,  // שמירה על הלייקים הקיימים
    };

    editVideo(updatedVideo);
    navigate(`/videos/${id}`);
  };

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  if (currentUser.username !== currentVideo.uploadedBy) {
    alert("You do not have permission to edit this video.");
    navigate('/');
    return null;
  }

  return (
    <div className={`edit-video-container ${darkMode ? 'dark-theme' : ''}`}>
      <div className={`edit-video-box ${darkMode ? 'dark-theme' : ''}`}>
        <div className="logo-container">
          <Link to="/" className="logo-link">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" alt="YouTube Logo" className="youtube-logo" />
          </Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className={`form-control ${darkMode ? 'dark-theme' : ''}`}
              placeholder="Enter title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            {errors.title && <p className={`error ${darkMode ? 'dark-theme' : ''}`}>{errors.title}</p>}
          </div>
          <div className="form-group">
            <label>Thumbnail</label>
            <input type="file" className={`form-control ${darkMode ? 'dark-theme' : ''}`} onChange={handleImageChange} />
            {errors.thumbnail && <p className={`error ${darkMode ? 'dark-theme' : ''}`}>{errors.thumbnail}</p>}
            {formData.thumbnail && (
              <img src={formData.thumbnail} alt="Thumbnail Preview" className="preview-image" />
            )}
          </div>
          <div className="form-group">
            <label>Video File</label>
            <input type="file" className={`form-control ${darkMode ? 'dark-theme' : ''}`} onChange={handleVideoChange} />
            {errors.videoFile && <p className={`error ${darkMode ? 'dark-theme' : ''}`}>{errors.videoFile}</p>}
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              className={`form-control ${darkMode ? 'dark-theme' : ''}`}
              placeholder="Enter description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && <p className={`error ${darkMode ? 'dark-theme' : ''}`}>{errors.description}</p>}
          </div>
          <button type="submit" className={`btn ${darkMode ? 'dark-theme' : ''}`}>Update</button>
        </form>
      </div>
    </div>
  );
}

export default EditVideo;
