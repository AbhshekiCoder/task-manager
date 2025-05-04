import { FiBell, FiRepeat, FiCalendar, FiStar } from 'react-icons/fi';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import { useDispatch, useSelector } from 'react-redux';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import url from '../misc/url.js';
import { taskinfo } from '../feature/task.js';
import TaskForm from '../components/TaskForm.jsx';
export default function Project() {
  let tasks = useSelector((state) => state.task.value)
  let mode = useSelector((state) => state.mode.value)
  let dispatch = useDispatch()
  const update = async(id) =>{
      let token = localStorage.getItem("token")
      let result = await axios.put(`${url}api/updateTask/${id}`, {status: "done"} ,{
        headers: { Authorization: `Bearer ${token}` }
    
      })
      if(result.data.success){
        alert(result.data.message);
        dispatch(taskinfo(result.data.data))
        
     
    
      }
    }
  return (
    <>    
    <Sidebar />
     
    <Navbar />
    <div className="ml-64 p-6 min-h-screen max-md:m-auto" style={{backgroundColor:mode == "dark"?"#232323":"white", color:mode == "dark"?"white":"black"}}>
    
        <div className='max-w-5xl m-auto'> 
              <TaskForm/>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6" style={{backgroundColor:mode == "dark"?"#232323":"white", color:mode == "dark"?"white":"black"}}>
                   {tasks?tasks.filter(Element => Element.important == "yes").map((task, index) => (
                     <div key={index} className="border p-3 rounded shadow-sm "style={{backgroundColor:mode == "dark"?"#232323":"white", color:mode == "dark"?"white":"black"}}>
                       <div className="flex items-center justify-between text-sm">
                         <div className="flex items-center gap-2">
                           <input type="checkbox" checked = {task.status == "done"} className="accent-green-500" id={task._id} onClick={() =>{update(task._id)}} />
                           <span className='text-xl text-green-700'>{task.name}</span>
                         </div>
                         
                         <FaStar className='text-yellow' />
                       </div>
                       <div>
                     
                        <p className="text-sm text-gray-600">{task.description}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {task.date} at {task.time} | Status: {task.status}
                        </p>
                      </div>
                       
                     </div>
                   )):''}
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
