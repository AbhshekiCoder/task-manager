
import { FiBell, FiRepeat, FiCalendar, FiStar } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import "../App.css"
import { useDispatch, useSelector } from 'react-redux';
import TaskForm from '../components/TaskForm';
import axios from 'axios';
import url from '../misc/url';
import { taskinfo } from '../feature/task';
import { FaStar } from 'react-icons/fa';
const Dashboard = () => {
  let dispatch = useDispatch()
  let mode = useSelector((state) =>state.mode.value)
  let task = useSelector((state) => state.task.value)
  console.log(task)
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
  const update1 = async(id) =>{
    let token = localStorage.getItem("token")
    let result = await axios.put(`${url}api/importantTask/${id}`, {important: "yes"} ,{
      headers: { Authorization: `Bearer ${token}` }
  
    })
    if(result.data.success){
      alert(result.data.message);
      console.log(result.data.data)
      dispatch(taskinfo(result.data.data))
      
   
  
    }
  
  }


// Example usage


  return (
    <> 
    <Navbar/>
    <Sidebar/>
    <main className="ml-64 p-6 min-h-screen max-md:m-auto" style={{backgroundColor:mode == "dark"?"#232323":"white", color:mode == "dark"?"white":"black"}}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <TaskForm/>
        

        {/* To Do List */}
        <ul className="space-y-4">
          {task?task.map(Element =>(

          
            <li key={Element._id} className="flex justify-between items-center border-b pb-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={Element.status == "done"} onClick={() =>update(Element._id)} className='accent-green-600' />
                <span>{Element.name}</span>
              </div>
              {Element.important == "yes"?<FaStar className='text-yellow'  onClick={() =>{update1(Element._id)}}/>:<FiStar  style={{backgroundColor:mode == "dark"?"#232323":"white", color:mode == "dark"?"white":"black"}} onClick={() =>{update1(Element._id)}} />}
              
            </li>
          )):''}
        </ul>

        {/* Completed Section */}
        <h3 className="mt-8 mb-2 font-medium text-gray-700">Completed</h3>
        <ul className="space-y-4 text-gray-500">
          {task?task.filter(Element => Element.status == "done").map((task, idx) => (
            <li key={idx} className="flex justify-between items-center border-b pb-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" checked readOnly className="accent-green-600" />
                <span className="line-through">{task.description}</span>
              </div>
              {task.important == "yes"?<FaStar className='text-yellow'  onClick={() =>{update1(Element._id)}}/>:<FiStar  style={{backgroundColor:mode == "dark"?"#232323":"white", color:mode == "dark"?"white":"black"}} onClick={() =>{update1(Element._id)}} />}
            </li>
          )):''}
        </ul>
      </div>
    </main>
    </>
  );
};

export default Dashboard;
