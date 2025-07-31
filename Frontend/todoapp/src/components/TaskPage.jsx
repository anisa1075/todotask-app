import React, { useEffect, useState } from 'react';
import AddTaskForm from './AddTaskForm';
import CardTask from './CardTask';

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/tasks');
      const data = await res.json();
      const sorted = data.data.sort((a, b) => b.id - a.id);
      setTasks(sorted);
    } catch (err) {
      console.error('Error fetch tasks:', err);
    }
  };

  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [newTask, ...prevTasks]); // tambahkan di awal
  };

  return (
    <div>
      <AddTaskForm onTaskAdded={handleAddTask} />
      <CardTask tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default TaskPage;
