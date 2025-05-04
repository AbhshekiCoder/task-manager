
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


import axios from 'axios';
import  url from '../misc/url.js'
const Signup = () => {
  
  const [form, setForm] = useState({ name: '', phone: '', email: '', country: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}api/auth/signup`, form);
      alert(res.data.message);
    } catch (error) {
      alert(error.response.data.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center dark:text-white">Sign Up</h2>
        {['name', 'phone', 'email', 'country', 'password'].map((field) => (
          <input
            key={field}
            type={field === 'password' ? 'password' : 'text'}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={handleChange}
            required
            className="w-full mb-3 px-3 py-2 rounded border dark:border-gray-700 dark:bg-gray-700 dark:text-white"
          />
        ))}
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Sign Up
        </button>
        <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-300">
  Already have an account?{' '}
  <Link to="/" className="text-green-600 hover:underline">
    Sign In
  </Link>
</p>
      </form>
      
    </div>
  );
};

export default Signup;