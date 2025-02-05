import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {View} from "../../appConstants.ts";
import {getUserByIdAsync, updateUserAsync} from "../../api/usersApi.ts";
import {ICity, ICountry, IRegion, IUpdateUserRequest} from "../../types.ts";
import {getCountriesAsync} from "../../api/countriesApi.ts";
import {getRegionsAsync} from "../../api/regionsApi.ts";
import {getCitiesAsync} from "../../api/citiesApi.ts";

const CreateUser: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState<boolean>(false);
    const [countries, setCountries] = useState<ICountry[]>([]);
    const [regions, setRegions] = useState<IRegion[]>([]);
    const [cities, setCities] = useState<ICity[]>([]);
    const navigate = useNavigate();
    const [user, setUser] = useState<IUpdateUserRequest>({
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        countryId: 0,
        country: '',
        regionId: 0,
        region: '',
        cityId: 0,
        city: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const user = await getUserByIdAsync(Number(id));
                setUser(user);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };

        fetchData();
    }, [id])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [countriesData, regionsData, citiesData] = await Promise.all([
                    getCountriesAsync(),
                    getRegionsAsync(),
                    getCitiesAsync()
                ]);
                setCountries(countriesData);
                setRegions(regionsData);
                setCities(citiesData);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        fetchData();
    }, []);

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
            await updateUserAsync(user);

            navigate(View.Users);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectChange = <T extends object>(
        e: React.ChangeEvent<HTMLSelectElement>,
        setState: React.Dispatch<React.SetStateAction<T>>,
        fieldName: keyof T
    ) => {
        const { value } = e.target;
        setState((prev) => ({
            ...prev,
            [fieldName]: value,
        }));
    };

    const renderSelectField = (
        label: string,
        fieldName: keyof IUpdateUserRequest,
        value: number,
        options: { id: number; name: string }[],
        onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    ) => (
        <div style={{ marginBottom: "15px" }}>
            <label htmlFor={fieldName} style={{ display: "block", marginBottom: "5px" }}>
                {label}
            </label>
            <select
                id={fieldName}
                name={fieldName}
                value={value}
                onChange={onChange}
                required
                style={{
                    width: "100%",
                    maxWidth: "522px",
                    padding: "10px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    marginBottom: "10px",
                }}
            >
                <option value="">Select {label}</option>
                {options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
        </div>
    );

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div style={{ maxWidth: "550px", margin: "auto" }}>
            <h2 style={{ backgroundColor: "orange", color: "white", padding: "10px", textAlign: "center", width: '100%' }}>Edit User</h2>
            <form onSubmit={handleSubmit}>
                <h3>User Information</h3>
                <div style={{marginBottom: "15px"}}>
                    <label htmlFor="firstName" style={{display: "block", marginBottom: "5px"}}>
                        First Name
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={user.firstName}
                        onChange={handleInputChange}
                        placeholder="First Name"
                        required
                        style={{
                            width: "100%",
                            maxWidth: "500px",
                            padding: "10px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                            marginBottom: "10px",
                        }}
                    />
                </div>

                <div style={{marginBottom: "15px"}}>
                    <label htmlFor="lastName" style={{display: "block", marginBottom: "5px"}}>
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={user.lastName}
                        onChange={handleInputChange}
                        placeholder="Last Name"
                        required
                        style={{
                            width: "100%",
                            maxWidth: "500px",
                            padding: "10px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                            marginBottom: "10px",
                        }}
                    />
                </div>

                <div style={{marginBottom: "15px"}}>
                    <label htmlFor="email" style={{display: "block", marginBottom: "5px"}}>
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        required
                        style={{
                            width: "100%",
                            maxWidth: "500px",
                            padding: "10px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                            marginBottom: "10px",
                        }}
                    />
                </div>

                <div style={{marginBottom: "15px"}}>
                    <label htmlFor="phoneNumber" style={{display: "block", marginBottom: "5px"}}>
                        Phone Number
                    </label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={user.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="Phone Number"
                        required
                        style={{
                            width: "100%",
                            maxWidth: "500px",
                            padding: "10px",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                            marginBottom: "10px",
                        }}
                    />
                </div>

                {renderSelectField("Country", "countryId", user.countryId, countries, (e) =>
                    handleSelectChange<IUpdateUserRequest>(e, setUser, 'countryId')
                )}
                {renderSelectField("Region", "regionId", user.regionId, regions, (e) =>
                    handleSelectChange<IUpdateUserRequest>(e, setUser, 'regionId')
                )}
                {renderSelectField("City", "cityId", user.cityId, cities, (e) =>
                    handleSelectChange<IUpdateUserRequest>(e, setUser, 'cityId')
                )}

                <button
                    type="submit"
                    style={{
                        backgroundColor: "orange",
                        color: "white",
                        padding: "10px",
                        border: "none",
                        cursor: "pointer",
                        width: "522px"
                    }}
                >
                    Save
                </button>
            </form>
        </div>
    );
};

export default CreateUser;
