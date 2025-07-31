import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-[#815830] text-white py-6 z-10 relative">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center mb-4 md:mb-0">
                        <i className="fas fa-tasks text-brown-300 text-2xl mr-2"></i>
                        <span className="text-xl font-semibold text-brown-50">TodoTask</span>
                    </div>
                    <div className="text-brown-200 text-sm">
                        &copy; 2023 TodoTask. All rights reserved.
                    </div>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <a href="#" className="text-brown-300 hover:text-brown-50 transition duration-300">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" className="text-brown-300 hover:text-brown-50 transition duration-300">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" className="text-brown-300 hover:text-brown-50 transition duration-300">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer