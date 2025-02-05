import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getUserByIdAsync} from "../../api/usersApi.ts";
import {IUserDetails} from "../../types.ts";

const UserDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [userDetails, setUserDetails] = useState<IUserDetails | null>(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const user = await getUserByIdAsync(Number(id));
                setUserDetails(user);
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
        <div className="user-details">
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
