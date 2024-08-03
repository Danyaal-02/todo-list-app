import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from "../utils/axiosInstance";
import { removeUser } from '../redux/features/authSlice';
import { useQueryClient } from '@tanstack/react-query';

const Navbar = () => {
  const user = useSelector(store => store.auth.username);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await axiosInstance.get('/logout');
      queryClient.clear(); 
      dispatch(removeUser());
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (!user) return null;

  return (
    <nav className="bg-gray-800 text-gray-100 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-purple-300 hover:text-purple-400 transition-colors duration-200">Todo App</Link>
        <div className="flex items-center space-x-4">
          <span className="text-gray-300">Welcome, {user}</span>
          <Link to="/sessions" className="btn btn-ghost btn-sm text-purple-300 hover:text-purple-400 transition-colors duration-200">View Sessions</Link>
          <button className="btn btn-ghost btn-sm text-purple-300 hover:text-purple-400 transition-colors duration-200" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;