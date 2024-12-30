import React, {useEffect, useState} from 'react';
import {IUser} from '../../types.ts';
import Table from "../../components/Table/Table.tsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const UsersTable: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<IUser[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:5181/api/Users');
                setData(response.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };

        fetchData();
    }, [])

    const onDetailsClick = (row: IUser) => {
        navigate(`/users/details/${row.id}`)
    }

    const onEditClick = (row: IUser) => {
        navigate(`/users/edit/${row.id}`)
    }

    const onDeleteClick = async (row: IUser) => {
       await axios.delete(`http://localhost:5181/api/Users/${row.id}`);

       window.location.reload();
    }

    const handleRedirect = () => {
        navigate('/users/create');
    };

    if (loading) return <div>Loading...</div>;

    return (
        <>
            <Table
                tableName='Users'
                data={data}
                columns={[
                    {keyPath: 'firstName', label: 'First Name'},
                    {keyPath: 'lastName', label: 'Last Name'},
                    {keyPath: 'email', label: 'Email'},
                    {keyPath: 'phoneNumber', label: 'Phone Number'},
                    {keyPath: 'country', label: 'Country'},
                    {keyPath: 'region', label: 'Region'},
                    {keyPath: 'city', label: 'City'},
                ]}
                hasActions={true}
                onDetailsClick={onDetailsClick}
                onEditClick={onEditClick}
                onDeleteClick={onDeleteClick}
            />
            <div style={{display: 'flex', justifyContent: 'center'}}>
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
                    Create User
                </button>
            </div>
        </>
    );
};

export default UsersTable;
