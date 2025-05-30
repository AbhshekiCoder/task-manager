import { FiBell, FiRepeat, FiCalendar, FiStar } from 'react-icons/fi';
import Sidebar from '../components/Sidebar.jsx';
import Navbar from '../components/Navbar.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import url from '../misc/url.js';
import { taskinfo } from '../feature/task.js';
import TaskForm from '../components/TaskForm.jsx';
import { useEffect, useState } from 'react';
import { Loader } from 'rsuite';
export default function Important() {
  let tasks = useSelector((state) => state.task.value)
  let mode = useSelector((state) => state.mode.value)
  let dispatch = useDispatch()
  const [data, setData] = useState(tasks)
  const update = async(id) =>{
      let token = localStorage.getItem("token")
      let result = await axios.put(`${url}api/updateTaskStatus/${id}`, {status: "done"} ,{
        headers: { Authorization: `Bearer ${token}` }
    
      })
      if(result.data.success){
        alert(result.data.message);
        dispatch(taskinfo(result.data.data))
        
     
    
      }
    }
   const fetch_data = async() =>{
     let token = localStorage.getItem("token");
          if(token){
            const res = await axios.get(`${url}api/task`, {
              headers: { Authorization: `Bearer ${token}` }
            });
            if(res.data.success){
             let array = res.data.data.filter(Element => Element.important == "yes");
       
            setData(array);
            }
          }
       
   }
    useEffect(()=>{
       fetch_data()
    },[tasks])

    
  return (
    <>    
   
     
    <Navbar />
    <Sidebar/>
    <div className="ml-64 p-6 min-h-screen max-md:m-auto" style={{backgroundColor:mode == "dark"?"#232323":"white", color:mode == "dark"?"white":"black"}}>
    
        <div className='max-w-5xl m-auto'> 
              <TaskForm/>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6" style={{backgroundColor:mode == "dark"?"#232323":"white", color:mode == "dark"?"white":"black"}}>
                   {data?data.map((task, index) => (
                     <div key={index} className="border p-3 rounded  "style={{backgroundColor:mode == "dark"?"#232323":"white", color:mode == "dark"?"white":"black",  boxShadow:mode == "dark"?"0 4px 12px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(255, 255, 255, 0.05)":"'0 4px 8px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.06"}}>
                       <div className="flex items-center justify-between text-sm">
                         <div className="flex items-center gap-2">
                           <input type="checkbox" checked = {task.status == "done"} className="accent-green-500" id={task._id} onClick={() =>{update(task._id)}} />
                           <span className='text-xl text-green-700'>{task.name}</span>
                         </div>
                         
                         <FaStar className='text-yellow' />
                       </div>
                       <div>
                     
                        <p className={`text-sm ${mode == "dark"?"text-white":'text-gray-600'}`}>{task.description}</p>
                        <p className={`text-sm ${mode == "dark"?"text-white":'text-gray-600'}`}>
                          {task.date} at {task.time} | Status: {task.status}
                        </p>
                      </div>
                       
                     </div>
                   )):<Loader/>}
                 </div>
              <div className="mt-6">
                <h3 className="text-sm text-gray-600 mb-2">Completed</h3>
                <ul className="space-y-2">
                {tasks?tasks.filter(Element => Element.status == "done").map((task) => (
                    <li
                      key={task._id}
                      className="flex items-center justify-between border-b-2 p-2 rounded text-sm"style={{backgroundColor:mode == "dark"?"#232323":"white", color:mode == "dark"?"white":"black"}}
                    >
                      <div className="flex items-center gap-2"> 
                        <input type="checkbox" checked readOnly className="accent-green-500" />
                        <s>{task.description}</s>
                      </div>
                      <FiStar className={mode=="dark"?"text-white":"text-gray-700"} />
                    </li>
                  )):''}
                 
                </ul>
              </div>
              
      </div>
    </div>
    </>
  );
}
