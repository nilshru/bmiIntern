import React, { useState, createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure this import is present

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserData = localStorage.getItem('userData');
    if (storedToken) {
      setToken(storedToken);
     
      setIsAuthenticated(true);

      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      }
    }

    setIsLoading(false); // Set loading to false after checking for authentication
  }, []);

  const login = async (username, password, callback) => {
    try {
      setIsLoading(true); // Set loading to true when login process starts

      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.token);
        setUserData(data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('userData', JSON.stringify(data));
        setIsAuthenticated(true);

        if (callback) {
          callback(); // Call the callback only after successful login
        }
      } else {
        console.error('Login failed');
        // Show an alert if login fails
        alert('Incorrect username or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
    } finally {
      setIsLoading(false); // Set loading to false after login process completes
    }
  };

  const logout = () => {
    setToken(null);
    setUserData(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    // Redirect to the login page upon logout if needed
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated, isLoading, userData }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
