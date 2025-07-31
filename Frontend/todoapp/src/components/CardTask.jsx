import React, { useState, useEffect } from "react";
import { Trash, Pencil } from "@phosphor-icons/react";

const CardTask = ({ tasks, toggleCheck }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [editedJudul, setEditedJudul] = useState("");
  const [userId, setUserId] = useState(null);
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUserId(Number(userData.id));
      } catch (err) {
        console.error("Gagal parsing user dari localStorage:", err);
      }
    }
  }, []);

  useEffect(() => {
    if (userId && tasks && Array.isArray(tasks)) {
      const result = tasks.filter(task => Number(task.user_id) === userId);
      setFilteredTasks(result);
    }
  }, [userId, tasks]);

  const handleDelete = async (taskId) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus task ini?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // Update state lokal tanpa refresh
        setFilteredTasks(prev => prev.filter(task => task.id !== taskId));
      } else {
        console.error("Gagal menghapus task.");
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat menghapus task:", error);
    }
  };

  const openEditModal = (task) => {
    setCurrentTask(task);
    setEditedJudul(task.judul);
    setShowModal(true);
  };

  const handleUpdate = async () => {
    if (!editedJudul.trim()) return;

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/tasks/${currentTask.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ judul: editedJudul }),
      });

      if (res.ok) {
        setFilteredTasks(prev =>
          prev.map(task =>
            task.id === currentTask.id ? { ...task, judul: editedJudul } : task
          )
        );
        setShowModal(false);
        setCurrentTask(null);
      } else {
        const data = await res.json();
        console.error("Gagal update:", data);
      }
    } catch (err) {
      console.error("Gagal update task:", err);
    }
  };

  

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 w-full" id="tasks-container">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className="bg-[#f3eeee] rounded-lg shadow-md p-4 border-l-4 border-amber-900 w-full flex justify-between"
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleCheck(task.id)}
                className="w-8 h-8 flex items-center justify-center rounded-full text-[#b1acac] transition-all duration-300 bg-gray-300"
              >
                {task.is_completed ? "✅" : ""}
              </button>
              <h2
                className={`text-lg font-semibold text-[#815830] ${task.is_completed ? "line-through" : ""}`}
              >
                {task.judul}
              </h2>
            </div>

            <div className="flex items-center">
              <button onClick={() => handleDelete(task.id)}>
                <Trash size={20} weight="fill" />
              </button>
              <button onClick={() => openEditModal(task)}>
                <Pencil size={20} weight="fill" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL EDIT TASK */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Edit Task</h2>
            <input
              type="text"
              value={editedJudul}
              onChange={(e) => setEditedJudul(e.target.value)}
              className="w-full border border-gray-300 p-2 mb-4 rounded"
              placeholder="Edit judul task..."
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Batal
              </button>
              <button
                onClick={handleUpdate}
                className="bg-amber-900 text-white px-4 py-2 rounded"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CardTask;
