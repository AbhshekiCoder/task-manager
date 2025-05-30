
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


import axios from 'axios';
import  url from '../misc/url.js'
import { Message } from 'rsuite';
const Signup = () => {

const [form, setForm] = useState({ name: '', phone: '', email: '', password: '' });
const [type, setType] = useState()
const [message, setMessage] = useState()
  const navigate = useNavigate()  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}api/auth/signup`, form);
       if(res.data.success){
         setMessage(res.data.message)
            setType('success');
            document.querySelector('.message').style.display = "flex";
            setTimeout(()=>{
               document.querySelector('.message').style.display = "none";


            },3000) 
            navigate('/')
            
     }else{

     }


    } catch (error) {
       setMessage(error.response?.data?.message || 'Signup failed')
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center dark:text-white">Sign Up</h2>
       
          <input
           
            type= "text"
            name="name"
            placeholder="Name"
            value={form['name']}
            onChange={handleChange}
            required
            className="w-full mb-3 px-3 py-2 rounded border dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            minLength={2}
            pattern="[A-Za-z\s]+"
            title="only letters and spaces allowed"
            
           
            
          />
           <input
          
            type= 'number'
            name='phone'
            placeholder="Phone"
            value={form['phone']}
            onChange={handleChange}
            required
            className="w-full mb-3 px-3 py-2 rounded border dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            minLength={10}
            maxLength={10}
      
    
            
           
            
          />
        
         <input
            
            type='email'
            name='email'
            placeholder="Email"
            value={form['email']}
            onChange={handleChange}
            required
            className="w-full mb-3 px-3 py-2 rounded border dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            oninput="this.value = this.value.toLowerCase();"
            
           
            
          />
        
       
        
         <input
        
            type='password'
            name='password'
            placeholder='Password'
            value={form['password']}
            onChange={handleChange}
            required
            className="w-full mb-3 px-3 py-2 rounded border dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            minLength={6}
      
            
           
            
          />
        
        
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Sign Up
        </button>
        <p className="text-sm text-center mt-4 text-gray-600 dark:text-gray-700">
  Already have an account?{' '}
  <Link to="/" className="text-green-600 hover:no-underline hover:text-green-700">
    Sign In
  </Link>
</p>
      </form>
      
    </div>
    </>
  );
};

export default Signup;