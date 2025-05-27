'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Taskadd from '../../assets/Taskadd.svg';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTask = () => {

  const [task, setTask] = useState({
    title: "",
    content: "",
    status:"None"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!task.title.trim() || !task.content.trim() || task.status === "None") {
      toast.error("Please fill in all the fields before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post("api/tasks", {
        title: task.title,
        content: task.content,
        status: task.status
      });

      if (response.status === 200) {
        toast.success("Task added successfully!");
        setTask({
          title: "",
          content: "",
          status:"None"
        });
      } else {
        toast.error("Failed to add task.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = () => {
    setTask({
      title: "",
      content: "",
      status:"None"
    });
    toast.info("Form cleared.");
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className='grid grid-cols-12 justify-center items-center'>
        <div className='col-span-6 col-start-4 shadow-lg shadow-amber-500 p-5'>
          <div>
            <Image src={Taskadd} alt="task add" className='w-[50%] h-2/4 mx-auto' />
          </div>
          <div className='text-center text-2xl font-bold text-amber-600'>
            <h1>Add your task here</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className='mt-5'>
              <label htmlFor="task_title" className='block text-sm font-medium mb-2'>Title</label>
              <input
                type="text"
                name='task_title'
                onChange={(e) => setTask({ ...task, title: e.target.value })}
                value={task.title}
                className='w-full p-2.5 rounded-full bg-gray-800 focus:ring-amber-600 border border-amber-600 shadow shadow-amber-500'
              />

              <label htmlFor="task_content" className='block text-sm font-medium mb-2'>Content</label>
              <textarea
                name="task_content"
                onChange={(e) => setTask({ ...task, content: e.target.value })}
                value={task.content}
                id="task_content"
                cols="30"
                rows="5"
                className='w-full p-2.5 rounded-2xl bg-gray-800 focus:ring-amber-600 border border-amber-600 shadow shadow-amber-500'
              ></textarea>

              <label htmlFor="task_status" className='block text-sm font-medium mb-2'>Status</label>
              <select
                name="task_status"
                onChange={(e) => setTask({ ...task, status: e.target.value })}
                value={task.status}
                id="task_status"
                className='w-full p-2.5 rounded-2xl bg-gray-800 focus:ring-amber-600 border border-amber-600 shadow shadow-amber-500'
              >
                <option value="None" disabled>---select status---</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className='flex justify-center space-x-4 mt-5'>
              <button
                className={`bg-cyan-400 text-black py-2 px-3 rounded-2xl hover:bg-cyan-800 hover:text-amber-50 active:scale-95 transition-transform duration-100 ${isSubmitting && 'opacity-50 cursor-not-allowed'}`}
                type='submit'
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Adding...' : 'Add Task'}
              </button>
              <button
                type="button"
                onClick={handleClear}
                className={`bg-red-400 text-black py-2 px-3 rounded-2xl hover:bg-red-600 hover:text-amber-50 active:scale-95 transition-transform duration-100 ${isSubmitting && 'opacity-50 cursor-not-allowed'}`}
                disabled={isSubmitting}
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTask;
