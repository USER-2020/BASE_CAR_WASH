import { ReservationFullInterface } from "./reservationFull";

export interface ReservationInterface {
    id: number;
    userId: number;
    serviceId: number;
    reservationDate: string;
    status: string;
}
export interface ReservationInterfacePost {
    userId: number;
    serviceId: number;
    reservationDate: string;
    status: string;
}

export interface EditReservationModalProps {
    isOpen: boolean;
    onClose: () => void;
    reservation: ReservationFullInterface;
    onSave: (updatedReservation: ReservationFullInterface) => void;
}

export interface ReservationUpdateInterface {
    serviceId: number; // ID del servicio asociado a la reserva
    reservationDate: string; // Fecha de la reserva en formato ISO 8601 (ej: "2025-09-15T17:00:00")
    status: string // Estado de la reserva (puedes ajustar los valores según tu lógica de negocio)
}

export interface ReservationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onReserve: (reservationDate: string) => void;
    serviceId: number; // Tipo actualizado a 'number'
}