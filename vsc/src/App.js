import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserContextProvider from './Users/UserContext';
import HomePage from './HomeScreen/HomePage';
import Login from './LoginScreen/Login';
import Signup from './SignupScreen/Signup';
import Upload from './UploadScreen/Upload';
import VideoPage from './VideoScreen/VideoPage';
import EditVideo from './EditVideo/EditVideo'; // Import the EditVideo component
import ScrollToTop from './ScrollToTop';
import UserPage from './UserPage/UserPage';
import EditUser from './editUser/EditUser';
function App() {
  return (
    <UserContextProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/:userid/videos/:id" element={<VideoPage />} />
          <Route path="/UserPage/:id" element={<UserPage />} />
          <Route path="/edit/:id" element={<EditVideo />} /> {/* Route for editing video */}
          <Route path="/editUser/:id" element={<EditUser />}/>
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
