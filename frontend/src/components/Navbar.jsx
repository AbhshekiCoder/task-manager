import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { FiMenu, FiSearch, FiGrid, FiMoon, FiSun } from 'react-icons/fi';
import logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom';
import { modeToggle } from '../feature/mode';
import { useDispatch, useSelector } from 'react-redux';
import { userInfo } from '../feature/user';

const Navbar = () => {
  let modes = useSelector((state) => state.mode.value)
  let user = useSelector((state) => state.user.value)
  let navigate = useNavigate()
  let reducer = useDispatch()
    let count = 1;

    let sidebar = () =>{
     count++;
      if(count % 2 == 0 ){
       
        document.querySelector(".sidebar").style.display = "block";
  
       }
       else{
      
        document.querySelector(".sidebar").style.display = "none";
  
       }
    }
    let mode = ()=>{
      if(modes == "dark"){
        localStorage.setItem("mode", "white");
        reducer(modeToggle("white"));

      }
      else{
        localStorage.setItem("mode", "dark");
        reducer(modeToggle("dark"));

      }
     
     
    }
  let logout = () =>{
    localStorage.removeItem("token");
    reducer(userInfo(""))
    navigate("/")
  }
    

  return (
    <header className="flex items-center justify-between px-4 py-3  shadow-sm sticky top-0 z-50" style={{backgroundColor:modes == "dark"?"#232323":"white", color:modes == "dark"?"white":"black"}} >
      {/* Left - Hamburger and Logo */}
      <div className="flex items-center gap-4">
        <button className="text-2xl md:hidden" onClick={sidebar}>
          <FiMenu />
        </button>
        <img
          src={logo}
          alt="DoIt Logo"
          className="w-auto h-6"
        />
      </div>

      {/* Right - Icons and Auth Buttons */}
      <div className="flex items-center space-x-4"  style={{ color:modes == "dark"?"white":"gray"}} >
        
        <button className="text-xl hover:text-green-600" onClick={mode}>
          {modes == "dark"?<FiMoon/>:<FiSun/>}
        </button>

        {/* Auth Buttons */}
        {user? <button
          onClick={logout}
          className="text-sm border px-3 py-1 rounded hover:bg-gray-100"
        >
          Logout
        </button>: <button
          onClick={() => navigate("/")}
          className="text-sm border px-3 py-1 rounded hover:bg-gray-100"
        >
          Sign In
        </button>}
        
        <button
          onClick={() => navigate("/signup")}
          className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
        >
          Sign Up
        </button>
      </div>
    </header>
  );
};

export default Navbar;
