import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

interface ICreateUserRequest {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    country: string;
    region: string;
    city: string;
}

const CreateUser: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const [user, setUser] = useState<ICreateUserRequest>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        country: '',
        region: '',
        city: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post("http://localhost:5181/api/Users", user, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            navigate('/users');
        } catch (err: any) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div style={{ maxWidth: "600px", margin: "auto" }}>
            <h2 style={{ backgroundColor: "green", color: "white", padding: "10px", textAlign: "center" }}>Create User</h2>
            <form onSubmit={handleSubmit}>
                <h3>User Information</h3>
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={user.firstName}
                        onChange={handleInputChange}
                        placeholder="First Name"
                        required
                        style={{width: "100%", marginBottom: "10px", padding: "8px"}}
                    />
                </div>
                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleInputChange}
                        placeholder="Last Name"
                        required
                        style={{width: "100%", marginBottom: "10px", padding: "8px"}}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        required
                        style={{width: "100%", marginBottom: "10px", padding: "8px"}}
                    />
                </div>
                <div>
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={user.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="Phone Number"
                        required
                        style={{width: "100%", marginBottom: "10px", padding: "8px"}}
                    />
                </div>
                <div>
                    <label htmlFor="country">Country</label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        value={user.country}
                        onChange={handleInputChange}
                        placeholder="Country"
                        required
                        style={{width: "100%", marginBottom: "10px", padding: "8px"}}
                    />
                </div>
                <div>
                    <label htmlFor="region">Region</label>
                    <input
                        type="text"
                        id="region"
                        name="region"
                        value={user.region}
                        onChange={handleInputChange}
                        placeholder="Region"
                        required
                        style={{width: "100%", marginBottom: "10px", padding: "8px"}}
                    />
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={user.city}
                        onChange={handleInputChange}
                        placeholder="City"
                        required
                        style={{width: "100%", marginBottom: "10px", padding: "8px"}}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        backgroundColor: "green",
                        color: "white",
                        padding: "10px",
                        border: "none",
                        cursor: "pointer",
                        width: "100%",
                    }}
                >
                    Save
                </button>
            </form>
        </div>
    );
};

export default CreateUser;
