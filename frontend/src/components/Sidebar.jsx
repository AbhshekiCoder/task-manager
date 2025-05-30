import React, { useEffect, useState } from 'react';
import { FiCalendar, FiClipboard, FiStar, FiMap, FiUserPlus } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { taskinfo } from '../feature/task';
import { FaUser, FaUserCircle } from 'react-icons/fa';
import ProgressCircle from 'rsuite/esm/Progress/ProgressCircle';
import url from '../misc/url';
import axios from 'axios';

const Sidebar = () => {

  let mode = useSelector((state) => state.mode.value)
  let user = useSelector((state) => state.user.value)
  let task = useSelector((state) => state.task.value)
  const [isTodayTasks, setIsTodayTasks] = useState();
  

  let dispatch  = useDispatch()
  const navigate = useNavigate()
  let [count, setCount] = useState()
  let change = async() =>{
    
      let token = localStorage.getItem("token");
        if(token){
          const res = await axios.get(`${url}api/task`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          let tasks = res.data.data
    const today = new Date();

const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`;

let data = tasks.filter(Element => Element.date == formattedDate);
dispatch(taskinfo(data))
navigate('/tasks')
        

          
        }

  }
 
  const taskFetch = async()=>{
    let token = localStorage.getItem("token");
    if(token){
      const res = await axios.get(`${url}api/task`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const tasks = res.data.data
      const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    
    let data =tasks?tasks.filter(Element => Element.date == formattedDate):'';
    setCount(data.length)
    
    setIsTodayTasks(data);
    }
  }
  useEffect(()=>{
    taskFetch()

  },[task])
   
  const percent = isTodayTasks?Math.round((isTodayTasks.filter(Element => Element.status == "done").length/isTodayTasks.length)*100):0;
  let status = percent<100?'null':'success'
  percent>0 && percent<100?status = 'active':'null'

  return (
    <div className="w-64 h-full opacity-1 z-10  p-4 fixed max-md:hidden sidebar  " style={{backgroundColor:mode == "dark"?"#2C2C2C":"#35793729", color:mode == "dark"?"white":"black", opacity:"10"}} >
      <div className="flex flex-col items-center">
       <FaUserCircle className='w-12 h-12'  style={{ color:mode == "dark"?"green":"gray"}}/>
        <p className="mt-2 font-medium">Hey, {user?user.name.split(" ")[0]:''}</p>
      </div>
     <div className='p-2' >
      <nav className="mt-6 space-y-2 p-2"style={{backgroundColor:mode == "dark"?"#232323":"white", color:mode == "dark"?"white":"black"}}>
      <Link to ="/tasks" className='flex hover:no-underline'>  
        <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#35793729] rounded  "style={{hover:mode == "dark"?"black":"white", color:mode == "dark"?"white":"black"}}>
          <FiClipboard /> <span>All Tasks</span>
        </button>
        </Link>
        <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#35793729] rounded" onClick={change}>
          <FiCalendar className="text-green-600" /> <span className="">Today</span>
        </button>
        <Link to = "/important" className='hover:no-underline' style={{hover:mode == "dark"?"black":"white", color:mode == "dark"?"white":"black"}}>   
        <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#35793729]  rounded">
          <FiStar /> <span>Important</span>
        </button>
        </Link>
        
        <Link to = "/dashboard" className='hover:no-underline' style={{hover:mode == "dark"?"black":"white", color:mode == "dark"?"white":"black"}}>              
        <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#35793729]  rounded">
          <FiUserPlus /> <span>Assigned to me</span>
        </button>
        </Link>
      </nav>

      

      <div className="mt-6 p-4 rounded shadow-sm" style={{backgroundColor:mode == "dark"?"#232323":"white", color:mode == "dark"?"white":"black"}}>
        <div className="flex justify-between text-sm font-medium">
          <span>Today Tasks</span>
          <span>{count}</span>
        </div>
        <div className="mt-4 flex justify-center">
        <div style={{ width: 120, marginTop: 10 }}>
            <ProgressCircle percent={percent} strokeColor="green" status={status}/>
          </div>
        </div>
        <div className="flex justify-center gap-2 text-sm mt-2">
          <span className={`${percent == 100?'text-green-500':'text-gray-500'}`}>● Done</span>
          <span className={`${percent == 100?'text-gray-500':'text-green-500'}`}>● Pending</span>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Sidebar;
