import React, { useState, useEffect } from "react";
import { Sparkle } from "@phosphor-icons/react";
import CardTask from "./CardTask";
import AddTaskForm from "./AddTaskForm";

const AddTask = () => {
    const [tasks, setTasks] = useState([]);
    const [checkedTaskIds, setCheckedTaskIds] = useState([]);
    const [currentQuote, setCurrentQuote] = useState({ q: "", a: "" });
    const [filter, setFilter] = useState("all"); // ✅ tambahkan filter

    // Fetch tasks dari Laravel API
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await fetch("http://127.0.0.1:8000/api/tasks");
                const json = await res.json();
                setTasks(json.data); // ✅ ambil hanya array-nya
            } catch (error) {
                console.error("Gagal fetch data tasks:", error);
            }
        };
        fetchTasks();
    }, []);

    // Toggle checkbox task
    const toggleCheck = async (taskId) => {
        const task = tasks.find((t) => t.id === taskId);
        if (!task) return;

        const updatedTask = {
            ...task,
            is_completed: task.is_completed ? 0 : 1, // toggle status
        };

        try {
            const res = await fetch(`http://127.0.0.1:8000/api/tasks/${taskId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedTask),
            });

            if (res.ok) {
                setTasks((prevTasks) =>
                    prevTasks.map((t) =>
                        t.id === taskId ? { ...t, is_completed: updatedTask.is_completed } : t
                    )
                );
            } else {
                console.error("Gagal update task status.");
            }
        } catch (err) {
            console.error("Error toggle task:", err);
        }
    };


    // Fetch quote pertama kali saat halaman load
    useEffect(() => {
        handleGenerate();
    }, []);

    // Fungsi ambil quote random via proxy (hindari CORS)
    const handleGenerate = () => {
        fetch("https://api.allorigins.win/raw?url=https://zenquotes.io/api/random")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Respon tidak OK dari server");
                }
                return res.json();
            })
            .then((data) => {
                console.log("Quote response:", data); // ✅ Debugging

                // ✅ Cek apakah data adalah array dan memiliki elemen
                if (Array.isArray(data) && data.length > 0 && data[0].q && data[0].a) {
                    setCurrentQuote({
                        q: data[0].q,
                        a: data[0].a
                    });
                } else {
                    console.warn("Struktur quote tidak valid:", data);
                    setCurrentQuote({
                        q: "Tetap semangat! Coba lagi nanti jika quote belum muncul.",
                        a: "Sistem"
                    });
                }
            })
            .catch((error) => {
                console.error("Gagal ambil quote random:", error);
                setCurrentQuote({
                    q: "Gagal mengambil motivasi. Periksa koneksi atau coba beberapa saat lagi.",
                    a: "System"
                });
            });
    };


    // ✅ Filter task berdasarkan status
    const filteredTasks = tasks.filter((task) => {
        const completed = task.is_completed == 1; // Gunakan `==` agar "1" juga bisa
        const active = task.is_completed == 0;

        if (filter === "completed") return completed;
        if (filter === "activity") return active;
        return true;
    });

    return (
        <div className="h-screen relative z-20">
            {/* Quotes / Motivation Section */}
            <div className="flex flex-col items-center justify-center h-full w-full">
                <div
                    style={{
                        backgroundColor: "rgba(247, 237, 225, 0.6)",
                        width: "50%",
                    }}
                    className="z-10 text-center px-8 py-10 rounded-2xl text-white"
                >
                    <h2 style={{ fontFamily: "Bad Script" }} className="text-4xl font-bold">
                        Daily Motivation
                    </h2>
                    <h4 className="pt-4 text-2xl font-bold">
                        {currentQuote.a || "Judul Motivasi"}
                    </h4>
                    <p className="text-lg">{currentQuote.q || "Deskripsi Motivasi..."}</p>

                    <button
                        onClick={handleGenerate}
                        style={{ backgroundColor: "#815830" }}
                        className="mt-4 mx-auto flex gap-2 items-center text-center font-bold text-lg hover:bg-[#6b4726] transition-all duration-300 ease-in-out transform-3d hover:scale-105 shadow-md hover:shadow-lg text-white px-4 py-2 rounded"
                    >
                        Generate Motivation <Sparkle size={28} />
                    </button>
                </div>
            </div>

            {/* Task Section */}
            <div
                className="flex flex-col items-center relative z-10 -mt-14 p-10 mb-11"
                style={{ backgroundColor: "#8d673d" }}
            >
                <h2 className="text-4xl font-bold text-[#f3eeee] text-center mb-8">
                    Add Your Task Here!
                </h2>

                {/* Form Tambah Task */}
                <AddTaskForm />

                {/* Filter Task */}
                <div className="flex space-x-6 mt-4">
                    <button
                        className={`px-10 py-2 rounded-xl transition ${filter === "all" ? "bg-white text-[#815830]" : "bg-gray-200 text-gray-700"
                            }`}
                        onClick={() => setFilter("all")}
                    >
                        All
                    </button>
                    <button
                        className={`px-10 py-2 rounded-xl transition ${filter === "activity" ? "bg-white text-[#815830]" : "bg-gray-200 text-gray-700"
                            }`}
                        onClick={() => setFilter("activity")}
                    >
                        Activity
                    </button>
                    <button
                        className={`px-10 py-2 rounded-xl transition ${filter === "completed" ? "bg-white text-[#815830]" : "bg-gray-200 text-gray-700"
                            }`}
                        onClick={() => setFilter("completed")}
                    >
                        Completed
                    </button>
                </div>

                {/* Card Task */}
                <CardTask
                    tasks={filteredTasks}
                    checkedTaskIds={checkedTaskIds}
                    toggleCheck={toggleCheck}
                />
            </div>
        </div>
    );
};

export default AddTask;
