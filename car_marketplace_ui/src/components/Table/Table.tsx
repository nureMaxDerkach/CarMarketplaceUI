import './Table.css';

interface TableProps<T> {
    tableName: string
    data: T[];
    columns: { keyPath: string; label: string }[];
    hasActions: boolean;
    onDetailsClick?: (row: T) => void;
    onEditClick?: (row: T) => void;
    onDeleteClick?: (row: T) => void;
}

const Table = <T,>({ tableName, data, columns, onDetailsClick, onEditClick, onDeleteClick, hasActions = false}: TableProps<T>): JSX.Element => {
    const getNestedValue = (obj: any, path: string) => {
        const keys = path.split('.');
        let value = obj;
        for (let key of keys) {
            if (value && key in value) {
                value = value[key];
            } else {
                return '';
            }
        }
        return value;
    };

    const handleViewClick = (row: T) => {
        if (onDetailsClick) {
            onDetailsClick(row);
        }
    };

    const handleEditClick = (row: T) => {
        if (onEditClick) {
            onEditClick(row);
        }
    };

    const handleDeleteClick = (row: T) => {
        if (onDeleteClick) {
            onDeleteClick(row);
        }
    };

    return (
        <div className="table-container">
            <div>
                <h2 className="page-heading">{tableName}</h2>
                <table className="data-table">
                    <thead>
                    <tr>
                        {columns.map((col) => (
                            <th key={String(col.keyPath)}>{col.label}</th>

                        ))}
                        {hasActions && (
                            <th>Actions</th>
                        )}
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((row, idx) => (
                        <tr key={idx}>
                            {columns.map((col) => {
                                const value = getNestedValue(row, col.keyPath as string);
                                const displayValue = value === null || value === undefined ? '' : String(value);

                                return <td key={String(col.keyPath)}>{displayValue}</td>;
                            })}
                            {hasActions && (
                                <td style={{ display: 'flex', gap: '8px' }}>
                                    {onDetailsClick && (
                                        <button
                                            style={{
                                                backgroundColor: 'blue',
                                                color: 'white',
                                                padding: '10px 20px',
                                                border: 'none',
                                                cursor: 'pointer',
                                            }}
                                            className="details-button"
                                            onClick={() => handleViewClick(row)}
                                        >
                                            View Details
                                        </button>
                                    )}
                                    {onEditClick && (
                                        <button
                                            style={{
                                                backgroundColor: 'orange',
                                                color: 'white',
                                                padding: '10px 20px',
                                                border: 'none',
                                                cursor: 'pointer',
                                            }}
                                            className="details-button"
                                            onClick={() => handleEditClick(row)}
                                        >
                                            Edit
                                        </button>
                                    )}
                                    {onDeleteClick && (
                                        <button
                                            style={{
                                                backgroundColor: 'red',
                                                color: 'white',
                                                padding: '10px 20px',
                                                border: 'none',
                                                cursor: 'pointer',
                                            }}
                                            className="delete-button"
                                            onClick={() => handleDeleteClick(row)}
                                        >
                                            Delete
                                        </button>
                                    )}
                                </td>
                            )}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
