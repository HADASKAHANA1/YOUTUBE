import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserContextProvider from './Users/UserContext';
import HomePage from './HomeScreen/HomePage';
import Login from './LoginScreen/Login';
import Signup from './SignupScreen/Signup';
import Upload from './UploadScreen/Upload';
import VideoPage from './VideoScreen/VideoPage';
import './App.css';

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/videos/:id" element={<VideoPage />} />
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;