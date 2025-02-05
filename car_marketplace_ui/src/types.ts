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

export interface ICreateUserRequest {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    countryId: number;
    country: string;
    regionId: number;
    region: string;
    cityId: number;
    city: string;
}

export interface IUpdateUserRequest {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    countryId: number;
    country: string;
    regionId: number;
    region: string;
    cityId: number;
    city: string;
}

export interface IUserDetails {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    countryId: number;
    country: string;
    regionId: number;
    region: string;
    cityId: number;
    city: string;
    saleNotices: ISaleNoticeDetails[];
}

export interface IUserLocationInfo {
    countryId: number;
    countryName: string;
    regionId: number;
    regionName: string;
    cityId: number
    cityName: string;
}

interface ISaleNoticeDetails {
    id: number;
    dateOfCreation: Date;
    dateOfSale: Date;
    status: string;
    car: ICarDetails
}

interface ICarDetails {
    id: number;
    brand: string;
    model: string;
    yearOrProduction: number;
    color: string;
    cost: number;
    mileage: number;
    description: string;
    number: number;
}

export interface ICar {
    id: number;
    brand: string;
    model: string;
    yearOfProduction: number;
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
    brandId: number;
    brand: string;
    modelId: number;
    model: string;
    yearOfProduction: number;
    color: string;
    mileage: number;
    description: string;
    cost: number;
    number: string;
}

export interface IUpdateSaleNoticeRequest {
    noticeId: number;
    userId: number;
    brandId: number;
    brand: string;
    modelId: number;
    model: string;
    yearOfProduction: number;
    color: string;
    mileage: number;
    description: string;
    cost: number;
    number: string;
}

export interface IBrand {
    id: number;
    name: string;
}

export interface IModel {
    id: number;
    name: string;
    brandId: number;
}

export interface ICountry {
    id: number;
    name: string;
}

export interface IRegion {
    id: number;
    name: string;
    countryId: number;
}

export interface ICity {
    id: number;
    name: string;
    regionId: number;
}

export interface IStatistic {
    activeSaleNoticesCount: number;
    soldCarsCount: number;
    activeUsersCount: number;
    popularBrand: number;
}

export enum TimePeriod {
    Today = "Today",
    Week = "Week",
    Month = "Month",
    Quarter = "Quarter",
    Year = "Year"
}

export enum ReportType {
    SoldCars,
    PopularCars
}