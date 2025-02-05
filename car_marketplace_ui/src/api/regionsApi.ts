import {IRegion} from "../types.ts";
import axios from "axios";

export const getRegionsAsync = async (): Promise<IRegion[]>  => {
    const response = await axios.get('http://localhost:5181/api/Regions');
    return response.data;
}