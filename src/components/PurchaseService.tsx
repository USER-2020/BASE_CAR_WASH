import React, { useEffect, useState } from 'react'
import { getAllservices } from '../services/servicesService';
import Service from './Service';
import Navbar from './Navbar';

const PurchaseService = () => {

    const [services, setServices] = useState([]);

    useEffect(() => {
        getAllservices().then((res) => {
            console.log("Servcios", res.data);
            setServices(res.data.data);
        }).catch((err) => console.log(err));
    }, []);

    const servicesData = [
        {
            id: 1,
            title: 'Lavado Básico',
            description: 'Incluye limpieza exterior e interior básica.',
            price: '$15',
        },
        {
            id: 2,
            title: 'Lavado Completo',
            description: 'Limpieza completa del vehículo, tanto interior como exterior.',
            price: '$25',
        },
        {
            id: 3,
            title: 'Lavado y Detallado',
            description: 'Incluye lavado completo y detallado del interior del vehículo.',
            price: '$50',
        },
    ];

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-900 text-white p-8">
                {/* Encabezado de la página */}
                <header className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Our Car Wash Services</h1>
                    <p className="text-lg text-gray-300">
                        At our company, we offer high-quality car wash services designed to keep your vehicle looking flawless.
                        From basic washes to full detailing, we have a service to meet every need.
                    </p>
                </header>


                {/* Lista de Servicios */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <Service key={index} service={service} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default PurchaseService
