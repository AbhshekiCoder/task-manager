import React, { useState, useEffect } from 'react';
import axios from 'axios';
import url from '../misc/url.js';
import {  Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { taskinfo } from '../feature/task.js';
import { Message } from 'rsuite';
import { userInfo } from '../feature/user.js';
const Login = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch()
  const [form, setForm] = useState({ email: '', password: '' });
  const [type, setType] = useState()
  const [message, setMessage] = useState()
let taskFetch = async() =>{
    let token = localStorage.getItem("token");
    if(token){
      const res = await axios.get(`${url}api/task`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if(res.data.success){
        dispatch(taskinfo(res.data.data))
      }

    }
   

  }
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}api/auth/signin`, form);
      if(res.data.success){
         setMessage(res.data.message)
            setType('success');
            document.querySelector('.message').style.display = "flex";
            setTimeout(()=>{
               document.querySelector('.message').style.display = "none";


            },3000) 
            
            localStorage.setItem('token', res.data.token)
       
      }
      
     
        
            let result = await axios.get(`${url}api/user/info/${res.data.token}`, );
            console.log(result.data)
          if(result.data.success){
            dispatch(userInfo(result.data.data))
            taskFetch()
            
            
          }
      
     navigate('/tasks')
    
    } catch (error) {
      console.log(error.message);
       setMessage(error.response?.data?.message || 'Sign in failed')
            setType('warning');
            document.querySelector('.message').style.display = "flex";
            setTimeout(()=>{
               document.querySelector('.message').style.display = "none";


            },3000) 
    }
      
    
  };
  
  return (
    <>  
    <div className='message absolute hidden justify-center w-full '>    
      <Message showIcon type={type} className='w-fit m-auto '>{message}</Message>
      </div>
    <div className="h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      
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
    </>
  );
};

export default Login;
