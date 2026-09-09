import React, {
    useEffect,
    useState
} from 'react';

import vehicleService
    from '../../services/vehicleService';

import driverService
    from '../../services/driverService';

import tripService
    from '../../services/tripService';

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

    const [error, setError] =
        useState('');


    useEffect(() => {

        const loadVehicles = async () => {

            try {

                const response =
                    await vehicleService.getAvailable();

                console.log(
                    'Available vehicles:',
                    response
                );

                const vehicleData =
                    response?.data ||
                    response;

                setVehicles(
                    Array.isArray(vehicleData)
                        ? vehicleData
                        : vehicleData?.content || []
                );

            } catch (error) {

                console.error(
                    'Error loading vehicles:',
                    error
                );

                setError(
                    error.response?.data?.message ||
                    error.message ||
                    'Unable to load available vehicles'
                );

            }

        };


        const loadDrivers = async () => {

            try {

                const response =
                    await driverService.getAvailable();

                console.log(
                    'Available drivers:',
                    response
                );

                const driverData =
                    response?.data ||
                    response;

                setDrivers(
                    Array.isArray(driverData)
                        ? driverData
                        : driverData?.content || []
                );

            } catch (error) {

                console.error(
                    'Error loading drivers:',
                    error
                );

                setError((previousError) =>
                    previousError ||
                    error.response?.data?.message ||
                    error.message ||
                    'Unable to load available drivers'
                );

            }

        };


        loadVehicles();

        loadDrivers();

    }, []);


    const handleSubmit = async (
        event
    ) => {

        event.preventDefault();

        setError('');


        if (!vehicleId) {

            setError(
                'Please select a vehicle'
            );

            return;

        }


        if (!driverId) {

            setError(
                'Please select a driver'
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


            if (onClose) {

                onClose();

            }

        } catch (error) {

            console.error(
                'Error starting trip:',
                error
            );


            setError(

                error.response?.data?.message ||

                error.response?.data ||

                error.message ||

                'Error dispatching trip'

            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div
            className="modal-overlay"
        >

            <div
                className="modal"
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

                            <small>
                                No available vehicles found
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

                                        {driver.user
                                            ?.username ||
                                            driver.name ||
                                            `Driver ${driver.id}`}

                                    </option>

                                )
                            )}

                        </select>


                        {drivers.length === 0 && (

                            <small>
                                No available drivers found
                            </small>

                        )}

                    </div>



                    {/* ACTIONS */}

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
                            disabled={loading}
                        >

                            {loading
                                ? 'Starting...'
                                : 'Start Trip'}

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}


export default TripForm;