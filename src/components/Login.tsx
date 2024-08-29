import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginService } from '../services/userService';
import { useAuth } from '../AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
    const [usernameOrEmail, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, userRole, loading } = useAuth(); // Acceder al estado del rol y a la función de login
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate(); // Usar useNavigate para manejar redirecciones

    useEffect(() => {
        if (!loading && userRole) {  // Espera a que el estado de carga termine y haya un rol de usuario
            // Redirigir basado en el rol
            if (userRole === 'ROLE_ADMIN') {
                navigate('/dashboard');
            } else if (userRole === 'ROLE_USER') {
                navigate('/Home');
            } else {
                navigate('/');
            }
        }
    }, [userRole, loading, navigate]); // Escuchar cambios en userRole y loading

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const data = {
            usernameOrEmail,
            password
        };

        const toastId = toast.loading('Logging in...');

        loginService(data)
            .then((response) => {
                const { token, data: userData } = response.data;
                console.log(token);
                login(response.data); // Llamar a la función de login del contexto
                toast.dismiss(toastId);
                console.log('User authenticated', userData.role);
            })
            .catch((err) => {
                console.log(err);
                toast.dismiss(toastId);
                toast.error('Login failed. Please check your credentials.');
                setIsSubmitting(false); // Permitir reintentos en caso de error
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-white text-center mb-6">Log In</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={usernameOrEmail}
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
                            disabled={isSubmitting}
                        >
                            Log In
                        </button>
                    </div>
                </form>
                <p className="mt-6 text-center text-gray-400">
                    Don't have an account?{' '}
                    <a href="/Register" className="text-blue-500 hover:underline">
                        Sign Up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
