import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { registroService } from '../services/userService';
import { useAuth } from '../AuthContext';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Datos del usuario
        const userData = {
            username,
            email,
            password
        };

        registroService(userData)
            .then((response) => {
                const { token, data: userData } = response.data; // Obtener el token y los datos del usuario
                console.log(token);

                login(response.data); // Llamar a la función de login del contexto para guardar el token y el rol

                if (userData.role === 'ROLE_ADMIN') {
                    // Redirigir al dashboard si el usuario es admin
                    window.location.href = '/dashboard';
                } else if (userData.role === 'ROLE_USER') {
                    // Redirigir al home si el usuario es un usuario normal
                    window.location.href = '/Home';
                } else {
                    // Redirigir a una página de error o hacer algo más si el rol no coincide
                    window.location.href = '/';
                }

                console.log('Usuario autenticado y registrado');
            })
            .catch((err) => {
                console.log(err);
                // Mostrar un mensaje de error si la autenticación falla
                alert('Register failed. Please check your credentials.');
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-white text-center mb-6">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="mt-1 w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Register
                        </button>
                    </div>
                </form>
                <p className="mt-6 text-center text-gray-400">
                    Already have an account?{' '}
                    <a href="/" className="text-blue-500 hover:underline">
                        Log in
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;
