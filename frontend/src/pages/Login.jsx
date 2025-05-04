import React, { useState } from 'react';
import axios from 'axios';
import url from '../misc/url.js';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userInfo } from '../feature/user.js';
const Login = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch()
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}api/auth/signin`, form);
      alert(res.data.message || 'Sign in successful');
      localStorage.setItem('token', res.data.token)
       
        
            let result = await axios.get(`${url}api/user/info/${res.data.token}`, );
            console.log(result.data)
          if(result.data.success){
            dispatch(userInfo(result.data.data))
          }
      
      navigate('/dashboard')
    
    } catch (error) {
      console.log(error.message)
      alert(error.response?.data?.message || 'Sign in failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className=" dark:bg-gray-800 p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-xl font-semibold mb-4 text-center dark:text-white">Sign In</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full mb-3 px-3 py-2 rounded border dark:border-gray-700 dark:bg-gray-700 dark:text-white"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full mb-4 px-3 py-2 rounded border dark:border-gray-700 dark:bg-gray-700 dark:text-white"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Sign In
        </button>
        <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-300">
  Don't have an account?{' '}
  <Link to="/signup" className="text-green-600 hover:underline">
    Sign Up
  </Link>
</p>
      </form>
    </div>
  );
};

export default Login;
