import React from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate(); // Hook para manejar la navegación

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <Navbar />
            {/* Hero Section */}
            <header className="bg-gray-800 py-12 px-6 md:px-12">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Premium Car Wash</h1>
                    <p className="text-lg md:text-2xl text-gray-300 mb-8">
                        We offer high-quality car washing and detailing services to keep your vehicle looking brand new.
                    </p>
                    <a href="#services" className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-full text-lg font-semibold transition duration-300">
                        View Services
                    </a>

                </div>
            </header>

            {/* Services */}
            <section id="services" className="py-16 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Services</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Service 1 */}
                        <div className="bg-gray-800 rounded-lg p-8 shadow-md">
                            <h3 className="text-2xl font-bold mb-4">Exterior Wash</h3>
                            <p className="text-gray-300 mb-6">
                                Complete exterior cleaning of the vehicle using high-quality products to ensure a shiny finish.
                            </p>
                            <button
                                onClick={() => navigate('/Services-items')}
                                className="text-blue-500 hover:text-blue-700 font-semibold"
                            >
                                More Information
                            </button>
                        </div>
                        {/* Service 2 */}
                        <div className="bg-gray-800 rounded-lg p-8 shadow-md">
                            <h3 className="text-2xl font-bold mb-4">Interior Wash</h3>
                            <p className="text-gray-300 mb-6">
                                Deep cleaning of the interior, including carpets, upholstery, and surfaces for a fresh and clean environment.
                            </p>
                            <button
                                onClick={() => navigate('/Services-items')}
                                className="text-blue-500 hover:text-blue-700 font-semibold"
                            >
                                More Information
                            </button>
                        </div>
                        {/* Service 3 */}
                        <div className="bg-gray-800 rounded-lg p-8 shadow-md">
                            <h3 className="text-2xl font-bold mb-4">Full Detailing</h3>
                            <p className="text-gray-300 mb-6">
                                Our full detailing service covers every corner of the vehicle, leaving it spotless inside and out.
                            </p>
                            <button
                                onClick={() => navigate('/Services-items')}
                                className="text-blue-500 hover:text-blue-700 font-semibold"
                            >
                                More Information
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="bg-gray-800 py-16 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Testimonials</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Testimonial 1 */}
                        <div className="bg-gray-700 rounded-lg p-8 shadow-md">
                            <p className="text-gray-300 mb-4">
                                "Excellent service, my car looks like new. Highly recommended for those seeking quality and professionalism."
                            </p>
                            <h4 className="text-xl font-bold text-blue-500">- John Perez</h4>
                        </div>
                        {/* Testimonial 2 */}
                        <div className="bg-gray-700 rounded-lg p-8 shadow-md">
                            <p className="text-gray-300 mb-4">
                                "The full detailing is definitely worth it. First-class customer service and impressive results."
                            </p>
                            <h4 className="text-xl font-bold text-blue-500">- Ana Gomez</h4>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 py-8">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-gray-400">&copy; 2024 Premium Car Wash. All rights reserved.</p>
                    <div className="mt-4">
                        <button onClick={() => navigate('/#')} className="text-gray-400 hover:text-white mx-2">Facebook</button>
                        <button onClick={() => navigate('/#')} className="text-gray-400 hover:text-white mx-2">Instagram</button>
                        <button onClick={() => navigate('/#')} className="text-gray-400 hover:text-white mx-2">Twitter</button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
