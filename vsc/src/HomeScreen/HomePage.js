import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../Users/UserContext';
import './HomePage.css';

function HomePage() {

  const { currentUser, logout, darkMode, toggleDarkMode } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVideos, setFilteredVideos] = useState([]);
  const navigate = useNavigate();
  const [ homePagevideos , setHomePageVideos] = useState([]);
  let userid;
  if (currentUser) {
    userid = currentUser._id;
  } else{
    userid = -1;
  }
  



  const handleLogOut = async() =>{
    const userid = currentUser.id
      const path=  `http://localhost:8000/api/users/logout/${userid}`
      try{
        let res = await fetch(path, {
          method: 'get',
          'headers': {
            Authorization: localStorage.getItem("token"),
              'Content-Type': 'application/json',
            },
        });
        if(res.ok){
          logout()
        }
        else{
          alert("cannot log out")
        }

      }catch(error){
        console.error('Error during logout:', error);


      }
  }
  const refreshPage = () => {
    window.location.reload();
};
   const handleDeleteUser = async() =>{
    const userid = currentUser.id
      const path=  `http://localhost:8000/api/users/${userid}`
      try{
        let res = await fetch(path, {
          method: 'delete',
          'headers': {
            Authorization: localStorage.getItem("token"),
              'Content-Type': 'application/json',
            },
        });
        if(res.ok){
          logout()
          refreshPage();
        }
        if(!res.ok){
          alert("cannot delete user")
        }

       

      }catch(error){
        console.error('Error during logout:', error);
      }
  }
  

  

  useEffect(() => {
    
    const fetchVideos = async () => {
      try {
          const res = await fetch(`http://localhost:8000/api/videos`, {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
              },
          });
          if (!res.ok) {
              alert("Failed fetch videos");
              return;
          }
          const resbody = await res.json();

          setFilteredVideos(resbody.videos);
          setHomePageVideos(resbody.videos);
          
      } catch (err) {
          console.log(err);
      }
  };
  fetchVideos();
    
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    const filtered = homePagevideos.filter(video =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredVideos(filtered);
  };

  const handleLogoClick = () => {
    setFilteredVideos(homePagevideos);
    setSearchQuery(''); // Clear the search input

  };

  const handleUploadClick = () => {
    if (currentUser) {
    navigate('/upload');

   } else {
      alert('You must be logged in to upload a video.');
    }
  };
  const handleEditUser = async()=>{
    navigate(`/editUser/${currentUser.id}`)
  }

  const themeClass = darkMode ? 'dark-theme' : '';

  return (
    <div className={`homepage-container ${themeClass}`}>
      <Link to="/" className="logo" onClick={handleLogoClick}>
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" alt="YouTube Logo" />
      </Link>

      <div className="auth-buttons">
        {currentUser ? (
          <div className="user-info">
            {currentUser.profilePicture && (
              <div className="profile-picture">
                <img src={currentUser.profilePicture} alt="Profile" />
              </div>
            )}
            <span>Welcome, {currentUser.username}</span>
          </div>
        ) : (
          <Link to="/login" className="btn">
            <i className="bi bi-box-arrow-in-right"></i> Sign In
          </Link>
        )}

        <button className={`btn ${darkMode ? 'btn-light' : 'btn-dark'}`} onClick={toggleDarkMode}>
          {darkMode ? (
            <>
              <i className="bi bi-brightness-high-fill"></i> Light Mode
            </>
          ) : (
            <>
              <i className="bi bi-moon-stars"></i> Dark Mode
            </>
          )}
        </button>

        <button className="btn" onClick={handleUploadClick}>
          <i className="bi bi-upload"></i> Upload Video
        </button>

        {currentUser && (
          <button className="btn" onClick={handleLogOut}>
            <i className="bi bi-box-arrow-in-left"></i> Logout
          </button>
        )}

        {currentUser && (
          <button className="btn" onClick={handleDeleteUser}>
            <i class="bi bi-person-dash"></i> delete user
          </button>
        )}
        
        {currentUser && (
          <button className="btn" onClick={handleEditUser}>
            <i class="bi bi-person-exclamation"></i> update user
          </button>
        )}

      </div>

      <div className="search-bar">
        <div className={`input-group ${darkMode ? 'dark-mode-input-group' : ''}`}>
          <span className={`input-group-text ${darkMode ? 'dark-mode-input-group-text' : ''}`} onClick={handleSearchClick}>
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            placeholder="Search videos..."
            value={searchQuery}
            onChange={handleSearchInputChange}
            className={`form-control ${darkMode ? 'dark-mode-input' : ''}`}
          />
        </div>
      </div>

      <div className="video-grid">
        {filteredVideos.map((video) => (
          <div key={video.id} className="video-item">
            <Link to={`/${userid}/videos/${video._id}`}>
              <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
              <h3>{video.title}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;

