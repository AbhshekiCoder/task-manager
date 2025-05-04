import React, { useEffect, useState } from 'react';
import { FiCalendar, FiClipboard, FiStar, FiMap, FiUserPlus, FiPlus } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { taskinfo } from '../feature/task';
import { FaUser, FaUserCircle } from 'react-icons/fa';

const Sidebar = () => {
  let mode = useSelector((state) => state.mode.value)
  let user = useSelector((state) => state.user.value)
  let task = useSelector((state) => state.task.value)
  const [isTodayComplete, setIsTodayComplete] = useState(false);

  let dispatch  = useDispatch()
  let [count, setCount] = useState()
  let change = () =>{
    let tasks = task
    const today = new Date();

const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`;

let data = task.filter(Element => Element.date == formattedDate);
dispatch(taskinfo(data))
setTimeout(() =>{
  dispatch(taskinfo(tasks))

},60000)


  }
  useEffect(()=>{
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    
    let data =task?task.filter(Element => Element.date == formattedDate):'';
    setCount(data.length)
    console.log(data)
    const allCompleted = data.length > 0 && data.every(Element => Element.status == "done");
    console.log(allCompleted)
    setIsTodayComplete(allCompleted);

  },[task])
  const circumference = 100;
  const progress = isTodayComplete ? 100 : 0;
  const dashOffset = circumference - (progress / 100) * circumference;
  return (
    <aside className="w-64 opacity-1 z-10 h-screen p-4  absolute max-md:hidden sidebar  " style={{backgroundColor:mode == "dark"?"#2C2C2C":"#35793729", color:mode == "dark"?"white":"black", opacity:"10"}} >
      <div className="flex flex-col items-center">
       <FaUserCircle className='w-12 h-12'  style={{ color:mode == "dark"?"green":"gray"}}/>
        <p className="mt-2 font-medium">Hey, {user?user.name.split(" ")[0]:''}</p>
      </div>
     <div className='p-2' >
      <nav className="mt-6 space-y-2"style={{backgroundColor:mode == "dark"?"#232323":"white", color:mode == "dark"?"white":"black"}}>
      <Link to ="/tasks" className='flex hover:no-underline'>  
        <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#35793729] rounded  "style={{hover:mode == "dark"?"black":"white", color:mode == "dark"?"white":"black"}}>
          <FiClipboard /> <span>All Tasks</span>
        </button>
        </Link>
        <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-[#35793729] rounded" onClick={change}>
          <FiCalendar className="text-green-600" /> <span className="">Today</span>
        </button>
        <Link to = "/project" className='hover:no-underline' style={{hover:mode == "dark"?"black":"white", color:mode == "dark"?"white":"black"}}>   
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
        <svg viewBox="0 0 36 36" className="w-24 h-24 rotate-[-90deg]">
        <path
          d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="3"
        />
        <path
          d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#22c55e"
          strokeWidth="3"
          strokeDasharray={`${circumference}`}
          strokeDashoffset={`${dashOffset}`}
        />
      </svg>
        </div>
        <div className="flex justify-center gap-2 text-sm mt-2">
          <span className={`${isTodayComplete?'text-green-500':'text-gray-500'}`}>● Done</span>
          <span className={`${isTodayComplete?'text-gray-500':'text-green-500'}`}>● Pending</span>
        </div>
      </div>
      </div>
    </aside>
  );
};

export default Sidebar;
