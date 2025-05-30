import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiBell, FiRepeat, FiCalendar, FiStar, FiX, FiRefreshCw, FiRefreshCcw } from 'react-icons/fi';
import url from '../misc/url.js';
import axios from 'axios';
import { taskinfo } from '../feature/task.js';
import {Calendar, Notification} from 'rsuite'
import 'rsuite/dist/rsuite.min.css';
export default function TaskForm() {
  let dispatch = useDispatch()
  let mode = useSelector((state) => state.mode.value);
  let task = useSelector((state) => state.task.value)

  let [date, setDate] = useState()
  

 
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    time: '',
    status: 'pending',
    priority: 'low'
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const res = await axios.post(`${url}api/createTask`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if(res.data.success){
        alert(res.data.message)
        
        dispatch(taskinfo(res.data.data))
      }
      
      setFormData({ name: '', description: '', date: '', time: '', status: 'pending', priority: 'low' });
    } catch (err) {
      console.error('Failed to add task:', err);
    }
  };
  let calendar = (e) =>{
    let tasks = task
    dispatch(taskinfo(tasks))
   
    let date = new Date(e)
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    
    const formattedDate = `${year}-${month}-${day}`;

   
    let data = task.filter(Element => Element.date == formattedDate)
  
    dispatch(taskinfo(data))
    
    document.querySelector('.calendar').style.display = "none"

  }
  
  useEffect(() =>{
    console.log(date)
    

  },[date])
  let repeat = async() =>{
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
    // Step 1: Request permission from the user

// Step 2: Show notification (if permission is granted)

  return (
   <>
   <div className='notification modal w-full   h-fit justify-center  text-center'>
   <Notification className='absolute  ' type='info' header="tasks in progress" ><div className='flex justify-end'><FiX className='hover:cursor-pointer' onClick={()=>{document.querySelector('.notification').style.display = "none"}}/></div> you have to complete this tasks  {task?task.filter(Element => Element.status == "in progress").map(Element => Element.name):''}</Notification>
   </div>
       <div className={`text-sm ${mode=="dark"?"text-white":"text-gray-700"} text-gray-700 font-medium mb-2`}>To Do ▾</div>
        
                {/* Task Input Card */}
                <div className=" p-4 rounded  mb-6 bg-[#496E4B33]" >
        
               
        
                  <div className="flex justify-between items-center">
                    <div className="flex gap-4 text-xl text-gray-600" style={{ color:mode == "dark"?"white":"gray"}}>
                      <FiBell className='hover:cursor-pointer' onClick={()=>{document.querySelector('.notification').style.display = "flex"; setTimeout(()=>{document.querySelector('.notification').style.display = "none"},30000)}} />
                      <FiRefreshCw className='hover:cursor-pointer' onClick = {repeat}/>
                      <FiCalendar className='hover:cursor-pointer' onClick={() =>{document.querySelector('.calendar').style.display = "block"}}/>

                      
                    </div>
                    <button className="bg-[#357937E0] text-white text-sm font-medium px-4 py-2 rounded hover:bg-green-200" onClick={() =>{document.querySelector('.task-form').style.display = "block"}}>
                      ADD TASK
                    </button>
                  </div>
                </div>
                <div className='calendar modal hidden w-full h-screen flex justify-center'>
                  <Calendar compact  onSelect={calendar} style={{ width: 320 }} className='bg-white  text-black m-auto '/>
                  

                </div>
               <div className='task-form modal h-full  hidden m-auto w-full flex justify-center items-center'>
                <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-3 max-w-md mx-auto  h-fit m-auto ">
                  <div className="flex  justify-end hover:cursor-pointer text-black" onClick={()=>{document.querySelector('.task-form').style.display = "none"}}><FiX/></div>
      <h2 className="text-lg font-semibold text-gray-700">Add New Task</h2>

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Task Name"
        required
        className="w-full border p-2 rounded text-black"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        required
        className="w-full border p-2 rounded text-black"
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded text-gray-700"
      />
      <input
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded text-gray-700"
      />
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full border p-2 rounded text-gray-700"
        required
      >
        <option value="pending">Pending</option>
        <option value="in progress">In Progress</option>
        <option value="done">Done</option>
      </select>
        <select
        name="priority"
        value={formData.priority}
        onChange={handleChange}
        className="w-full border p-2 rounded text-gray-700"
        required
      >
        <option value="low">low</option>
        <option value="medium">medium</option>
        <option value="high">high</option>
      </select>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add Task
      </button>
    </form>
               </div>
     
   </>
  );
}
