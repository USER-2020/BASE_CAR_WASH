import axios from "axios";
import { urlBase } from "../defaultValues";

export const getAllservices = () =>
    axios.get(`${urlBase}/api/services`);