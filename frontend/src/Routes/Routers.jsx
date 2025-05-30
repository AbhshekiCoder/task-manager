

import Dashboard from "../pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import Signup from "../pages/Signup.jsx"
import Login from "../pages/Login.jsx"
import Tasks from "../pages/Tasks.jsx";

import { useEffect } from "react";
import axios from "axios";
import url from "../misc/url.js";
import { useDispatch } from "react-redux";
import { userInfo } from "../feature/user.js";
import { taskinfo } from "../feature/task.js";

import Important from "../pages/Important.jsx";










const Routers = ()=>{
   let dispatch = useDispatch();
  useEffect(() =>{
    user()
    task()


    
    
  },[])
  let user = async() =>{
    let token = localStorage.getItem("token");
    if(token){
      let result = await axios.get(`${url}api/user/info/${token}`, );
      console.log(result.data)
    if(result.data.success){
      dispatch(userInfo(result.data.data))
    }


    }
  }

  let task = async() =>{
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
  return(
    <>
    <Routes>
      
      <Route path = "/" element={<Login/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
      <Route path="/tasks" element={<Tasks/>}></Route>
      <Route path="/important" element={<Important/>}></Route>
    </Routes>
    
    </>
  )
}

export default Routers;

