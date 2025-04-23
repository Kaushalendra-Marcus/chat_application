import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Leftpart from './home/Leftpart/Leftpart';
import Rightpart from './home/Rightpart/Rightpart';
import { useAuth } from './context/AuthProvider';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const { authUser } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  return (
    <Routes>
      <Route
        path="/"
        element={
          authUser ? (
            <div className="h-screen flex overflow-hidden">
              <Leftpart menuOpen={menuOpen} toggleMenu={toggleMenu} />
              <Rightpart      menuOpen={menuOpen} toggleMenu={toggleMenu} />
            </div>
          ) : (
            <Navigate to="login" />
          )
        }
      />
      <Route
        path="login"
        element={authUser ? <Navigate to="/" /> : <Login />}
      />
      <Route
        path="signup"
        element={authUser ? <Navigate to="/" /> : <Signup />}
      />
    </Routes>
  );
}

export default App;
