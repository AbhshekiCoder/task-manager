import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { FiBell, FiRepeat, FiCalendar, FiStar, FiTrash2, FiEdit, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import TaskForm from '../components/TaskForm';
import axios from 'axios';
import { taskinfo } from '../feature/task';
import url from '../misc/url.js';
import { FaStar, FaTrash } from 'react-icons/fa';
import { Loader } from 'rsuite';

const Tasks = () => {
  
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const [updateFormData, setUpdateFormData] = useState({
    id: "",
    name: "",
    description: "",
    date: "",
    time: "",
    priority: ""
  });
  
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;
  
  const mode = useSelector((state) => state.mode.value);
  const tasks = useSelector((state) => state.task.value);
  
  // Text color classes based on mode
  const textColor = mode === "dark" ? "text-gray-200" : "text-gray-800";
  const secondaryTextColor = mode === "dark" ? "text-gray-400" : "text-gray-600";
  const mutedTextColor = mode === "dark" ? "text-gray-500" : "text-gray-400";
  
  // Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
      let token = localStorage.getItem("token");
    if(token){
      const res = await axios.get(`${url}api/task`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if(res.data.success){
        dispatch(taskinfo(res.data.data))
      }

    }
      } catch (err) {
        console.log(err);
      }
    };
    
    fetchTasks();
  }, []);

  // Handle task update
  const handleUpdateChange = (e) => {
    setUpdateFormData({ ...updateFormData, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${url}api/updateTask/${updateFormData.id}`,
        updateFormData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
       
         let token = localStorage.getItem("token");
    if(token){
      const res = await axios.get(`${url}api/task`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if(res.data.success){
        dispatch(taskinfo(res.data.data))
      }

    }
        
        document.querySelector('.task-update-form').style.display = "none";
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Update task status (complete/incomplete)
  const updateTask = async (taskId) => {
    try {
      const res = await axios.put(
        `${url}api/updateTaskStatus/${taskId}`,
        {status: "done"},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data.success) {
        dispatch(taskinfo(res.data.data));
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Update important status
  const updateImportant = async (taskId) => {
    try {
      let res = await axios.put(`${url}api/updateImportant/${taskId}`, {important: "yes"} ,{
           headers: { Authorization: `Bearer ${token}` }
       
         })
      if (res.data.success) {
        dispatch(taskinfo(res.data.data));
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Delete task
  const handleDelete = async (taskId) => {
    try {
      const res = await axios.delete(`${url}api/deleteTask/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.success) {
        dispatch(taskinfo(res.data.data));
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  // Get background color based on priority (updated with requested colors)
  const getPriorityColor = (priority) => {
    if (mode === "dark") {
      return {
        high: "bg-green-900/60",    // Dark green for high priority
        medium: "bg-amber-900/60", // Dark yellow for medium
        low: "bg-red-900/60"        // Dark red for low
      }[priority];
    }
    
    return {
      high: "bg-green-100",   // Light green for high priority
      medium: "bg-amber-100", // Light yellow for medium
      low: "bg-red-100"        // Light red for low
    }[priority];
  };

  // Get border color based on priority (updated with requested colors)
  const getPriorityBorder = (priority) => {
    return {
      high: "border-green-500",   // Green border for high priority
      medium: "border-amber-500", // Yellow border for medium
      low: "border-red-500"        // Red border for low
    }[priority];
  };

  // Pagination logic for active tasks
  const activeTasks = tasks ? tasks.filter(task => task.status !== "done") : [];
  const completedTasks = tasks ? tasks.filter(task => task.status === "done") : [];
  
  // Get current active tasks for pagination
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentActiveTasks = activeTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(activeTasks.length / tasksPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Handle previous page
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  // Handle next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <> 
      <Navbar/>
      <Sidebar/>
     
      <div 
        className={`ml-64 p-6 min-h-screen max-md:ml-0 `}
        style={{
        backgroundColor: mode == "dark" ? "#232323" : "white", 
       
      }}
      >
        <div className='max-w-4xl m-auto'> 
          <TaskForm/>
          
          {/* Active Tasks Section */}
          <div className="mt-8">
            <h3 className={`text-lg font-semibold mb-3 ${textColor}`}>Active Tasks</h3>
            
            {activeTasks.length === 0 ? (
              <div className={`text-center py-8 ${mutedTextColor}`}>
                No active tasks. Create a new task to get started!
              </div>
            ) : (
              <>
                <div className="flex flex-wrap gap-4 m-auto">
                  {currentActiveTasks?currentActiveTasks.map((task, index) => (
                    <div 
                      key={task._id}
                      className={`p-3 rounded-lg border-l-4 w-64 ${index === 0 ? 'mt-0' : ''} ${
                        mode === 'dark' ? 'min-h-fit' : 'min-h-fit'
                      } flex flex-col m-auto ${getPriorityColor(task.priority)} ${getPriorityBorder(task.priority)}`}
                    >
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex  gap-2">
                          <input 
                            type="checkbox" 
                            checked={task.status === "done"} 
                            className="accent-green-500" 
                            id={task._id} 
                            onChange={() => updateTask(task._id)} 
                          />
                          <span className={`text-lg font-medium ${textColor}`} style={{ textDecoration: task.status === "done" ? "line-through" : "none" }}>
                            {task.name}
                          </span>
                        </div>
                        
                        <div className="flex gap-2">
                          {task.important === "yes" ? (
                            <FaStar className='text-yellow hover:cursor-pointer' onClick={() => updateImportant(task._id)}/>
                          ) : (
                            <FiStar className='text-yellow hover:cursor-pointer' onClick={() => updateImportant(task._id)} />
                          )}
                          
                          <FiTrash2
                            className={`hover:text-red-500 cursor-pointer ${textColor}`}
                            onClick={() => handleDelete(task._id)}
                          />
                          
                          <FiEdit 
                            className={`cursor-pointer hover:text-green-500 ${textColor}`}
                            onClick={() => {
                              document.querySelector('.task-update-form').style.display = "flex";
                              setUpdateFormData({
                                id: task._id, 
                                name: task.name, 
                                description: task.description,
                                date: task.date,
                                time: task.time,
                                priority: task.priority
                              });
                            }}
                          />
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <p className={`text-sm ${secondaryTextColor}`} style={{ textDecoration: task.status === "done" ? "line-through" : "none" }}>
                          {task.description}
                        </p>
                        <p className={`text-xs ${mutedTextColor} mt-2`}>
                          {task.date} at {task.time} | Priority: 
                          <span className={`ml-1 px-2 py-1 rounded-full ${
                            task.priority === "high" ? "bg-green-500" :
                            task.priority === "medium" ? "bg-amber-500" : "bg-red-500"
                          } text-white`}>
                            {task.priority}
                          </span>
                          <div>{task.status}</div>
                        </p>
                      </div>
                      
                      {task.important === "yes" && (
                        <span className="absolute top-4 right-4 text-xs bg-yellow-500 text-white px-2 py-1 rounded-full">
                          Important
                        </span>
                      )}
                    </div>
                  )):<Loader/>}
                </div>
                
                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center mt-6">
                    <button 
                      onClick={handlePrevPage} 
                      disabled={currentPage === 1}
                      className={`flex items-center px-3 py-1 rounded-l ${
                        currentPage === 1 
                          ? `bg-gray-200 ${mode === "dark" ? "text-gray-500" : "text-gray-500"} cursor-not-allowed ${mode === "dark" ? "bg-gray-700" : ""}` 
                          : `bg-gray-300 hover:bg-gray-400 ${mode === "dark" ? "bg-gray-600 hover:bg-gray-700" : ""} ${textColor}`
                      }`}
                    >
                      <FiChevronLeft className="mr-1" /> Prev
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`px-3 py-1 ${
                          currentPage === number 
                            ? 'bg-blue-500 text-white dark:bg-blue-700' 
                            : `bg-gray-300 hover:bg-gray-400 ${mode === "dark" ? "bg-gray-600 hover:bg-gray-700" : ""} ${textColor}`
                        }`}
                      >
                        {number}
                      </button>
                    ))}
                    
                    <button 
                      onClick={handleNextPage} 
                      disabled={currentPage === totalPages}
                      className={`flex items-center px-3 py-1 rounded-r ${
                        currentPage === totalPages 
                          ? `bg-gray-200 ${mode === "dark" ? "text-gray-500" : "text-gray-500"} cursor-not-allowed ${mode === "dark" ? "bg-gray-700" : ""}` 
                          : `bg-gray-300 hover:bg-gray-400 ${mode === "dark" ? "bg-gray-600 hover:bg-gray-700" : ""} ${textColor}`
                      }`}
                    >
                      Next <FiChevronRight className="ml-1" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
          
          {/* Completed Tasks Section */}
          <div className="mt-8">
            <h3 className={`text-lg font-semibold mb-3 ${textColor}`}>Completed Tasks</h3>
            {completedTasks.length === 0 ? (
              <div className={`text-center py-4 ${mutedTextColor}`}>
                No completed tasks yet
              </div>
            ) : (
              <ul className="space-y-2">
                {completedTasks.map((task) => (
                  <li
                    key={task._id}
                    className={`flex items-center justify-between p-3 rounded text-sm border ${
                      mode === "dark" ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-2 w-full">
                      <input 
                        type="checkbox" 
                        checked 
                        readOnly 
                        className="accent-green-500" 
                      />
                      <div className="flex-1">
                        <div className={`font-medium line-through ${textColor}`}>{task.name}</div>
                        <div className={`text-xs ${mutedTextColor}`}>
                          {task.date} at {task.time} | Priority: {task.priority}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                     {task.important === "yes" ? (
                            <FaStar className='text-yellow hover:cursor-pointer' />
                          ) : (
                            <FiStar className='text-yellow hover:cursor-pointer'  />
                          )}
                      <FiTrash2
                        className={`hover:text-red-500 cursor-pointer ${textColor}`}
                        onClick={() => handleDelete(task._id)}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      
      {/* Update Task Modal */}
      <div 
        className='task-update-form modal hidden fixed inset-0 bg-black bg-opacity-50 z-50 justify-center items-center p-4'
        onClick={(e) => {
          if (e.target.classList.contains('modal')) {
            document.querySelector('.task-update-form').style.display = "none";
          }
        }}
      >
        <div 
          className={`p-6 rounded-lg shadow-xl w-full max-w-md ${mode === "dark" ? "bg-gray-800" : "bg-white"}`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className={`text-xl font-bold ${textColor}`}>Update Task</h2>
            <FiX 
              className={`text-xl cursor-pointer hover:text-red-500 ${textColor}`}
              onClick={() => document.querySelector('.task-update-form').style.display = "none"}
            />
          </div>
          
          <form onSubmit={handleUpdateSubmit} className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-1 ${textColor}`}>Task Name</label>
              <input
                type="text"
                name="name"
                value={updateFormData.name}
                onChange={handleUpdateChange}
                placeholder="Task Name"
                required
                className={`w-full p-2 rounded ${mode === "dark" ? "bg-gray-700 text-white" : "bg-white text-black"} border ${
                  mode === "dark" ? "border-gray-600" : "border-gray-300"
                }`}
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-1 ${textColor}`}>Description</label>
              <textarea
                name="description"
                value={updateFormData.description}
                onChange={handleUpdateChange}
                placeholder="Description"
                required
                className={`w-full p-2 rounded h-24 ${mode === "dark" ? "bg-gray-700 text-white" : "bg-white text-black"} border ${
                  mode === "dark" ? "border-gray-600" : "border-gray-300"
                }`}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${textColor}`}>Date</label>
                <input
                  type="date"
                  name="date"
                  value={updateFormData.date}
                  onChange={handleUpdateChange}
                  required
                  className={`w-full p-2 rounded ${mode === "dark" ? "bg-gray-700 text-white" : "bg-white text-black"} border ${
                    mode === "dark" ? "border-gray-600" : "border-gray-300"
                  }`}
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-1 ${textColor}`}>Time</label>
                <input
                  type="time"
                  name="time"
                  value={updateFormData.time}
                  onChange={handleUpdateChange}
                  required
                  className={`w-full p-2 rounded ${mode === "dark" ? "bg-gray-700 text-white" : "bg-white text-black"} border ${
                    mode === "dark" ? "border-gray-600" : "border-gray-300"
                  }`}
                />
              </div>
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-1 ${textColor}`}>Priority</label>
              <select
                name="priority"
                value={updateFormData.priority}
                onChange={handleUpdateChange}
                className={`w-full p-2 rounded ${mode === "dark" ? "bg-gray-700 text-white" : "bg-white text-black"} border ${
                  mode === "dark" ? "border-gray-600" : "border-gray-300"
                }`}
                required
              >
                <option value="">Select Priority</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                className={`px-4 py-2 rounded hover:bg-gray-400 ${
                  mode === "dark" ? "bg-gray-600 text-white" : "bg-gray-300 text-gray-700"
                }`}
                onClick={() => document.querySelector('.task-update-form').style.display = "none"}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Update Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
};

export default Tasks;