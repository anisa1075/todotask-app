import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/api/register',
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            );

            // ✅ Simpan token dan user
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.data.user));

            // ✅ Trigger event supaya Navbar update
            window.dispatchEvent(new Event("userChanged"));

            console.log(response.data); // debug
            navigate('/'); // pindah ke halaman home
        } catch (err) {
            // penanganan error
        }
    };

    return (
        <div className='flex flex-col items-center justify-center h-full'>
            <div className="bg-white z-10 mt-24 mb-10 rounded-2xl overflow-hidden w-full max-w-md shadow-[0_10px_30px_rgba(139,69,19,0.2)]">
                <div className="bg-[#815830] py-6 px-8 text-center">
                    <h1 className="text-2xl font-bold text-white">Create Account</h1>
                    <p className="text-white mt-2">Please register your account</p>
                </div>

                <div className="p-8">
                    {error && (
                        <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-amber-900 mb-1">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-amber-900"
                                placeholder="John"
                            />

                            <label htmlFor="email" className="block text-sm font-medium text-amber-900 mt-4">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="fas fa-envelope text-amber-700"></i>
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="pl-10 w-full px-4 py-2 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-amber-900"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-amber-900">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="fas fa-lock text-amber-700"></i>
                                </div>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="pl-10 w-full px-4 py-2 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-amber-900"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password_confirmation" className="block text-sm font-medium text-amber-900 mb-1">Confirm Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="fas fa-lock text-amber-700"></i>
                                </div>
                                <input
                                    type="password"
                                    id="confirm_password"
                                    name="confirm_password"
                                    value={formData.confirm_password}
                                    onChange={handleChange}
                                    required
                                    className="pl-10 w-full px-4 py-2 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 text-amber-900"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#815830] hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-300"
                        >
                            Register
                        </button>

                        <div className="flex items-center text-center text-sm text-amber-800 before:content-[''] before:flex-1 before:border-b before:border-amber-800 before:mr-4 after:content-[''] after:flex-1 after:border-b after:border-amber-800 after:ml-4">
                            OR
                        </div>
                    </form>

                    <div className="mt-6 text-center text-sm">
                        <p className="text-amber-800">
                            Already have an account?
                            <Link to="/login" className="font-medium text-amber-700 hover:text-amber-600 ml-1">Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
