import React, { useEffect } from 'react';
import { FaUserCircle, FaCalendarAlt } from 'react-icons/fa'; // Import user and calendar icons
import { useAuth } from '../AuthContext'; // Import authentication context
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const Navbar = () => {
    const { logout, userRole } = useAuth(); // Access logout method and userRole from the context
    const navigate = useNavigate(); // Hook to handle navigation

    const handleLogout = () => {
        logout(); // Call the logout function from the context
        console.log('User has logged out');
        navigate('/'); // Redirect to the login page or homepage after logout
    };

    const handleReservation = () => {
        navigate('/yourReservations'); // Navigate to the reservations page
    };

    const handleHome = () => {
        navigate('/Home'); // Navigate to the home page
    };

    useEffect(() => {
        console.log(userRole);
    }, [userRole]);

    return (
        <nav className="bg-gray-800 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* User Icon */}
                <div className="flex items-center cursor-pointer" onClick={handleHome}>
                    <FaUserCircle className="text-white text-3xl mr-4" />
                    <span className="text-white text-lg font-semibold">Home</span>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center space-x-4">
                    {/* Reservations Button (Only for ROLE_USER) */}
                    {userRole === 'ROLE_USER' && (
                        <button
                            onClick={handleReservation}
                            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <FaCalendarAlt className="mr-2" />
                            Reservations
                        </button>
                    )}

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
