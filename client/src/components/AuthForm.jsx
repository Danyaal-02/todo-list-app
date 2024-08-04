import React, { useState } from 'react';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../utils/axiosInstance';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/features/authSlice';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const signupSchema = loginSchema.extend({
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

const AuthForm = ({ formType }) => {
  const initialFormData = formType === 'signup' ? { name: '', email: '', password: '' } : { email: '', password: '' };
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const schema = formType === 'login' ? loginSchema : signupSchema;
    try {
      schema.parse(formData);
      setErrors({});
      return true;
    } catch (error) {
      const newErrors = {};
      error.errors.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      return false;
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!validateForm()) return

    setIsSubmitting(true);

    if(formType === "login"){
      try {
        const {data}  = await axiosInstance.post("/login" , formData)
        const {message , token , sessionId , user } = data
        
        toast.success(message);
        dispatch(addUser({user , sessionId , token }))
        navigate("/")
      } catch (error) {
        toast.error(error.response.data.message)
      } finally {
        setIsSubmitting(false);
      }
    }else if(formType === "signup"){
      try {
        const {data} = await axiosInstance.post("/register" , formData)
  
        toast.success(data.message);
        toast.success("You can login Now");
        navigate("/login")
      } catch (error) {
        toast.error(error.response.data.message)
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {formType === 'signup' && (
        <div>
          <label className="label">
            <span className="label-text text-gray-300">Name</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            className="input input-bordered w-full bg-gray-700 text-gray-100"
            placeholder="Enter your name"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
      )}
      
      <div>
        <label className="label">
          <span className="label-text text-gray-300">Email</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="input input-bordered w-full bg-gray-700 text-gray-100"
          placeholder="Enter your email"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>
      
      <div>
        <label className="label">
          <span className="label-text text-gray-300">Password</span>
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="input input-bordered w-full pr-10 bg-gray-700 text-gray-100"
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
      </div>

      {formType === "signup" ? (
        <div className='mt-4'>
          Already a User? <Link to="/login" className='text-purple-400 hover:text-purple-300 transition-colors duration-200'>Login</Link>
        </div>
      ) : (
        <div className='mt-4'>
          Don't Have An Account? <Link to="/signup" className='text-purple-400 hover:text-purple-300 transition-colors duration-200'>Sign Up</Link>
        </div>
      )}
      
      <button 
        type="submit" 
        className="btn w-full bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-200"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          formType === 'login' ? 'Login' : 'Sign Up'
        )}
      </button>
    </form>
  );
};

export default AuthForm;