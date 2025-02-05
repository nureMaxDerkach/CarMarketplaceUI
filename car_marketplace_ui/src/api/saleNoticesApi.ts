import axios from "axios";
import {ICreateSaleNoticeRequest, ISaleNotice, IUpdateSaleNoticeRequest, IUpdateUserRequest} from "../types.ts";

export const getSaleNoticesAsync = async () : Promise<ISaleNotice[]> => {
    const response = await axios.get('http://localhost:5181/api/SaleNotices');
    return response.data;
}

export const getSaleNoticeByIdAsync = async (id: number): Promise<any> => {
    const response =  await axios.get(`http://localhost:5181/api/SaleNotices/${id}`);
    return response.data;
}

export const createSaleNoticeAsync = async (saleNotice: ICreateSaleNoticeRequest): Promise<void> => {
    await axios.post("http://localhost:5181/api/SaleNotices", saleNotice, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export const updateSaleNoticeAsync = async (saleNotice: IUpdateSaleNoticeRequest): Promise<void> => {
    await axios.put("http://localhost:5181/api/SaleNotices", saleNotice, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export const deleteSaleNoticeAsync = async (id: number): Promise<boolean> => {
    const response = await axios.delete(`http://localhost:5181/api/SaleNotices/${id}`);
    return response.data;
}