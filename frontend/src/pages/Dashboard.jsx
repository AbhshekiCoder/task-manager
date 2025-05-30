import { FiStar } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import "../App.css"
import { useDispatch, useSelector } from 'react-redux';
import TaskForm from '../components/TaskForm';
import axios from 'axios';
import url from '../misc/url';
import { taskinfo } from '../feature/task';
import { FaStar } from 'react-icons/fa';
import { useState } from 'react';
import { Notification } from 'rsuite';

const Dashboard = () => {
  let dispatch = useDispatch();
  let mode = useSelector((state) => state.mode.value);
  let tasks = useSelector((state) => state.task.value);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  const update = async(id) => {
    let token = localStorage.getItem("token");
    let result = await axios.put(`${url}api/updateTaskStatus/${id}`, {status: "done"}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if(result.data.success) {
      alert(result.data.message);
      dispatch(taskinfo(result.data.data));
    }
  };

  const updateImportant = async(id) => {
    let token = localStorage.getItem("token");
    let result = await axios.put(`${url}api/updateImportant/${id}`, {important: "yes"}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if(result.data.success) {
      alert(result.data.message);
      dispatch(taskinfo(result.data.data));
    }
  };

  // Sort tasks by priority (assuming priority is a field in your task object)
  // If priority doesn't exist, we'll default to 'medium'
  const sortedTasks = tasks ? [...tasks].sort((a, b) => {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    const aPriority = a.priority || 'medium';
    const bPriority = b.priority || 'medium';
    return priorityOrder[aPriority] - priorityOrder[bPriority];
  }) : [];

  // Group tasks by priority
  const tasksByPriority = sortedTasks.reduce((acc, task) => {
    const priority = task.priority || 'medium';
    if (!acc[priority]) {
      acc[priority] = [];
    }
    acc[priority].push(task);
    return acc;
  }, {});

  // Pagination logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = sortedTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(sortedTasks.length / tasksPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <> 
      <Navbar/>
      <Sidebar/>
     
      <main className="ml-64 p-6 min-h-screen max-md:m-auto" style={{
        backgroundColor: mode == "dark" ? "#232323" : "white", 
        color: mode == "dark" ? "white" : "black"
      }}>
        
        <div className="max-w-2xl mx-auto">
          <TaskForm/>
          
          {/* Tasks grouped by priority */}
          {Object.entries(tasksByPriority).map(([priority, tasks]) => (
            <div key={priority} className="mb-8">
              <h2 className="text-xl font-semibold mb-4 capitalize">{priority} Priority Tasks</h2>
              <ul className="space-y-4">
                {tasks.map(task => (
                  <li key={task._id} className="flex justify-between items-center border-b pb-2">
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        checked={task.status == "done"} 
                        onClick={() => update(task._id)} 
                        className='accent-green-600' 
                      />
                      <span className={task.status == "done" ? "line-through" : ""}>
                        {task.name}
                      </span>
                    </div>
                    {task.important == "yes" ? (
                      <FaStar 
                        className='text-yellow hover:cursor-pointer'  
                        onClick={() => updateImportant(task._id)}
                        
                      />
                    ) : (
                      <FiStar  
                        className='text-yellow hover:cursor-pointer'
                        onClick={() => updateImportant(task._id)} 
                      />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Paginated view of all tasks */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">All Tasks</h2>
            <ul className="space-y-4">
              {currentTasks.map(task => (
                <li key={task._id} className="flex justify-between items-center border-b pb-2">
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      checked={task.status == "done"} 
                      onClick={() => update(task._id)} 
                      className='accent-green-600' 
                    />
                    <span className={task.status == "done" ? "line-through" : ""}>
                      {task.name}
                    </span>
                  </div>
                  {task.important == "yes" ? (
                    <FaStar 
                      className='text-yellow hover:cursor-pointer'  
                      onClick={() => updateImportant(task._id)}
                    />
                  ) : (
                    <FiStar  
                      className='text-yellow hover:cursor-pointer'
                      onClick={() => updateImportant(task._id)} 
                    />
                  )}
                </li>
              ))}
            </ul>

            {/* Pagination controls */}
            {sortedTasks.length > tasksPerPage && (
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 mx-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                  Previous
                </button>
                
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`px-4 py-2 mx-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                  >
                    {index + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 mx-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>

          {/* Completed Section */}
          <h3 className="mt-8 mb-2 font-medium text-gray-700">Completed</h3>
          <ul className="space-y-4 text-gray-500">
            {tasks ? tasks.filter(task => task.status == "done").map((task) => (
              <li key={task._id} className="flex justify-between items-center border-b pb-2">
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked readOnly className="accent-green-600" />
                  <span className="line-through">{task.description}</span>
                </div>
                {task.important == "yes" ? (
                  <FaStar className='text-yellow hover:cursor-pointer' onClick={() => updateImportant(task._id)}/>
                ) : (
                  <FiStar className='text-yellow hover:cursor-pointer' onClick={() => updateImportant(task._id)} />
                )}
              </li>
            )) : ''}
          </ul>
        </div>
      </main>
    </>
  );
};

export default Dashboard;