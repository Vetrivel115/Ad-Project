import React, {
    useEffect,
    useState
} from 'react';

import vehicleService from '../../services/vehicleService';
import driverService from '../../services/driverService';
import tripService from '../../services/tripService';

import './trips.css';


function TripForm({
    onClose,
    onRefresh
}) {

    const [vehicles, setVehicles] =
        useState([]);

    const [drivers, setDrivers] =
        useState([]);

    const [vehicleId, setVehicleId] =
        useState('');

    const [driverId, setDriverId] =
        useState('');

    const [loading, setLoading] =
        useState(false);

    const [dataLoading, setDataLoading] =
        useState(true);

    const [error, setError] =
        useState('');


    useEffect(() => {

        const loadData = async () => {

            try {

                setDataLoading(true);

                setError('');


                const vehicleResponse =
                    await vehicleService.getAvailable();


                console.log(
                    'Vehicle API Response:',
                    vehicleResponse
                );


                /*
                 * Backend returns an array directly:
                 *
                 * [
                 *   { id: 1, ... },
                 *   { id: 52, ... }
                 * ]
                 */
                if (
                    Array.isArray(
                        vehicleResponse
                    )
                ) {

                    setVehicles(
                        vehicleResponse
                    );

                } else {

                    setVehicles(
                        vehicleResponse?.content ||
                        vehicleResponse?.data ||
                        []
                    );

                }


                const driverResponse =
                    await driverService.getAvailable();


                console.log(
                    'Driver API Response:',
                    driverResponse
                );


                /*
                 * Handle driver response.
                 */
                if (
                    Array.isArray(
                        driverResponse
                    )
                ) {

                    setDrivers(
                        driverResponse
                    );

                } else {

                    setDrivers(
                        driverResponse?.content ||
                        driverResponse?.data ||
                        []
                    );

                }


            } catch (error) {

                console.error(
                    'Error loading trip form:',
                    error
                );


                setError(

                    error.response?.data?.message ||

                    error.message ||

                    'Error loading vehicles or drivers'

                );


            } finally {

                setDataLoading(false);

            }

        };


        loadData();


    }, []);



    const handleSubmit = async (
        event
    ) => {

        event.preventDefault();


        if (
            !vehicleId ||
            !driverId
        ) {

            alert(
                'Please select both a vehicle and a driver'
            );

            return;

        }


        setLoading(true);


        try {

            await tripService.start({

                vehicleId:
                    Number(vehicleId),

                driverId:
                    Number(driverId)

            });


            if (onRefresh) {

                await onRefresh();

            }


            onClose();


        } catch (error) {

            console.error(
                'Error dispatching trip:',
                error
            );


            alert(

                'Error dispatching trip: ' +

                (
                    error.response?.data?.message ||

                    error.response?.data ||

                    error.message ||

                    'Unknown error'
                )

            );


        } finally {

            setLoading(false);

        }

    };



    return (

        <div
            className="modal-overlay"
            onClick={onClose}
        >

            <div
                className="modal"
                onClick={(event) =>
                    event.stopPropagation()
                }
            >


                <div
                    className="modal-header"
                >

                    <h2>
                        Dispatch Vehicle
                    </h2>


                    <button
                        type="button"
                        className="close-button"
                        onClick={onClose}
                    >
                        ×
                    </button>


                </div>



                {error && (

                    <div
                        className="error-message"
                    >

                        {error}

                    </div>

                )}



                {dataLoading ? (

                    <div
                        className="form-loading"
                    >

                        Loading...

                    </div>

                ) : (

                    <form
                        onSubmit={handleSubmit}
                    >


                        {/* VEHICLE */}

                        <div
                            className="form-group"
                        >

                            <label>
                                Available Vehicle
                            </label>


                            <select

                                value={vehicleId}

                                onChange={(event) =>
                                    setVehicleId(
                                        event.target.value
                                    )
                                }

                                required
                            >

                                <option value="">
                                    Select Vehicle
                                </option>


                                {vehicles.map(
                                    (vehicle) => (

                                        <option
                                            key={vehicle.id}
                                            value={vehicle.id}
                                        >

                                            {vehicle.licensePlate}
                                            {' - '}
                                            {vehicle.model}

                                        </option>

                                    )
                                )}

                            </select>


                            {vehicles.length === 0 && (

                                <small
                                    style={{
                                        color: 'red'
                                    }}
                                >

                                    No available vehicles found.

                                </small>

                            )}

                        </div>



                        {/* DRIVER */}

                        <div
                            className="form-group"
                        >

                            <label>
                                Available Driver
                            </label>


                            <select

                                value={driverId}

                                onChange={(event) =>
                                    setDriverId(
                                        event.target.value
                                    )
                                }

                                required
                            >

                                <option value="">
                                    Select Driver
                                </option>


                                {drivers.map(
                                    (driver) => (

                                        <option
                                            key={driver.id}
                                            value={driver.id}
                                        >

                                            {driver.user?.username ||
                                                driver.username ||
                                                `Driver ${driver.id}`}

                                        </option>

                                    )
                                )}

                            </select>


                            {drivers.length === 0 && (

                                <small
                                    style={{
                                        color: 'red'
                                    }}
                                >

                                    No available drivers found.

                                </small>

                            )}

                        </div>



                        {/* BUTTONS */}

                        <div
                            className="modal-actions"
                        >

                            <button
                                type="button"
                                className="secondary-button"
                                onClick={onClose}
                                disabled={loading}
                            >

                                Cancel

                            </button>


                            <button
                                type="submit"
                                className="primary-button"

                                disabled={
                                    loading ||
                                    vehicles.length === 0 ||
                                    drivers.length === 0
                                }
                            >

                                {loading
                                    ? 'Starting...'
                                    : 'Start Trip'}

                            </button>


                        </div>


                    </form>

                )}


            </div>

        </div>

    );

}


export default TripForm;