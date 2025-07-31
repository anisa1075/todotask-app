import React, { useState, useEffect } from 'react';

const AddTaskForm = ({ onTaskAdded }) => {
    const [judul, setJudul] = useState('');
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        try {
            const userData = JSON.parse(localStorage.getItem('user'));
            if (userData?.id) {
                setUserId(userData.id);
            } else {
                console.warn("User ID tidak ditemukan di localStorage.");
            }
        } catch (error) {
            console.error("Gagal mengambil user dari localStorage:", error);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!judul.trim()) return;
        if (!userId) {
            alert("User belum login atau user_id tidak ditemukan.");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('http://127.0.0.1:8000/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    judul: judul,
                    is_completed: 0,
                    user_id: userId,
                }),
            });

            const result = await res.json();

            if (!res.ok) {
                throw new Error(result.message || 'Gagal menambahkan task');
            }

            setJudul('');
            setSuccessMessage(`Task "${result.data.judul}" berhasil ditambahkan! ✅`);
            if (onTaskAdded) onTaskAdded(result.data);

            // Tampilkan pesan sukses sebentar, lalu refresh halaman
            setTimeout(() => {
                setSuccessMessage('');
                window.location.reload(); // ⬅️ REFRESH halaman
            }, 1200);

        } catch (error) {
            console.error("Error saat menambahkan task:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#815830] rounded-lg shadow-md p-6 mb-8 border-l-4 border-amber-900 w-2/3 justify-center">
            {successMessage && (
                <div className="mb-4 text-green-300 font-semibold">
                    {successMessage}
                </div>
            )}
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleSubmit}>
                <input type="hidden" name="user_id" value={userId || ''} />
                <input
                    type="text"
                    name="judul"
                    value={judul}
                    onChange={(e) => setJudul(e.target.value)}
                    placeholder="Add a new task..."
                    className="flex-grow px-4 text-white py-2 rounded-lg border-2 border-[#c9b49d] focus:outline-none text-brown-900 placeholder-white"
                    required
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-white text-[#815830] rounded-lg transition duration-300 flex items-center justify-center gap-2"
                >
                    <i className="fas fa-plus"></i> {loading ? 'Adding...' : 'Add Task'}
                </button>
            </form>
        </div>
    );
};

export default AddTaskForm;
