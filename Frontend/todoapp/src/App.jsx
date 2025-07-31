// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'; // ✅ BENAR
import Register from "./components/Register";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";


function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div style={{ backgroundImage: "url('/bg2.jpg')" }} className=" bg-cover bg-no-repeat w-full mt-10">
        <div className="fixed inset-0 bg-[rgba(129,88,48,0.6)] bg-opacity-50 z-0"></div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addtask" element={<AddTask />} />
        </Routes>

      </div>
      <Footer/>


    </div>
  )
}

export default App
