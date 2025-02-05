import {TimePeriod} from "../types.ts";
import axios from "axios";

export const getSoldCarsReportAsync = async (timePeriod: TimePeriod): Promise<Blob>  => {
    const response = await axios.get(`http://localhost:5181/api/Reports/soldCars/${timePeriod}`, {
        responseType: 'blob'
    });
    return response.data;
}

export const getPopularCarsReportAsync = async (timePeriod: TimePeriod): Promise<Blob>  => {
    const response = await axios.get(`http://localhost:5181/api/Reports/popularCars/${timePeriod}`, {
        responseType: 'blob'
    });
    return response.data;
}