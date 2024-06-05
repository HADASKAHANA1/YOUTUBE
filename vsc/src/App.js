import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Users/Dashboard';
import Signup from './SignupScreen/Signup';
import Login from './LoginScreen/Login';
import UserContextProvider from './Users/UserContext'; // כאן עשיתי import ל־UserContextProvider

function App() {
  return (
    <Router>
      <UserContextProvider> {/* פתיחת UserContextProvider */}
        <Routes>
          <Route path="/login" element={<Login />} /> {/* הזזת מסך ההתחברות לקראת התחילת האפליקציה */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </UserContextProvider> {/* סגירת UserContextProvider */}
    </Router>
  );
}

export default App;
