import axios from "axios";
import { urlBase } from "../defaultValues";
import { ReservationInterface } from "../interfaces/reservationInterface";




export const reservationService = (body: ReservationInterface) =>
    axios.post(`${urlBase}/reservations`, body, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
        }
    });