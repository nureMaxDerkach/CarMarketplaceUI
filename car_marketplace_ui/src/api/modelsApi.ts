import {IModel} from "../types.ts";
import axios from "axios";

export const getModelsAsync = async (): Promise<IModel[]>  => {
    const response = await axios.get('http://localhost:5181/api/Models');
    return response.data;
}