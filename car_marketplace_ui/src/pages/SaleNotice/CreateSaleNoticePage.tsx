import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

interface ICreateSaleNoticeRequest {
    userId: number;
    car: ICreateCarRequest;
}

interface ICreateCarRequest {
    brand: string;
    model: string;
    yearOrProduction: number;
    color: string;
    mileage: number;
    description: string;
    cost: number;
    number: string;
}

const CreateSaleNotice: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const [saleNotice, setSaleNotice] = useState<ICreateSaleNoticeRequest>({
        userId: 0,
        car: {
            brand: "",
            model: "",
            yearOrProduction: 0,
            color: "",
            mileage: 0,
            description: "",
            cost: 0,
            number: ""
        },
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setSaleNotice((prev) => ({
            ...prev,
            car: {
                ...prev.car,
                [name]: name === "yearOrProduction" || name === "mileage" || name === "cost"
                    ? /^[0-9]*$/.test(value) ? Number(value) : prev.car[name as keyof ICreateCarRequest]
                    : value,
            },
        }));
    };

    const handleUserIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSaleNotice((prev) => ({
            ...prev,
            userId: /^[0-9]*$/.test(value) ? Number(value) : prev.userId,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post("http://localhost:5181/api/SaleNotices", saleNotice, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            navigate('/sale-notices');
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
            <h2 style={{ backgroundColor: "green", color: "white", padding: "10px", textAlign: "center" }}>Create Sale Notice</h2>
            <form onSubmit={handleSubmit}>
                <h3>Sale Information</h3>
                <div>
                    <label htmlFor="userId">User ID</label>
                    <input
                        type="text"
                        id="userId"
                        name="userId"
                        value={saleNotice.userId}
                        onChange={handleUserIdChange}
                        placeholder="User ID"
                        required
                        style={{width: "100%", marginBottom: "10px", padding: "8px"}}
                    />
                </div>

                <h3>Car Information</h3>
                <div>
                    <label htmlFor="brand">Brand</label>
                    <input
                        type="text"
                        id="brand"
                        name="brand"
                        value={saleNotice.car.brand}
                        onChange={handleInputChange}
                        placeholder="Car Brand"
                        required
                        style={{width: "100%", marginBottom: "10px", padding: "8px"}}
                    />
                </div>
                <div>
                    <label htmlFor="model">Model</label>
                    <input
                        type="text"
                        id="model"
                        name="model"
                        value={saleNotice.car.model}
                        onChange={handleInputChange}
                        placeholder="Car Model"
                        required
                        style={{width: "100%", marginBottom: "10px", padding: "8px"}}
                    />
                </div>
                <div>
                    <label htmlFor="yearOrProduction">Year of Production</label>
                    <input
                        type="text"
                        id="yearOrProduction"
                        name="yearOrProduction"
                        value={saleNotice.car.yearOrProduction}
                        onChange={handleInputChange}
                        placeholder="Year of Production"
                        required
                        style={{width: "100%", marginBottom: "10px", padding: "8px"}}
                    />
                </div>
                <div>
                    <label htmlFor="color">Color</label>
                    <input
                        type="text"
                        id="color"
                        name="color"
                        value={saleNotice.car.color}
                        onChange={handleInputChange}
                        placeholder="Car Color"
                        required
                        style={{width: "100%", marginBottom: "10px", padding: "8px"}}
                    />
                </div>
                <div>
                    <label htmlFor="mileage">Mileage</label>
                    <input
                        type="text"
                        id="mileage"
                        name="mileage"
                        value={saleNotice.car.mileage}
                        onChange={handleInputChange}
                        placeholder="Mileage"
                        required
                        style={{width: "100%", marginBottom: "10px", padding: "8px"}}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={saleNotice.car.description}
                        onChange={handleInputChange}
                        placeholder="Car Description"
                        required
                        style={{width: "100%", marginBottom: "10px", padding: "8px"}}
                    />
                </div>
                <div>
                    <label htmlFor="cost">Cost, $</label>
                    <input
                        type="text"
                        id="cost"
                        name="cost"
                        value={saleNotice.car.cost}
                        onChange={handleInputChange}
                        placeholder="Cost"
                        required
                        style={{width: "100%", marginBottom: "10px", padding: "8px"}}
                    />
                </div>
                <div>
                    <label htmlFor="number">Number</label>
                    <input
                        type="text"
                        id="number"
                        name="number"
                        value={saleNotice.car.number}
                        onChange={handleInputChange}
                        placeholder="Number"
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

export default CreateSaleNotice;
