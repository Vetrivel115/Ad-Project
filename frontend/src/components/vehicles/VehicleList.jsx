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


    /* ================= STATE ================= */


    const [vehicles, setVehicles] =
        useState([]);


    const [loading, setLoading] =
        useState(true);


    const [error, setError] =
        useState('');


    const [search, setSearch] =
        useState('');


    /*
     * Controls Add/Edit modal.
     */
    const [showForm, setShowForm] =
        useState(false);


    /*
     * null = Add Vehicle
     * object = Edit Vehicle
     */
    const [selectedVehicle, setSelectedVehicle] =
        useState(null);



    /* ================= LOAD VEHICLES ================= */


    const loadVehicles = async () => {

        try {

            setLoading(true);

            setError('');


            const data =
                await vehicleService.getAll(
                    0,
                    10
                );


            /*
             * Backend returns Spring Page.
             */
            setVehicles(
                data?.content || []
            );

        }

        catch (err) {

            console.error(
                'Error loading vehicles:',
                err
            );


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



    /* ================= INITIAL LOAD ================= */


    useEffect(() => {

        loadVehicles();

    }, []);



    /* ================= ADD VEHICLE ================= */


    const handleAddVehicle = () => {

        /*
         * null means create mode.
         */
        setSelectedVehicle(null);


        setShowForm(true);

    };



    /* ================= EDIT VEHICLE ================= */


    const handleEditVehicle = (
        vehicle
    ) => {

        setSelectedVehicle(
            vehicle
        );


        setShowForm(true);

    };



    /* ================= DELETE VEHICLE ================= */


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

            await vehicleService.delete(
                id
            );


            /*
             * Reload table after delete.
             */
            loadVehicles();

        }

        catch (err) {

            console.error(
                'Delete error:',
                err
            );


            alert(

                err.response?.data?.message ||

                'Failed to delete vehicle'

            );

        }

    };



    /* ================= CLOSE FORM ================= */


    const handleCloseForm = () => {

        setShowForm(
            false
        );


        setSelectedVehicle(
            null
        );


        /*
         * Reload vehicles after
         * creating or updating.
         */
        loadVehicles();

    };



    /* ================= STATUS CSS ================= */


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



    /* ================= SEARCH ================= */


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



    /* ================= UI ================= */


    return (

        <div
            className="vehicle-page"
        >


            {/* ================= HEADER ================= */}


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
                        className="
                            vehicle-description
                        "
                    >
                        Manage and monitor all
                        vehicles in your fleet.
                    </p>

                </div>



                <button
                    className="
                        add-vehicle-btn
                    "
                    onClick={
                        handleAddVehicle
                    }
                >

                    <span>
                        +
                    </span>

                    Add Vehicle

                </button>


            </div>



            {/* ================= STATISTICS ================= */}


            <div
                className="vehicle-stats"
            >


                {/* TOTAL */}


                <div
                    className="
                        vehicle-stat-card
                    "
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



                {/* AVAILABLE */}


                <div
                    className="
                        vehicle-stat-card
                    "
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
                                    (
                                        vehicle
                                    ) =>

                                        vehicle.status ===
                                        'AVAILABLE'

                                ).length
                            }

                        </h2>

                    </div>

                </div>



                {/* ON TRIP */}


                <div
                    className="
                        vehicle-stat-card
                    "
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
                                    (
                                        vehicle
                                    ) =>

                                        vehicle.status ===
                                        'ON_TRIP'

                                ).length
                            }

                        </h2>

                    </div>

                </div>



                {/* MAINTENANCE */}


                <div
                    className="
                        vehicle-stat-card
                    "
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
                                    (
                                        vehicle
                                    ) =>

                                        vehicle.status ===
                                        'UNDER_MAINTENANCE'

                                ).length
                            }

                        </h2>

                    </div>

                </div>


            </div>



            {/* ================= TABLE ================= */}


            <div
                className="
                    vehicle-table-card
                "
            >


                {/* TABLE HEADER */}


                <div
                    className="
                        table-toolbar
                    "
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



                    {/* SEARCH */}


                    <div
                        className="search-box"
                    >

                        <span>
                            🔍
                        </span>


                        <input
                            type="text"
                            placeholder="
                                Search VIN,
                                plate or model...
                            "
                            value={search}
                            onChange={
                                (event) =>

                                    setSearch(
                                        event.target
                                            .value
                                    )
                            }
                        />

                    </div>


                </div>



                {/* LOADING */}


                {
                    loading && (

                        <div
                            className="
                                loading-state
                            "
                        >

                            Loading vehicles...

                        </div>

                    )
                }



                {/* ERROR */}


                {
                    error && (

                        <div
                            className="
                                error-state
                            "
                        >

                            ⚠ {error}

                        </div>

                    )
                }



                {/* TABLE */}


                {
                    !loading &&
                    !error && (

                        <div
                            className="
                                table-wrapper
                            "
                        >

                            <table
                                className="
                                    vehicle-table
                                "
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
                                                (
                                                    vehicle
                                                ) => (

                                                    <tr
                                                        key={
                                                            vehicle.id
                                                        }
                                                    >


                                                        {/* VEHICLE */}


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



                                                        {/* VIN */}


                                                        <td
                                                            className="
                                                                vin-text
                                                            "
                                                        >

                                                            {
                                                                vehicle.vin
                                                            }

                                                        </td>



                                                        {/* LICENSE */}


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



                                                        {/* STATUS */}


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
                                                                            /_/g,
                                                                            ' '
                                                                        )
                                                                }

                                                            </span>

                                                        </td>



                                                        {/* MILEAGE */}


                                                        <td>

                                                            {
                                                                vehicle.currentMileage
                                                                    ?? 0
                                                            }

                                                            {' '}
                                                            km

                                                        </td>



                                                        {/* ACTIONS */}


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
                                                                    onClick={
                                                                        () =>
                                                                            handleEditVehicle(
                                                                                vehicle
                                                                            )
                                                                    }
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



                            {/* EMPTY STATE */}


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
                                            search or add a new
                                            vehicle.
                                        </p>

                                    </div>

                                )
                            }


                        </div>

                    )
                }


            </div>



            {/* ================= ADD / EDIT FORM ================= */}


            {
                showForm && (

                    <VehicleForm

                        vehicle={
                            selectedVehicle
                        }

                        onClose={
                            handleCloseForm
                        }

                    />

                )
            }


        </div>

    );

}


export default VehicleList;