import React, {
    useEffect,
    useState
} from 'react';

import {
    useSelector
} from 'react-redux';

import vehicleService
    from '../../services/vehicleService';

import VehicleForm
    from './VehicleForm';

import './VehicleList.css';


function VehicleList() {

    const user = useSelector(
        (state) => state.auth?.user
    );


    const [vehicles, setVehicles] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState('');

    const [search, setSearch] =
        useState('');

    const [showForm, setShowForm] =
        useState(false);

    const [selectedVehicle, setSelectedVehicle] =
        useState(null);

    const [successMessage, setSuccessMessage] =
        useState('');


    /*
     * Only Fleet Manager can
     * add new vehicles.
     */
    const canManageVehicles =
        user?.role === 'FLEET_MANAGER';


    const loadVehicles = async () => {

        try {

            setLoading(true);

            setError('');

            const data =
                await vehicleService.getAll(
                    0,
                    10
                );

            setVehicles(
                data?.content ||
                data ||
                []
            );

        }

        catch (err) {

            setError(

                err.response?.data?.message ||

                err.message ||

                'Unable to load vehicles'

            );

        }

        finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadVehicles();

    }, [user?.role]);


    const handleAddVehicle = () => {

        setSelectedVehicle(null);

        setShowForm(true);

        setSuccessMessage('');

    };


    const handleEditVehicle = (
        vehicle
    ) => {

        setSelectedVehicle(
            vehicle
        );

        setShowForm(true);

        setSuccessMessage('');

    };


    const handleDelete = async (
        id
    ) => {

        const confirmed =
            window.confirm(
                'Are you sure you want to delete this vehicle?'
            );


        if (!confirmed) {

            return;

        }


        try {

            const response =
                await vehicleService.delete(
                    id
                );


            if (
                typeof response ===
                'string'
            ) {

                setSuccessMessage(
                    response
                );

            }


            loadVehicles();

        }

        catch (err) {

            setError(

                err.response?.data?.message ||

                err.message ||

                'Failed to delete vehicle'

            );

        }

    };


    const handleCloseForm = () => {

        setShowForm(false);

        setSelectedVehicle(null);

    };


    const handleSuccess = (
        message
    ) => {

        if (message) {

            setSuccessMessage(
                message
            );

        }

        setShowForm(false);

        setSelectedVehicle(null);

        loadVehicles();

    };


    const getStatusClass = (
        status
    ) => {

        if (
            status === 'AVAILABLE'
        ) {

            return 'status-available';

        }


        if (
            status === 'ON_TRIP'
        ) {

            return 'status-trip';

        }


        if (
            status ===
            'UNDER_MAINTENANCE'
        ) {

            return 'status-maintenance';

        }


        return '';

    };


    const filteredVehicles =
        vehicles.filter(
            (vehicle) => {

                const searchText =
                    search.toLowerCase();


                return (

                    vehicle.vin
                        ?.toLowerCase()
                        .includes(
                            searchText
                        )

                    ||

                    vehicle.licensePlate
                        ?.toLowerCase()
                        .includes(
                            searchText
                        )

                    ||

                    vehicle.model
                        ?.toLowerCase()
                        .includes(
                            searchText
                        )

                );

            }
        );


    return (

        <div className="vehicle-page">


            <div
                className="vehicle-header"
            >

                <div>

                    <p
                        className="page-subtitle"
                    >
                        Fleet Management
                    </p>


                    <h1>
                        Vehicle Inventory
                    </h1>


                    <p
                        className="vehicle-description"
                    >
                        Manage and monitor all
                        vehicles in your fleet.
                    </p>

                </div>


                {canManageVehicles && (

                    <button
                        type="button"
                        className="add-vehicle-btn"
                        onClick={
                            handleAddVehicle
                        }
                    >

                        <span>
                            +
                        </span>

                        Add Vehicle

                    </button>

                )}

            </div>


            {successMessage && (

                <div
                    className="success-message"
                >

                    {successMessage}

                </div>

            )}


            <div
                className="vehicle-stats"
            >


                <div
                    className="vehicle-stat-card"
                >

                    <div
                        className="stat-icon"
                    >
                        🚚
                    </div>


                    <div>

                        <p>
                            Total Vehicles
                        </p>


                        <h2>

                            {
                                vehicles.length
                            }

                        </h2>

                    </div>

                </div>


                <div
                    className="vehicle-stat-card"
                >

                    <div
                        className="
                            stat-icon
                            available-icon
                        "
                    >
                        ✓
                    </div>


                    <div>

                        <p>
                            Available
                        </p>


                        <h2>

                            {
                                vehicles.filter(
                                    (vehicle) =>
                                        vehicle.status ===
                                        'AVAILABLE'
                                ).length
                            }

                        </h2>

                    </div>

                </div>


                <div
                    className="vehicle-stat-card"
                >

                    <div
                        className="
                            stat-icon
                            trip-icon
                        "
                    >
                        📍
                    </div>


                    <div>

                        <p>
                            On Trip
                        </p>


                        <h2>

                            {
                                vehicles.filter(
                                    (vehicle) =>
                                        vehicle.status ===
                                        'ON_TRIP'
                                ).length
                            }

                        </h2>

                    </div>

                </div>


                <div
                    className="vehicle-stat-card"
                >

                    <div
                        className="
                            stat-icon
                            maintenance-icon
                        "
                    >
                        🔧
                    </div>


                    <div>

                        <p>
                            Maintenance
                        </p>


                        <h2>

                            {
                                vehicles.filter(
                                    (vehicle) =>
                                        vehicle.status ===
                                        'UNDER_MAINTENANCE'
                                ).length
                            }

                        </h2>

                    </div>

                </div>

            </div>


            <div
                className="vehicle-table-card"
            >


                <div
                    className="table-toolbar"
                >

                    <div>

                        <h2>
                            Fleet Vehicles
                        </h2>


                        <p>
                            View and manage your
                            registered vehicles
                        </p>

                    </div>


                    <div
                        className="search-box"
                    >

                        <span>
                            🔍
                        </span>


                        <input
                            type="text"
                            placeholder="Search VIN, plate or model..."
                            value={search}
                            onChange={
                                (event) =>
                                    setSearch(
                                        event.target.value
                                    )
                            }
                        />

                    </div>

                </div>


                {loading && (

                    <div
                        className="loading-state"
                    >
                        Loading vehicles...
                    </div>

                )}


                {error && (

                    <div
                        className="error-state"
                    >
                        ⚠ {error}
                    </div>

                )}


                {
                    !loading &&
                    !error && (

                        <div
                            className="table-wrapper"
                        >

                            <table
                                className="vehicle-table"
                            >

                                <thead>

                                    <tr>

                                        <th>
                                            Vehicle
                                        </th>

                                        <th>
                                            VIN
                                        </th>

                                        <th>
                                            License Plate
                                        </th>

                                        <th>
                                            Status
                                        </th>

                                        <th>
                                            Mileage
                                        </th>

                                        <th>
                                            Actions
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {
                                        filteredVehicles.map(
                                            (
                                                vehicle
                                            ) => (

                                                <tr
                                                    key={
                                                        vehicle.id
                                                    }
                                                >

                                                    <td>

                                                        {
                                                            vehicle.model
                                                        }

                                                    </td>


                                                    <td>

                                                        {
                                                            vehicle.vin
                                                        }

                                                    </td>


                                                    <td>

                                                        {
                                                            vehicle.licensePlate
                                                        }

                                                    </td>


                                                    <td>

                                                        <span
                                                            className={
                                                                `status-badge ${getStatusClass(
                                                                    vehicle.status
                                                                )}`
                                                            }
                                                        >

                                                            {
                                                                vehicle.status
                                                            }

                                                        </span>

                                                    </td>


                                                    <td>

                                                        {
                                                            vehicle.currentMileage ??
                                                            0
                                                        }

                                                        {' '}km

                                                    </td>


                                                    <td>

                                                        {canManageVehicles && (

                                                            <div
                                                                className="action-buttons"
                                                            >

                                                                <button
                                                                    type="button"
                                                                    className="edit-btn"
                                                                    onClick={
                                                                        () =>
                                                                            handleEditVehicle(
                                                                                vehicle
                                                                            )
                                                                    }
                                                                >
                                                                    Edit
                                                                </button>


                                                                <button
                                                                    type="button"
                                                                    className="delete-btn"
                                                                    onClick={
                                                                        () =>
                                                                            handleDelete(
                                                                                vehicle.id
                                                                            )
                                                                    }
                                                                >
                                                                    Delete
                                                                </button>

                                                            </div>

                                                        )}

                                                    </td>

                                                </tr>

                                            )
                                        )
                                    }

                                </tbody>

                            </table>


                            {
                                filteredVehicles.length ===
                                0 && (

                                    <div
                                        className="empty-state"
                                    >

                                        <h3>
                                            No vehicles found
                                        </h3>

                                    </div>

                                )
                            }

                        </div>

                    )
                }

            </div>


            {showForm && (

                <VehicleForm

                    vehicle={
                        selectedVehicle
                    }

                    onClose={
                        handleCloseForm
                    }

                    onSuccess={
                        handleSuccess
                    }

                />

            )}

        </div>

    );

}


export default VehicleList;