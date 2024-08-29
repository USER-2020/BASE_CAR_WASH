import React, { useState } from 'react';
import { ReservationModalProps } from '../../interfaces/reservationInterface';



const ReservationModal: React.FC<ReservationModalProps> = ({ isOpen, onClose, onReserve, serviceId }) => {
    const [reservationDate, setReservationDate] = useState<string>('');

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReservationDate(e.target.value);
    };

    const handleReserveClick = () => {
        onReserve(reservationDate); // Llamada al método de reserva
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-2xl font-bold mb-4">Reserve Service </h2>
                <label className="block text-gray-300 mb-2">Select Date:</label>
                <input
                    type="datetime-local"
                    value={reservationDate}
                    onChange={handleDateChange}
                    className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleReserveClick}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Reserve
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReservationModal;
