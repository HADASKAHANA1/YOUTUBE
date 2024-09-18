import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../Users/UserContext';
import './Upload.css';

function Upload() {
  const { currentUser, darkMode } = useContext(UserContext); // צוריך לוודא שהתומך גם במצב חושך
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    thumbnail: null,
    videoFile: null,
    description: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, thumbnail: file });
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, videoFile: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.title) {
      newErrors.title = 'Title is required';
    }

    if (!formData.thumbnail) {
      newErrors.thumbnail = 'Thumbnail is required';
    }

    if (!formData.videoFile) {
      newErrors.videoFile = 'Video file is required';
    }

    if (!formData.description) {
      newErrors.description = 'Description is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const data = new FormData();
    data.append('title', formData.title); // הוספת שדות טקסט
    data.append('description', formData.description);
    data.append('videoFile', formData.videoFile); // הוספת הקובץ (הסרטון)
    data.append('thumbnail', formData.thumbnail); // הוספת הקובץ (התמונה)

    try {
      // Send the FormData to the server
      const userid = currentUser.id
      const path = `http://localhost:8000/api/users/${userid}/videos`

      let res = await fetch(path, {
      method: 'POST',
      'headers': {
          Authorization: localStorage.getItem("token"),
        },
      body: data,
    });
     
    if(!res.ok){
      alert("cannot upload video") 
    }
  } catch (error) {
    console.error('Error during upload video:', error);
    // Handle registration errors
  }
    navigate('/');
  };

  return (
    <div className={`upload-container ${darkMode ? 'dark-theme' : ''}`}>
      <div className={`upload-box ${darkMode ? 'dark-theme' : ''}`}>
        <h2>Upload Video</h2>
        <div className="logo">
          <Link to="/" className="logo-link">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" alt="YouTube Logo" />
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
              <img src={URL.createObjectURL(formData.thumbnail)} alt="Thumbnail Preview" className="preview-image" />
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
          <button type="submit" className={`btn ${darkMode ? 'dark-theme' : ''}`}>Upload</button>
        </form>
      </div>
    </div>
  );
}

export default Upload;