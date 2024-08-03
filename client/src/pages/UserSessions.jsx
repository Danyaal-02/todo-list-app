import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../utils/axiosInstance';
import toast from 'react-hot-toast';
import { Navbar } from '../components';
import { FaCalendarAlt, FaGlobe, FaSignOutAlt } from 'react-icons/fa';

const UserSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await axiosInstance.get('/sessions', { withCredentials: true });
      toast.success("Sessions fetched successfully")
      setSessions(response.data.sessions);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch sessions');
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <span className="loading loading-spinner loading-lg text-purple-500"></span>
    </div>
  );
  
  if (error) return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="text-center text-red-500 bg-gray-800 p-6 rounded-lg shadow-lg">
        {error}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Navbar/>
      <div className="container mx-auto p-6 animate-fadeIn">
        <h1 className="text-4xl font-bold mb-8 text-center text-purple-300">User Sessions</h1>
        {sessions?.length < 1 ? (
          <div className="text-center bg-gray-800 p-8 rounded-lg shadow-lg">
            <p className="text-xl text-gray-400">No sessions found.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sessions?.map((session) => {
              let { loginTime, ipAddress, _id: id, logoutTime } = session
              let newLoginTime = convertToIST(loginTime)
              return (
                <div key={id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                  <div className="p-6">
                    <div className="flex items-center mb-4 text-purple-300">
                      <FaCalendarAlt className="mr-2" />
                      <h2 className="text-xl font-semibold">Session</h2>
                    </div>
                    <div className="space-y-3">
                      <p className="flex items-center">
                        <FaCalendarAlt className="mr-2 text-purple-400" />
                        <span className="font-medium">Login:</span>
                        <span className="ml-2">{newLoginTime}</span>
                      </p>
                      <p className="flex items-center">
                        <FaGlobe className="mr-2 text-purple-400" />
                        <span className="font-medium">IP:</span>
                        <span className="ml-2">{ipAddress}</span>
                      </p>
                      <p className="flex items-center">
                        <FaSignOutAlt className="mr-2 text-purple-400" />
                        <span className="font-medium">Logout:</span>
                        <span className="ml-2">{convertToIST(logoutTime) || "NA"}</span>
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  );
};

function convertToIST(dateString) {
  const date = new Date(dateString);
  const options = {
    timeZone: 'Asia/Kolkata', 
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };

  return date.toLocaleString('en-IN', options);
}

export default UserSessions;