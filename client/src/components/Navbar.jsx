import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from "../utils/axiosInstance";
import { removeUser } from '../redux/features/authSlice';
import { useQueryClient } from '@tanstack/react-query';
import { ClipLoader } from 'react-spinners';

const Navbar = () => {
  const user = useSelector(store => store.auth.username);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await axiosInstance.get('/logout');
      queryClient.clear(); 
      dispatch(removeUser());
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  if (!user) return null;

  return (
    <nav className="bg-gray-800 text-gray-100 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-purple-300 hover:text-purple-400 transition-colors duration-200">Todo App</Link>
        <div className="flex items-center space-x-4">
          <Link to="/" className="btn btn-ghost btn-sm text-purple-300 hover:text-purple-400 transition-colors duration-200">Home</Link>
          <Link to="/sessions" className="btn btn-ghost btn-sm text-purple-300 hover:text-purple-400 transition-colors duration-200">View Sessions</Link>
          <span className="text-gray-300">Welcome, {user}</span>
          <button 
            className="btn btn-ghost btn-sm text-purple-300 hover:text-purple-400 transition-colors duration-200" 
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? <ClipLoader color="#a78bfa" size={20} /> : 'Logout'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;