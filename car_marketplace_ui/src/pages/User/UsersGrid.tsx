import React, {useEffect, useMemo, useRef, useState} from 'react';
import {AgGridReact} from 'ag-grid-react';
import {IUser} from '../../types.ts';
import {useNavigate} from 'react-router-dom';
import {ColDef, GridReadyEvent, ICellRendererParams} from "ag-grid-community";
import {View} from "../../appConstants.ts";
import {deleteUserAsync, getUsersAsync} from "../../api/usersApi.ts";


const UsersGrid: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<IUser[]>([]);
    const navigate = useNavigate();
    const gridRef = useRef<AgGridReact>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const users = await getUsersAsync();
                setData(users);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const onDetailsClick = (id: number) => {
        navigate(`/users/details/${id}`);
    };

    const onEditClick = (id: number) => {
        navigate(`/users/edit/${id}`);
    };

    const onDeleteClick = async (id: number) => {
        try {
            await deleteUserAsync(id);
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };

    const handleRedirect = () => {
        navigate(View.CreateUser);
    };

    const columns: ColDef<IUser>[] = useMemo(() => [
        {
            field: 'firstName',
            headerName: 'First Name',
            sortable: true,
            filter: true
        },
        {
            field: 'lastName',
            headerName: 'Last Name',
            sortable: true,
            filter: true
        },
        {
            field: 'email',
            headerName: 'Email',
            sortable: true,
            filter: true
        },
        {
            field: 'phoneNumber',
            headerName: 'Phone Number',
            sortable: true,
            filter: true
        },
        {
            field: 'country',
            headerName: 'Country',
            sortable: true,
            filter: true
        },
        {
            field: 'region',
            headerName: 'Region',
            sortable: true,
            filter: true
        },
        {
            field: 'city',
            headerName: 'City',
            sortable: true,
            filter: true
        },
        {
            headerName: 'Actions',
            cellRenderer: (params: ICellRendererParams<IUser>) => {
                if (!params.data) return null;

                return (
                    <div style={{display: 'flex', gap: '10px', paddingTop: '10px'}}>
                        <button onClick={() => onDetailsClick(params.data!.id)}>Details</button>
                        <button onClick={() => onEditClick(params.data!.id)}>Edit</button>
                        <button onClick={() => onDeleteClick(params.data!.id)} style={{color: 'red'}}>Delete</button>
                    </div>
                );
            }
        }
    ], []);

    const onGridReady = (params: GridReadyEvent<IUser>) => {
        params.api.sizeColumnsToFit();
    };


    if (loading) return <div>Loading...</div>;

    return (
        <div style={{width: '100%', height: '600px', marginTop: '20px', display: 'flex', justifyContent: 'center'}} className="ag-theme-alpine">
            <div style={{ maxWidth: '90%', width: '100%' }}>
                <AgGridReact
                    ref={gridRef}
                    rowData={data}
                    columnDefs={columns}
                    rowModelType='clientSide'
                    domLayout='autoHeight'
                    onGridReady={onGridReady}
                />
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                    <button
                        onClick={handleRedirect}
                        style={{
                            backgroundColor: 'green',
                            color: 'white',
                            padding: '10px 20px',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        Create User
                    </button>
                </div>
            </div>

        </div>
    );
};

export default UsersGrid;

