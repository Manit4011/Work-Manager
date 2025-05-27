'use client';
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import UserContext from '@/context/userContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ShowTaskPage = () => {
  const { user } = useContext(UserContext);
  const currentUser = user?.user;

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      if (!currentUser?._id) return;

      const res = await axios.get(`/api/users/${currentUser._id}/tasks`);
      setTasks(res.data.tasks || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser?._id) {
      fetchTasks();
    }
  }, [currentUser]);

  const handleToggleStatus = async (task) => {
    try {
      const updatedStatus = task.status === 'Completed' ? 'Pending' : 'Completed';

      await axios.put(`/api/tasks/${task._id}`, {
        title: task.title,
        content: task.content,
        status: updatedStatus,
        userId: currentUser._id,
      });

      toast.success('Task status updated');
      fetchTasks(); // Refresh the task list
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`);
      toast.success('Task deleted');
      fetchTasks(); // Refresh after deletion
    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error('Failed to delete task');
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <ToastContainer position="top-right" autoClose={3000} />
      <h1 className="text-2xl font-bold text-center mb-6">Your Tasks</h1>
      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks found.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="p-4 bg-gray-800 text-white rounded-xl border border-amber-400 shadow-md"
            >
              <h2 className={`text-xl font-semibold ${task.status === 'Completed' ? 'line-through text-gray-400' : ''}`}>
                {task.title}
              </h2>
              <p className={`mt-2 ${task.status === 'Completed' ? 'line-through text-gray-400' : ''}`}>
                {task.content}
              </p>
              <p className={`mt-1 text-sm font-medium ${task.status === 'Completed' ? 'text-green-400' : 'text-yellow-400'}`}>
                Status: {task.status}
              </p>

              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => handleToggleStatus(task)}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded text-white"
                >
                  Mark as {task.status === 'Completed' ? 'Pending' : 'Completed'}
                </button>

                <button
                  onClick={() => handleDeleteTask(task._id)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded text-white"
                >
                  Delete Task
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShowTaskPage;



// 'use client';
// import React, { useEffect, useState, useContext } from 'react';
// import axios from 'axios';
// import UserContext from '@/context/userContext';
// import { toast, ToastContainer } from 'react-toastify';

// const ShowTaskPage = () => {
//   const { user } = useContext(UserContext);
//   const currentUser = user?.user;

//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchTasks = async () => {
//     try {
//       if (!currentUser?._id) return;

//       const res = await axios.get(`/api/users/${currentUser._id}/tasks`);
//       setTasks(res.data.tasks || []);
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//       toast.error('Failed to load tasks');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (currentUser?._id) {
//       fetchTasks();
//     }
//   }, [currentUser]);

//   return (
//     <div className="max-w-3xl mx-auto mt-10 p-4">
//       <ToastContainer position="top-right" autoClose={3000} />
//       <h1 className="text-2xl font-bold text-center mb-6">Your Tasks</h1>
//       {loading ? (
//         <p className="text-center text-gray-400">Loading...</p>
//       ) : tasks.length === 0 ? (
//         <p className="text-center text-gray-500">No tasks found.</p>
//       ) : (
//         <ul className="space-y-4">
//           {tasks.map((task) => (
//             <li
//               key={task._id}
//               className="p-4 bg-gray-800 text-white rounded-xl border border-amber-400 shadow-md"
//             >
//               <h2 className="text-xl font-semibold">{task.title}</h2>
//               <p className="mt-2">{task.content}</p>
//               <p className={`mt-1 text-sm font-medium ${task.status === 'Completed' ? 'text-green-400' : 'text-yellow-400'}`}>
//                 Status: {task.status}
//               </p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default ShowTaskPage;
