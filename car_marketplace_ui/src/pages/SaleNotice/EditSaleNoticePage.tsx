import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {View} from "../../appConstants.ts";
import {getSaleNoticeByIdAsync, updateSaleNoticeAsync} from "../../api/saleNoticesApi.ts";
import {IBrand, IModel, IUpdateSaleNoticeRequest} from "../../types.ts";
import {getBrandsAsync} from "../../api/brandsApi.ts";
import {getModelsAsync} from "../../api/modelsApi.ts";

const EditSaleNoticePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState<boolean>(false);
    const [brands, setBrands] = useState<IBrand[]>([]);
    const [models, setModels] = useState<IModel[]>([]);
    const navigate = useNavigate();
    const [saleNotice, setSaleNotice] = useState<IUpdateSaleNoticeRequest>({
        noticeId: 0,
        userId: 0,
        brandId: 0,
        brand: "",
        modelId: 0,
        model: "",
        yearOfProduction: 0,
        color: "",
        mileage: 0,
        description: "",
        cost: 0,
        number: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [saleNoticeDetailsData, brandsData, modelsData] = await Promise.all([
                    getSaleNoticeByIdAsync(Number(id)),
                    getBrandsAsync(),
                    getModelsAsync()
                ]);
                setSaleNotice({
                    noticeId: saleNoticeDetailsData.id,
                    userId: saleNoticeDetailsData.user.id,
                    brandId: saleNoticeDetailsData.car.brandId,
                    brand: saleNoticeDetailsData.car.brand,
                    modelId: saleNoticeDetailsData.car.modelId,
                    model: saleNoticeDetailsData.car.model,
                    yearOfProduction: saleNoticeDetailsData.car.yearOfProduction,
                    color: saleNoticeDetailsData.car.color,
                    mileage: saleNoticeDetailsData.car.mileage,
                    description: saleNoticeDetailsData.car.description,
                    cost: saleNoticeDetailsData.car.cost,
                    number: saleNoticeDetailsData.car.number
                });
                setBrands(brandsData);
                setModels(modelsData);
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        fetchData();
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setSaleNotice((prev) => ({
            ...prev,
            [name]: name === "yearOfProduction" || name === "mileage" || name === "cost"
                ? /^[0-9]*$/.test(value) ? Number(value) : prev[name as keyof IUpdateSaleNoticeRequest]
                : value,
        }));
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await updateSaleNoticeAsync(saleNotice);
            navigate(View.SaleNotices);
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
        fieldName: keyof IUpdateSaleNoticeRequest,
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
            <h2 style={{ backgroundColor: "orange", color: "white", padding: "10px", textAlign: "center", width: "500px" }}>Update Sale Notice</h2>
            <form onSubmit={handleSubmit}>
                <h3>Car Information</h3>
                {renderSelectField("Brand", "brandId", saleNotice.brandId, brands, (e) =>
                    handleSelectChange<IUpdateSaleNoticeRequest>(e, setSaleNotice, 'brandId')
                )}
                {renderSelectField("Model", "modelId", saleNotice.modelId, models, (e) =>
                    handleSelectChange<IUpdateSaleNoticeRequest>(e, setSaleNotice, 'modelId')
                )}
                <div>
                    <label htmlFor="yearfrProduction">Year of Production</label>
                    <input
                        type="text"
                        id="yearoOfProduction"
                        name="yearOfProduction"
                        value={saleNotice.yearOfProduction}
                        onChange={handleInputChange}
                        placeholder="Year of Production"
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
                <div>
                    <label htmlFor="color">Color</label>
                    <input
                        type="text"
                        id="color"
                        name="color"
                        value={saleNotice.color}
                        onChange={handleInputChange}
                        placeholder="Car Color"
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
                <div>
                    <label htmlFor="mileage">Mileage</label>
                    <input
                        type="text"
                        id="mileage"
                        name="mileage"
                        value={saleNotice.mileage}
                        onChange={handleInputChange}
                        placeholder="Mileage"
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
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={saleNotice.description}
                        onChange={handleInputChange}
                        placeholder="Car Description"
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
                <div>
                    <label htmlFor="cost">Cost, $</label>
                    <input
                        type="text"
                        id="cost"
                        name="cost"
                        value={saleNotice.cost}
                        onChange={handleInputChange}
                        placeholder="Cost"
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
                <div>
                    <label htmlFor="number">Number</label>
                    <input
                        type="text"
                        id="number"
                        name="number"
                        value={saleNotice.number}
                        onChange={handleInputChange}
                        placeholder="Number"
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
                <button
                    type="submit"
                    style={{
                        backgroundColor: "orange",
                        color: "white",
                        padding: "10px",
                        border: "none",
                        cursor: "pointer",
                        width: "100%",
                        borderRadius: "4px",
                        maxWidth: "522px",
                    }}
                >
                    Save
                </button>
            </form>
        </div>
    );
};

export default EditSaleNoticePage;
