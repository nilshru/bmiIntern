import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Auth/AuthContex';

function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');

    if (confirmLogout) {
      logout();
      navigate('/login');
    }
  };

  return (
    <button className="inline-flex items-center p-1 px-2 space-x-2 text-white bg-red-600 rounded-lg hover:bg-red-700" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default Logout;
