import React from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ReservationFullInterface } from '../../interfaces/reservationFull';

interface ReservationTableProps {
    reservations: ReservationFullInterface[];
    onEdit: (reservation: ReservationFullInterface) => void;
    onDelete: (id: number) => void;
    onUpdate: () => void; // Nueva prop para actualizar la lista de reservas después de cambiar el estado
}

const ReservationTable: React.FC<ReservationTableProps> = ({ reservations, onEdit, onDelete, onUpdate }) => {

    // Función para actualizar el estado de la reserva
    const handleUpdateStatus = (id: number) => {
        console.log("Este es el id de la reservacion", id);
        axios.post(`https://apiun.controlsoftwarepro.com/reservations/${id}/pay`, {}, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },

        })
            .then(() => {
                toast.success('Estado de la reserva actualizado correctamente.');
                onUpdate(); // Llama a la función onUpdate para actualizar la lista de reservas
            })
            .catch(error => {
                if (error.response) {
                    toast.error(`Error: ${error.response.data.message || 'Error al actualizar estado.'}`);
                } else if (error.request) {
                    toast.error('No se recibió respuesta del servidor.');
                } else {
                    toast.error('Error al realizar la solicitud.');
                }
            });
    };

    return (
        <table className="min-w-full bg-gray-800 text-white">
            <thead>
                <tr>
                    <th className="w-1/4 px-4 py-2 border-b-2 border-gray-600">Service</th>
                    <th className="w-1/4 px-4 py-2 border-b-2 border-gray-600">Date</th>
                    <th className="w-1/4 px-4 py-2 border-b-2 border-gray-600">Status</th>
                    <th className="w-1/4 px-4 py-2 border-b-2 border-gray-600">Actions</th>
                </tr>
            </thead>
            <tbody>
                {reservations.map((reservation) => (
                    <tr key={reservation.reservation.id} className="border-b border-gray-600">
                        <td className="px-4 py-2">{reservation.service.name}</td>
                        <td className="px-4 py-2">{reservation.reservation.reservationDate}</td>
                        <td className="px-4 py-2">{reservation.reservation.status}</td>
                        <td className="px-4 py-2 space-x-2">
                            <button
                                onClick={() => onEdit(reservation)}
                                className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded mr-2"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => onDelete(reservation.reservation.id)}
                                className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded mr-2"
                            >
                                Delete
                            </button>
                            {/* Botón para actualizar estado */}
                            <button
                                onClick={() => handleUpdateStatus(reservation.reservation.id)} // Aquí puedes cambiar el estado a "APPROVED" u otro estado
                                className="bg-green-600 hover:bg-green-700 text-white py-1 px-3 rounded"
                            >
                                Approve
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ReservationTable;
