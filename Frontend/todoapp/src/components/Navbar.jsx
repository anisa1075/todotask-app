import { Notepad } from '@phosphor-icons/react';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [userName, setUserName] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Fungsi untuk sinkronisasi user dari localStorage
  const syncUser = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUserName(parsed.name || parsed);
      } catch {
        setUserName(storedUser);
      }
    } else {
      setUserName(null);
    }
  };

  useEffect(() => {
    syncUser(); // Saat pertama render

    // Dengarkan event "userChanged" setiap kali login/logout terjadi
    window.addEventListener("userChanged", syncUser);

    return () => {
      window.removeEventListener("userChanged", syncUser);
    };
  }, []);

  // Menutup dropdown ketika klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.dispatchEvent(new Event("userChanged")); // trigger navbar update
    setDropdownOpen(false);
    navigate('/login');
  };

  return (
    <nav style={{ backgroundColor: "rgba(247, 237, 225)" }} className="shadow-lg z-20 absolute w-full top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <Notepad size={32} style={{ color: "#815830" }} />
            <span className="text-[#815830] font-bold text-2xl">TodoTask.</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {userName ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="text-[#815830] focus:outline-none font-bold text-xl"
                  >
                    Hai, {userName}
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2 z-50">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-[#815830] hover:bg-[#f5f0eb]"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login">
                  <button className="bg-gradient-to-r from-[#815830] to-[#a67c52] hover:from-[#6b4726] hover:to-[#926c45] text-white px-6 py-2 rounded-full font-medium transition duration-300 shadow-md">
                    GetStarted
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
