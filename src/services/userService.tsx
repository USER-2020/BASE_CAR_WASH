import axios from "axios";
import { urlBase } from "../defaultValues";
import { UserInterfaceLogin, UserInterfaceRegister } from "../interfaces/loginInterface";


export const loginService = (body: UserInterfaceLogin) =>
    axios.post(`${urlBase}/api/auth`, body);

export const registroService = (body: UserInterfaceRegister) =>
    axios.post(`${urlBase}/api/register`, body, {
        params: {
            role: 'ROLE_USER' // Usando params para enviar el rol
        }
    },);

