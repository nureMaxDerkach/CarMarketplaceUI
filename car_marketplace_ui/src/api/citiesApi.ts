import {ICity} from "../types.ts";
import axios from "axios";

export const getCitiesAsync = async (): Promise<ICity[]>  => {
    const response = await axios.get('http://localhost:5181/api/Cities');
    return response.data;
}