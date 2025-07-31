import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('http://127.0.0.1:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (data.success) {
                // Simpan token dan user
                localStorage.setItem('token', data.data.token);
                localStorage.setItem('user', JSON.stringify(data.data.user));

                // Trigger event agar Navbar langsung update
                window.dispatchEvent(new Event('userChanged'));

                // Arahkan ke halaman utama
                navigate('/');
            } else {
                setErrorMsg(data.message || 'Login gagal.');
            }

        } 
        catch (error) {
            setErrorMsg('Terjadi kesalahan saat login.');
        }
    };

    return (
        <div className='flex flex-col items-center justify-center h-full'>
            <div className="bg-white z-10 mt-24 mb-10 rounded-2xl overflow-hidden w-full max-w-md shadow-[0_10px_30px_rgba(139,69,19,0.2)]">
                <div className="bg-[#815830] py-6 px-8 text-center">
                    <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
                    <p className="text-white mt-2">Please login to your account</p>
                </div>

                <div className="p-8">
                    <form id="loginForm" onSubmit={handleSubmit} className="space-y-6">
                        {errorMsg && (
                            <div className="text-red-600 text-sm mb-2 text-center">{errorMsg}</div>
                        )}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-amber-900 mb-1">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="fas fa-envelope text-amber-700"></i>
                                </div>
                                <input type="email" id="email" name="email" required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 w-full px-4 py-2 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-700 text-amber-900 transition-colors"
                                    placeholder="your@email.com" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-amber-900 mb-1">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="fas fa-lock text-amber-700"></i>
                                </div>
                                <input type="password" id="password" name="password" required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 w-full px-4 py-2 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-amber-900"
                                    placeholder="••••••••" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox"
                                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-amber-300 rounded" />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-amber-800">Remember me</label>
                            </div>
                            <div className="text-sm">
                                <a href="#" className="font-medium text-amber-700 hover:text-amber-600">Forgot password?</a>
                            </div>
                        </div>

                        <button type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-red hover:bg-amber-700 hover:text-white focus:outline-none  transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0">
                            Login
                        </button>

                        <div className="flex items-center text-center text-sm text-amber-800 before:content-[''] before:flex-1 before:border-b before:border-amber-800 before:mr-4 after:content-[''] after:flex-1 after:border-b after:border-amber-800 after:ml-4">
                            OR
                        </div>
                    </form>

                    <div className="mt-6 text-center text-sm">
                        <p className="text-amber-800">Don't have an account?
                            <Link to="/register" className="font-medium text-amber-700 hover:text-amber-600"> Register</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
