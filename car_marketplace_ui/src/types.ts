export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    country: string;
    region: string;
    city: string;
}

export interface ICarDetails {
    id: number;
    brand: string;
    model: string;
    yearOrProduction: number;
    color: string;
    mileage: number;
    description: string;
    cost: number;
    number: string;
    saleNoticeId: number;
}

export interface ICar {
    id: number;
    brand: string;
    model: string;
    yearOrProduction: number;
    color: string;
    cost: number;
}

export interface ISaleNotice {
    id: number;
    dateOfCreation: string;
    dateOfSale: string | null;
    userId: number;
    car: ICar;
}

export interface ICreateSaleNoticeRequest {
    userId: number;
    car: ICreateCarRequest
}

export interface ICreateCarRequest {
    brand: string;
    model: string;
    yearOrProduction: number;
    color: string;
    mileage: number;
    description: string;
    cost: number;
}