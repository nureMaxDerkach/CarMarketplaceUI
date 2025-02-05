import {IBrand} from "../types.ts";
import axios from "axios";

export const getBrandsAsync = async (): Promise<IBrand[]>  => {
    const response = await axios.get('http://localhost:5181/api/Brands');
    return response.data;
}