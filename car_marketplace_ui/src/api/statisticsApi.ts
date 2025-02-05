import axios from "axios";
import {IStatistic} from "../types.ts";

export const getStatisticAsync = async (): Promise<IStatistic>  => {
    const response = await axios.get(`http://localhost:5181/api/Statistics`);
    return response.data;
}