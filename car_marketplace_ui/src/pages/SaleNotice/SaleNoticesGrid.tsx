import React, {useEffect, useMemo, useRef, useState} from 'react';
import {ISaleNotice} from '../../types.ts';
import {useNavigate} from 'react-router-dom';
import {ColDef, GridReadyEvent, ICellRendererParams} from "ag-grid-community";
import {AgGridReact} from "ag-grid-react";
import {View} from "../../appConstants.ts";
import {formatDate} from "../../utils.ts";
import {deleteSaleNoticeAsync, getSaleNoticesAsync} from "../../api/saleNoticesApi.ts";

const SaleNoticesGrid: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<ISaleNotice[]>([]);
    const navigate = useNavigate();
    const gridRef = useRef<AgGridReact>(null);

    const handleRedirect = () => {
        navigate(View.CreateSaleNotice);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const saleNotices = await getSaleNoticesAsync();
                setData(saleNotices);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };

        fetchData();
    }, [])

    const onDetailsClick = (id: number) => {
        navigate(`/sale-notices/details/${id}`)
    }

    const onEditClick = (id: number) => {
        navigate(`/sale-notices/edit/${id}`)
    }

    const onDeleteClick = async (id: number) => {
        try {
            const isDeleted = await deleteSaleNoticeAsync(id);

            if (!isDeleted) {
                console.error('Failed to delete sale notice');
            } else {
                setData(prevData => prevData.filter(saleNotice => saleNotice.id !== id));
            }
        } catch (error) {
            console.error('Failed to delete sale notice:', error);
        }
    };

    const columns: ColDef<ISaleNotice>[] = useMemo(() => [
        {
            field: 'car.brand',
            headerName: 'Brand',
            sortable: true,
            filter: true
        },
        {
            field: 'car.model',
            headerName: 'Model',
            sortable: true,
            filter: true
        },
        {
            field: 'car.yearOfProduction',
            headerName: 'Year',
            sortable: true,
            filter: true
        },
        {
            field: 'car.color',
            headerName: 'Color',
            sortable: true,
            filter: true
        },
        {
            field: 'car.cost',
            headerName: 'Cost, $',
            sortable: true,
            filter: true
        },
        {
            field: 'dateOfCreation',
            headerName: 'Created On',
            sortable: true,
            filter: true,
            cellDataType: 'dateString',
            cellRenderer: (params: ICellRendererParams<ISaleNotice>) => {
                if (!params || !params.data) {
                    return null;
                }

                return formatDate(params.data.dateOfCreation);
            }
        },
        {
            headerName: 'Actions',
            cellRenderer: (params: ICellRendererParams<ISaleNotice>) => {
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

    const onGridReady = (params: GridReadyEvent<ISaleNotice>) => {
        params.api.sizeColumnsToFit();
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div style={{width: '100%', height: '600px', marginTop: '20px', display: 'flex', justifyContent: 'center'}}>
            <div style={{maxWidth: '80%', width: '100%'}}>
                <AgGridReact
                    ref={gridRef}
                    rowData={data}
                    columnDefs={columns}
                    rowModelType="clientSide"
                    domLayout="autoHeight"
                    onGridReady={onGridReady}
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
                        Create Sale Notice
                    </button>
                </div>
            </div>
        </div>
    );

};

export default SaleNoticesGrid;
