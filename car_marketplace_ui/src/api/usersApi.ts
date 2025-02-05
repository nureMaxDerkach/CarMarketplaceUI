import axios from "axios";
import {ICreateUserRequest, IUpdateUserRequest, IUser, IUserDetails} from "../types.ts";

export const getUsersAsync = async (): Promise<IUser[]>  => {
    const response = await axios.get('http://localhost:5181/api/Users');
    return response.data;
}

export const getUserByIdAsync = async (id: number): Promise<IUserDetails> => {
    const response = await axios.get(`http://localhost:5181/api/Users/${id}`);
    return response.data;
}

export const createUserAsync = async (user: ICreateUserRequest): Promise<void> => {
    await axios.post("http://localhost:5181/api/Users", user, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export const updateUserAsync = async (user: IUpdateUserRequest): Promise<void> => {
    await axios.put("http://localhost:5181/api/Users", user, {
        headers: {
            "Content-Type": "application/json",
        },
    });
}

export const deleteUserAsync = async (id: number): Promise<void> => {
    await axios.delete(`http://localhost:5181/api/Users/${id}`);
}


