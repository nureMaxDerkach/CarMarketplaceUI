import React, {useEffect, useState} from 'react';
import Table from '../../components/Table/Table.tsx';
import {ISaleNotice} from '../../types.ts';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const SaleNoticesTable: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<ISaleNotice[]>([]);
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/create-sale-notice');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:5181/api/SaleNotices');
                setData(response.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };

        fetchData();
    }, [])

    const onDetailsClick = (row: ISaleNotice) => {
        navigate(`/sale-notices/details/${row.id}`)
    }

    const onEditClick = (row: ISaleNotice) => {
        navigate(`/sale-notices/edit/${row.id}`)
    }

    const onDeleteClick = async (row: ISaleNotice) => {
        await axios.delete(`http://localhost:5181/api/SaleNotices/${row.id}/${row.userId}`,);

        window.location.reload();
    }

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <Table
                tableName="Sale Notices"
                data={data}
                columns={[
                    {keyPath: 'dateOfCreation', label: 'Created On'},
                    {keyPath: 'car.brand', label: 'Brand'},
                    {keyPath: 'car.model', label: 'Model'},
                    {keyPath: 'car.yearOfProduction', label: 'Year'},
                    {keyPath: 'car.color', label: 'Color'},
                    {keyPath: 'car.cost', label: 'Cost, $'},
                ]}
                hasActions={true}
                onDetailsClick={onDetailsClick}
                onEditClick={onEditClick}
                onDeleteClick={onDeleteClick}
            />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                    onClick={handleRedirect}
                    style={{
                        marginTop: '20px',
                        backgroundColor: 'green',
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                >
                    Create Sale Notice
                </button>
            </div>
        </div>
    );
};

export default SaleNoticesTable;
