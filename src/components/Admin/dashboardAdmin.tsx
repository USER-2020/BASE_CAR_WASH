import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import ReservationTable from './ReservationTable';
import { ReservationFullInterface } from '../../interfaces/reservationFull';
import Navbar from '../Navbar';
import EditReservationModal from '../modals/EditReservationModal';
import { ReservationUpdateInterface } from '../../interfaces/reservationInterface';



const AdminDashboard = () => {
    const [reservations, setReservations] = useState<ReservationFullInterface[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState<ReservationFullInterface | null>(null);

    // Función para listar todas las reservas
    const listAllReservations = () => {
        axios.get('/api/reservations', {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            withCredentials: true,
        })
            .then(response => {
                setReservations(response.data.data);
            })
            .catch(error => {
                if (error.response) {
                    toast.error(`Error: ${error.response.data.message || 'Error al obtener reservas.'}`);
                } else if (error.request) {
                    toast.error('No se recibió respuesta del servidor.');
                } else {
                    toast.error('Error al realizar la solicitud.');
                }
            });
    };

    useEffect(() => {
        listAllReservations();
    }, []);

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
        axios.put(`/api/reservations/${updatedReservation.reservation.id}`, reservationUpdateData, {  // Utiliza el id de la reserva
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
        listAllReservations(); // Actualiza la lista después de guardar
    };

    const handleDelete = (id: number) => {
        axios.delete(`/api/reservations/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            withCredentials: true,
        })
            .then(() => {
                toast.success('Reserva eliminada correctamente.');
                listAllReservations(); // Actualiza la lista después de eliminar
            })
            .catch(error => {
                if (error.response) {
                    toast.error(`Error: ${error.response.data.message || 'Error al eliminar reserva.'}`);
                } else if (error.request) {
                    toast.error('No se recibió respuesta del servidor.');
                } else {
                    toast.error('Error al realizar la solicitud.');
                }
            });
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-900 text-white p-8">
                <header className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-4">Admin Dashboard - Reservations</h1>
                    <p className="text-lg text-gray-300">Manage all reservations from here.</p>
                </header>


                {reservations && reservations.length > 0 ? ( // Verificar si hay reservas antes de mostrar el componente
                    <ReservationTable reservations={reservations} onEdit={handleEdit} onDelete={handleDelete} onUpdate={listAllReservations} />
                ) : (
                    <p className="text-center text-gray-300">No reservations available.</p>
                )}

                {/* Modal de Edición de Reserva */}
                {selectedReservation && (
                    <EditReservationModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        reservation={selectedReservation}
                        onSave={handleSave}
                    />
                )}
            </div>
        </>
    );
};

export default AdminDashboard;
