import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ReservationFullInterface } from '../interfaces/reservationFull';
import EditReservationModal from './modals/EditReservationModal';
import { ReservationUpdateInterface } from '../interfaces/reservationInterface';
import { urlBase } from '../defaultValues';

const YourReservations = () => {
    // Estado para almacenar las reservas
    const [reservations, setReservations] = useState<ReservationFullInterface[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal
    const [selectedReservation, setSelectedReservation] = useState<ReservationFullInterface | null>(null); // Reserva seleccionada

    // Función para eliminar una reserva
    const handleDelete = (id: number) => {
        axios.delete(
            `${urlBase}/reservations/${id}`, // Usa el prefijo /api que será redirigido por el proxy de Vite
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // Token de autorización
                },
            }
        )
            .then((response) => {
                console.log(response.data);
                toast.success('Reservation deleted successfully.');

                // Actualizar la lista de reservas eliminando la reserva eliminada
                setReservations((prevReservations) =>
                    prevReservations.filter((reservation) => reservation.reservation.id !== id)
                );
            })
            .catch((error) => {
                if (error.response) {
                    toast.error(`Error: ${error.response.data.message || 'Error deleting reservation.'}`);
                    console.error('Server response error:', error.response.data);
                } else if (error.request) {
                    toast.error('No response from server.');
                    console.error('Request error:', error.request);
                } else {
                    toast.error('Error making request.');
                    console.error('Configuration error:', error.message);
                }
            });
    };


    // Función para modificar una reserva (puedes personalizar esto para abrir un modal o hacer algo más específico)
    const handleEdit = (reservation: ReservationFullInterface) => {
        setSelectedReservation(reservation);
        setIsModalOpen(true);
    };

    const handleSave = (updatedReservation: ReservationFullInterface) => {
        // Convertir ReservationFullInterface a ReservationUpdateInterface
        const reservationUpdateData: ReservationUpdateInterface = {
            serviceId: updatedReservation.reservation.serviceId, // ID del servicio de la reserva actualizada
            reservationDate: updatedReservation.reservation.reservationDate, // Fecha de la reserva actualizada
            status: updatedReservation.reservation.status, // Estado de la reserva actualizada
        };

        // Hacer la llamada a la API para guardar los cambios
        axios.put(`${urlBase}/reservations/${updatedReservation.reservation.id}`, reservationUpdateData, {  // Utiliza el id de la reserva
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then(response => {
                toast.success('Reservation updated successfully!');
                setReservations((prev) =>
                    prev.map((res) =>
                        res.reservation.id === updatedReservation.reservation.id ? { ...res, reservation: { ...res.reservation, ...reservationUpdateData } } : res
                    )
                );
                setIsModalOpen(false); // Cerrar el modal después de guardar
            })
            .catch(error => {
                toast.error('Failed to update reservation.');
                console.error('Error:', error);
            });
    };


    // Función para obtener las reservas del usuario
    const listReservations = () => {
        const userId = localStorage.getItem('userId') ?? '';
        axios.get(
            `${urlBase}/reservations/user/${userId}`, // Usa el prefijo /api que será redirigido por el proxy de Vite
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // Token de autorización
                },
                // Enviar cookies y otras credenciales con la solicitud
            }
        )
            .then((response) => {
                console.log(response.data);
                setReservations(response.data.data); // Ajuste para definir las reservas directamente
            })
            .catch((error) => {
                if (error.response) {
                    toast.error(`Error: ${error.response.data.message || 'Error al obtener reservas.'}`);
                    console.error('Error de respuesta del servidor:', error.response.data);
                } else if (error.request) {
                    toast.error('No se recibió respuesta del servidor.');
                    console.error('Error de solicitud:', error.request);
                } else {
                    toast.error('Error al realizar la solicitud.');
                    console.error('Error de configuración:', error.message);
                }
            });
    }

    useEffect(() => {
        listReservations();
    }, [])

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-900 text-white p-8">
                <header className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-4">Your Reservations</h1>
                    <p className="text-lg text-gray-300">
                        Here you can see all your reservations and manage them as you prefer.
                    </p>
                </header>

                {/* Reservations List */}
                <div className="space-y-6">
                    {reservations.length > 0 ? (
                        reservations.map((reservation, index) => (
                            <div key={index} className="bg-gray-800 rounded-lg p-6 shadow-md flex justify-between items-center">
                                <div>
                                    <h3 className="text-2xl font-bold">{reservation.service.name}</h3> {/* Use reservation.service.name */}
                                    <p className="text-gray-300">Date: {reservation.reservation.reservationDate}</p>
                                    <p className="text-gray-300">Description: {reservation.service.description}</p> {/* Use reservation.service.description */}
                                    <p className="text-gray-300">Price: ${reservation.service.price}</p> {/* Display the price */}
                                </div>
                                <div className="flex space-x-4">
                                    {/* Edit Button */}
                                    <button
                                        onClick={() => handleEdit(reservation)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        Edit
                                    </button>

                                    {/* Delete Button */}
                                    <button
                                        onClick={() => handleDelete(reservation.reservation.id)}
                                        className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-300 text-center">You have no reservations.</p>
                    )}
                </div>
            </div>
            {/* Modal para editar la reserva */}
            {selectedReservation && (
                <EditReservationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    reservation={selectedReservation}
                    onSave={handleSave}
                />
            )}

        </>
    );
};

export default YourReservations;
