import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";

interface IUserDetails {
    id: number;
    firstName: string;
    lastName: boolean;
    email: string;
    phoneNumber: string;
    country: string;
    region: string;
    city: string;
    saleNotices: ISaleNoticeDetails[];
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

const UserDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [userDetails, setUserDetails] = useState<IUserDetails | null>(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5181/api/Users/${id}`);

                console.log(response);

                setUserDetails(response.data);
            } catch (error) {
                console.error("Error fetching sale notice details", error);
            }
        };

        fetchUserDetails();
    }, [id]);

    if (!userDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="sale-notice-details">
            <h2>User Details</h2>
            <table className="details-table">
                <tbody>
                <tr>
                    <td>First Name</td>
                    <td>{userDetails.firstName}</td>
                </tr>
                <tr>
                    <td>Last Name</td>
                    <td>{userDetails.lastName}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>{userDetails.email}</td>
                </tr>
                <tr>
                    <td>Phone Number</td>
                    <td>{userDetails.phoneNumber}</td>
                </tr>
                <tr>
                    <td>Country</td>
                    <td>{userDetails.country}</td>
                </tr>
                <tr>
                    <td>Region</td>
                    <td>{userDetails.region}</td>
                </tr>
                <tr>
                    <td>City</td>
                    <td>{userDetails.city}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default UserDetails;
