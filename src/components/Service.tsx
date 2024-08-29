import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { ReservationInterface, ReservationInterfacePost } from '../interfaces/reservationInterface';
import axios from 'axios';
import { urlBase } from '../defaultValues';
import ReservationModal from './modals/ReservationModal';

const Service = ({ service }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);

    const userId = localStorage.getItem('userId') ?? '';
    const token = localStorage.getItem('token') ?? '';

    // Función para abrir el modal de reserva
    const openReservationModal = (idService: number) => {
        setSelectedServiceId(idService);
        setIsModalOpen(true);
    };

    // Función para cerrar el modal
    const closeReservationModal = () => {
        setIsModalOpen(false);
        setSelectedServiceId(null);
    };

    // Función para manejar la reserva
    const handleReserve = (idService: number, reservationDate: string) => {
        if (!userId) {
            toast.error('Usuario no autenticado. Por favor, inicia sesión.');
            return;
        }

        if (!token) {
            toast.error('Token no encontrado. Por favor, inicia sesión de nuevo.');
            return;
        }

        // Crear el objeto de datos de la reserva
        let reservation: ReservationInterfacePost = {
            userId: parseInt(userId, 10),
            serviceId: idService,
            reservationDate: reservationDate,
            status: "PENDING",
        };

        console.log('Reservation Data:', reservation);

        const toastId = toast.loading('Procesando reserva...');

        // Realizar la solicitud POST utilizando Axios con el proxy de Vite
        axios.post(
            'https://apiun.controlsoftwarepro.com/reservations', // Usa el prefijo /api que será redirigido por el proxy de Vite
            reservation,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Token de autorización
                },
                withCredentials: true, // Enviar cookies y otras credenciales con la solicitud
            }
        )
            .then((response) => {
                toast.dismiss(toastId); // Eliminar el toast de carga
                toast.success('Reservado con éxito!');
                console.log(response.data); // Para depuración
                closeReservationModal(); // Cerrar el modal al reservar exitosamente
            })
            .catch((error) => {
                toast.dismiss(toastId); // Eliminar el toast de carga
                if (error.response) {
                    toast.error(`Error: ${error.response.data.message || 'Error al reservar.'}`);
                    console.error('Error de respuesta del servidor:', error.response.data);
                } else if (error.request) {
                    toast.error('No se recibió respuesta del servidor.');
                    console.error('Error de solicitud:', error.request);
                } else {
                    toast.error('Error al realizar la solicitud.');
                    console.error('Error de configuración:', error.message);
                }
            });
    };

    return (
        <div className="bg-gray-800 rounded-lg p-6 shadow-md">
            <h3 className="text-2xl font-bold mb-2">{service.name}</h3>
            <p className="text-gray-300 mb-4">{service.description}</p>
            <p className="text-lg font-semibold text-blue-500 mb-4">${service.price}</p>
            <button
                onClick={() => openReservationModal(service.id)}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Reservar
            </button>

            {/* Modal de Reservación */}
            {selectedServiceId !== null && (
                <ReservationModal
                    isOpen={isModalOpen}
                    onClose={closeReservationModal}
                    onReserve={(reservationDate) => handleReserve(selectedServiceId, reservationDate)}
                    serviceId={selectedServiceId} // Pasar el ID de servicio como number
                />
            )}
        </div>
    );
};

export default Service;
