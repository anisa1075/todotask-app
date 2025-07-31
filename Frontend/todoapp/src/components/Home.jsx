import React, { useEffect, useState } from 'react';
import { Sparkle, FilePlus } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); // true jika token ada
    }, []);

    return (
        <div className='h-screen'>
            <div className='flex flex-col items-center justify-center h-full w-full'>
                <div style={{ backgroundColor: "rgba(247, 237, 225, 0.6)", width: "50%" }} className='z-10 text-center px-8 py-10 rounded-2xl text-white'>
                    <h2 style={{ fontFamily: "Bad Script" }} className=' text-4xl font-bold'>Welcome to TodoTask.</h2>
                    <h4 className=' pt-4 text-2xl font-bold'>Atur Tugas, Capai Tujuan</h4>
                    <p className='text-lg'>TodoTask membantumu mengelola daftar tugas harian dengan mudah dan efisien. Fokus pada hal penting tanpa kehilangan arah.</p>

                    {isLoggedIn ? (
                        <Link to="/addtask" className="mx-auto no-underline text-white">
                            <button
                                style={{ backgroundColor: "#815830" }}
                                className='mt-4 mx-auto flex gap-2 items-center text-center font-bold text-lg hover:bg-[#6b4726] transition-all duration-300 ease-in-out transform-3d hover:scale-105 shadow-md hover:shadow-lg'>
                                Add Task <FilePlus size={28} />
                            </button>
                        </Link>
                    ) : (
                        <Link to="/login" className="mx-auto no-underline text-white">
                            <button
                                style={{ backgroundColor: "#815830" }}
                                className='mt-4 mx-auto flex gap-2 items-center text-center font-bold text-lg hover:bg-[#6b4726] transition-all duration-300 ease-in-out transform-3d hover:scale-105 shadow-md hover:shadow-lg'>
                                Get Started <Sparkle size={28} />
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
