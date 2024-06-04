import React, { useState } from 'react';
import Login from './LoginScreen/Login';
import Signup from './SignupScreen/Signup';

function App() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="App">
      {isLogin ? <Login onToggle={toggleForm} /> : <Signup onToggle={toggleForm} />}
    </div>
  );
}

export default App;
