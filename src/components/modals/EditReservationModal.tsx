import React, { useState } from 'react';
import { EditReservationModalProps } from '../../interfaces/reservationInterface';
import { ReservationFullInterface } from '../../interfaces/reservationFull';

const EditReservationModal: React.FC<EditReservationModalProps> = ({ isOpen, onClose, reservation, onSave }) => {
  const [reservationDate, setReservationDate] = useState(reservation.reservation.reservationDate);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReservationDate(e.target.value);
  };

  const handleSave = () => {
    const updatedReservation: ReservationFullInterface = {
      ...reservation,
      reservation: {
        ...reservation.reservation,
        reservationDate,
      },
    };

    onSave(updatedReservation);
    onClose(); // Cerrar el modal después de guardar
  };

  if (!isOpen) return null; // No renderizar nada si el modal no está abierto

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4">Edit Reservation</h2>
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
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditReservationModal;
