import React, {
    useEffect,
    useState
} from 'react';

import vehicleService
    from '../../services/vehicleService';

import VehicleForm
    from './VehicleForm';

import './VehicleList.css';


function VehicleList() {

    const [vehicles, setVehicles] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState('');

    const [search, setSearch] =
        useState('');


    const loadVehicles = async () => {

        try {

            setLoading(true);

            const data =
                await vehicleService.getAll(
                    0,
                    10
                );

            setVehicles(
                data.content || []
            );

        } catch (err) {

            console.error(err);

            setError(
                err.response?.data?.message ||
                'Unable to load vehicles'
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadVehicles();

    }, []);


    const getStatusClass = (status) => {

        if (status === 'AVAILABLE') {
            return 'status-available';
        }

        if (status === 'ON_TRIP') {
            return 'status-trip';
        }

        if (status === 'MAINTENANCE') {
            return 'status-maintenance';
        }

        return '';

    };


    const filteredVehicles =
        vehicles.filter((vehicle) => {

            const searchText =
                search.toLowerCase();

            return (

                vehicle.vin
                    ?.toLowerCase()
                    .includes(searchText)

                ||

                vehicle.licensePlate
                    ?.toLowerCase()
                    .includes(searchText)

                ||

                vehicle.model
                    ?.toLowerCase()
                    .includes(searchText)

            );

        });


    const handleDelete = async (id) => {

        const confirmed =
            window.confirm(
                'Are you sure you want to delete this vehicle?'
            );

        if (!confirmed) {
            return;
        }

        try {

            await vehicleService.delete(id);

            loadVehicles();

        } catch (err) {

            console.error(err);

            alert(
                'Failed to delete vehicle'
            );

        }

    };


    return (

        <div className="vehicle-page">


            {/* HEADER */}

            <div className="vehicle-header">

                <div>

                    <p className="page-subtitle">
                        Fleet Management
                    </p>

                    <h1>
                        Vehicle Inventory
                    </h1>

                    <p className="vehicle-description">

                        Manage and monitor all
                        vehicles in your fleet.

                    </p>

                </div>


                <button
                    className="add-vehicle-btn"
                >

                    <span>
                        +
                    </span>

                    Add Vehicle

                </button>

            </div>



            {/* STATISTICS */}

            <div className="vehicle-stats">


                <div className="vehicle-stat-card">

                    <div className="stat-icon">
                        🚚
                    </div>

                    <div>

                        <p>
                            Total Vehicles
                        </p>

                        <h2>
                            {vehicles.length}
                        </h2>

                    </div>

                </div>


                <div className="vehicle-stat-card">

                    <div className="stat-icon available-icon">
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


                <div className="vehicle-stat-card">

                    <div className="stat-icon trip-icon">
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


                <div className="vehicle-stat-card">

                    <div className="stat-icon maintenance-icon">
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
                                        'MAINTENANCE'
                                ).length
                            }

                        </h2>

                    </div>

                </div>


            </div>



            {/* TABLE CARD */}

            <div className="vehicle-table-card">


                <div className="table-toolbar">


                    <div>

                        <h2>
                            Fleet Vehicles
                        </h2>

                        <p>
                            View and manage your
                            registered vehicles
                        </p>

                    </div>


                    <div className="search-box">

                        <span>
                            🔍
                        </span>

                        <input

                            type="text"

                            placeholder="
                                Search VIN, plate or model...
                            "

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

                    <div className="loading-state">

                        Loading vehicles...

                    </div>

                )}


                {error && (

                    <div className="error-state">

                        ⚠ {error}

                    </div>

                )}



                {!loading &&
                    !error && (

                    <div className="table-wrapper">

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
                                    filteredVehicles
                                        .map(
                                            (vehicle) => (

                                                <tr
                                                    key={
                                                        vehicle.id
                                                    }
                                                >

                                                    <td>

                                                        <div
                                                            className="
                                                                vehicle-info
                                                            "
                                                        >

                                                            <div
                                                                className="
                                                                    vehicle-avatar
                                                                "
                                                            >
                                                                🚚
                                                            </div>


                                                            <div>

                                                                <strong>

                                                                    {
                                                                        vehicle.model
                                                                    }

                                                                </strong>

                                                                <span>

                                                                    Fleet
                                                                    Vehicle

                                                                </span>

                                                            </div>

                                                        </div>

                                                    </td>


                                                    <td
                                                        className="
                                                            vin-text
                                                        "
                                                    >

                                                        {
                                                            vehicle.vin
                                                        }

                                                    </td>


                                                    <td>

                                                        <span
                                                            className="
                                                                license-plate
                                                            "
                                                        >

                                                            {
                                                                vehicle.licensePlate
                                                            }

                                                        </span>

                                                    </td>


                                                    <td>

                                                        <span

                                                            className={
                                                                `status-badge
                                                                ${getStatusClass(
                                                                    vehicle.status
                                                                )}`
                                                            }

                                                        >

                                                            {
                                                                vehicle.status
                                                                    ?.replace(
                                                                        '_',
                                                                        ' '
                                                                    )
                                                            }

                                                        </span>

                                                    </td>


                                                    <td>

                                                        {
                                                            vehicle.mileage
                                                        } km

                                                    </td>


                                                    <td>

                                                        <div
                                                            className="
                                                                action-buttons
                                                            "
                                                        >

                                                            <button
                                                                className="
                                                                    edit-btn
                                                                "
                                                            >

                                                                ✏ Edit

                                                            </button>


                                                            <button

                                                                className="
                                                                    delete-btn
                                                                "

                                                                onClick={
                                                                    () =>
                                                                        handleDelete(
                                                                            vehicle.id
                                                                        )
                                                                }

                                                            >

                                                                🗑 Delete

                                                            </button>

                                                        </div>

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
                                    className="
                                        empty-state
                                    "
                                >

                                    <div>
                                        🚚
                                    </div>

                                    <h3>
                                        No vehicles found
                                    </h3>

                                    <p>

                                        Try changing your
                                        search.

                                    </p>

                                </div>

                            )
                        }


                    </div>

                )}


            </div>


        </div>

    );

}


export default VehicleList;