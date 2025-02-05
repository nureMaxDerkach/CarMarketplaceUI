import {ICountry} from "../types.ts";
import axios from "axios";

export const getCountriesAsync = async (): Promise<ICountry[]>  => {
    const response = await axios.get('http://localhost:5181/api/Countries');
    return response.data;
}