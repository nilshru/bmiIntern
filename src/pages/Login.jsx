import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/Auth/AuthContex';
import { useNavigate } from 'react-router-dom';
import Header from '../components/navComonents/Header';
import Loader from '../components/Loader';

function Login() {
  const navigate = useNavigate();
  const { token, login, isLoading } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Redirect to the home page if the user is already authenticated
    if (token) {
      navigate('/');
    }
  }, [token]);

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(username, password, () => {
      // Reset username and password fields or perform other actions upon login completion if required
      setUsername('');
      setPassword('');

      // Redirect to the home page after successful login
      navigate('/');
    });
  };

  return (
  <>
  <Header />
   {isLoading? <Loader/> :<div className="flex items-center justify-center h-screen bg-white">
      <div className="flex flex-col p-4 mx-2 text-black bg-slate-100 border border-orange-600 rounded-md w-[400px] h-[400px]">
        <div className="text-2xl mt-5 font-bold mb-2 text-[#1e0e4b] text-center">
          Welcome back to <span className="text-blue-700">App</span>
        </div>
        <div className="mb-4 text-sm font-normal text-center text-blue-700">
          Log in to your account
        </div>
        <form className="flex flex-col gap-3">
          <div className="relative block">
            <label htmlFor="Username" className="block text-gray-900 cursor-text text-sm leading-[140%] font-normal mb-2">
              Username
            </label>
            <input
              type="text"
              id="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2  ring-gray-900 outline-0"
            />
          </div>
          <div className="relative block">
            <label htmlFor="password" className="block text-gray-900 cursor-text text-sm leading-[140%] font-normal mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded border border-gray-200 text-sm w-full font-normal leading-[18px] text-black tracking-[0px] appearance-none block h-11 m-0 p-[11px] focus:ring-2 ring-offset-2 ring-gray-900 outline-0"
            />
          </div>
          <button
            type="submit"
            onClick={handleLogin}
            className="px-6 py-2 m-auto text-sm font-normal text-white bg-orange-500 rounded w-max"
          >
            Submit
          </button>
        </form>
      </div>
    </div>}
  </>
  );
}

export default Login;
