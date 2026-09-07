import React, {
    useEffect,
    useState
} from 'react';

import {
    useDispatch,
    useSelector
} from 'react-redux';

import VehicleForm from './VehicleForm';

import {
    deleteVehicle,
    fetchVehicles
} from '../../store/slices/vehicleSlice';

function VehicleList() {
    const dispatch = useDispatch();

    const {
        items,
        pagination,
        loading,
        error
    } = useSelector(
        (state) => state.vehicles
    );

    const user = useSelector(
        (state) => state.auth.user
    );

    const [showForm, setShowForm] =
        useState(false);

    const [selectedVehicle,
        setSelectedVehicle] =
        useState(null);

    const [notification,
        setNotification] =
        useState('');

    const role = user?.role;

    useEffect(() => {
        dispatch(
            fetchVehicles({
                page: 0,
                size: 10
            })
        );
    }, [dispatch, role]);

    const handleAdd = () => {
        setSelectedVehicle(null);
        setShowForm(true);
    };

    const handleEdit = (vehicle) => {
        setSelectedVehicle(vehicle);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        const confirmed =
            window.confirm(
                'Are you sure you want to delete this Vehicle?'
            );

        if (!confirmed) {
            return;
        }

        try {
            const result =
                await dispatch(
                    deleteVehicle(id)
                ).unwrap();

            if (
                typeof result.message ===
                'string'
            ) {
                setNotification(
                    result.message
                );
            } else {
                setNotification(
                    'Vehicle deleted successfully'
                );
            }

        } catch (deleteError) {
            setNotification(
                deleteError ||
                'Error deleting vehicle'
            );
        }
    };

    const isFleetManager =
        role === 'FLEET_MANAGER';

    return (
        <div className="vehicle-list">

            <h1>
                Vehicle Inventory
            </h1>

            {notification && (
                <div className="notification">
                    {notification}
                </div>
            )}

            {error && (
                <div className="error">
                    {error}
                </div>
            )}

            {isFleetManager && (
                <button
                    type="button"
                    onClick={handleAdd}
                >
                    + Add Vehicle
                </button>
            )}

            {loading &&
                items.length === 0 && (
                    <p>
                        Loading Fleet Assets...
                    </p>
                )}

            <table>

                <thead>

                    <tr>
                        <th>VIN</th>
                        <th>License Plate</th>
                        <th>Model</th>
                        <th>Status</th>
                        <th>Mileage</th>
                        <th>Actions</th>
                    </tr>

                </thead>

                <tbody>

                    {items.map(
                        (vehicle) => (
                            <tr
                                key={
                                    vehicle.id
                                }
                            >
                                <td>
                                    {vehicle.vin}
                                </td>

                                <td>
                                    {
                                        vehicle.licensePlate
                                    }
                                </td>

                                <td>
                                    {
                                        vehicle.model
                                    }
                                </td>

                                <td>
                                    {
                                        vehicle.status
                                    }
                                </td>

                                <td>
                                    {Number(
                                        vehicle.currentMileage || 0
                                    ).toLocaleString()}
                                    km
                                </td>

                                <td>

                                    {isFleetManager ? (
                                        <>

                                            <button
                                                onClick={() =>
                                                    handleEdit(
                                                        vehicle
                                                    )
                                                }
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleDelete(
                                                        vehicle.id
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>

                                        </>
                                    ) : (
                                        'Read-only'
                                    )}

                                </td>

                            </tr>
                        )
                    )}

                </tbody>

            </table>

            {pagination.totalPages > 1 && (
                <div className="pagination">

                    <button
                        disabled={
                            pagination.currentPage === 0
                        }
                        onClick={() =>
                            dispatch(
                                fetchVehicles({
                                    page:
                                        pagination.currentPage - 1,
                                    size:
                                        pagination.pageSize
                                })
                            )
                        }
                    >
                        Previous
                    </button>

                    <span>
                        Page {
                            pagination.currentPage + 1
                        } of {
                            pagination.totalPages
                        }
                    </span>

                    <button
                        disabled={
                            pagination.currentPage >=
                            pagination.totalPages - 1
                        }
                        onClick={() =>
                            dispatch(
                                fetchVehicles({
                                    page:
                                        pagination.currentPage + 1,
                                    size:
                                        pagination.pageSize
                                })
                            )
                        }
                    >
                        Next
                    </button>

                </div>
            )}

            {showForm && (
                <VehicleForm
                    vehicle={
                        selectedVehicle
                    }
                    onClose={() => {
                        setShowForm(false);

                        dispatch(
                            fetchVehicles({
                                page: 0,
                                size: 10
                            })
                        );
                    }}
                />
            )}

        </div>
    );
}

export default VehicleList;