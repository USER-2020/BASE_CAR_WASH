import { ReservationInterface } from "./reservationInterface";

export interface ReservationFullInterface {
    reservation: ReservationInterface;
    service: ServiceInterface;  // Añadir el tipo Service aquí
}

interface ServiceInterface {
    id: number;
    name: string;
    description: string;
    duration: number;
    price: number;
    createdAt: string;
    updatedAt: string;
}