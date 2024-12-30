import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";

interface ISaleNoticeDetails {
    id: number;
    dateOfCreation: string;
    isActive: boolean;
    user: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
    };
    car: {
        brand: string;
        model: string;
        yearOfProduction: number;
        color: string;
        cost: number;
    };
}

const SaleNoticeDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const [saleNotice, setSaleNotice] = useState<ISaleNoticeDetails | null>(null);

    useEffect(() => {
        const fetchSaleNotice = async () => {
            try {
                const response = await axios.get(`http://localhost:5181/api/SaleNotices/${id}`);

                console.log(response);

                setSaleNotice(response.data);
            } catch (error) {
                console.error("Error fetching sale notice details", error);
            }
        };

        fetchSaleNotice();
    }, [id]);

    if (!saleNotice) {
        return <div>Loading...</div>;
    }

    return (
        <div className="sale-notice-details">
            <h2>Sale Notice Details</h2>
            <table className="details-table">
                <tbody>
                <tr>
                    <td>Created On</td>
                    <td>{saleNotice.dateOfCreation}</td>
                </tr>
                <tr>
                    <td>Brand</td>
                    <td>{saleNotice.car.brand}</td>
                </tr>
                <tr>
                    <td>Model</td>
                    <td>{saleNotice.car.model}</td>
                </tr>
                <tr>
                    <td>Year Of Production</td>
                    <td>{saleNotice.car.yearOfProduction}</td>
                </tr>
                <tr>
                    <td>Color</td>
                    <td>{saleNotice.car.color}</td>
                </tr>
                <tr>
                    <td>Cost, $</td>
                    <td>{saleNotice.car.cost}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default SaleNoticeDetailsPage;
