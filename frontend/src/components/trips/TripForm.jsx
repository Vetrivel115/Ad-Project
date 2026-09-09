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

    useEffect(() => {
        const loadData = async () => {
            try {
                const [
                    vehicleResponse,
                    driverResponse
                ] = await Promise.all([
                    vehicleService.getAvailable(),
                    driverService.getAvailable()
                ]);

                const vehicleData =
                    vehicleResponse?.data ||
                    vehicleResponse;

                const driverData =
                    driverResponse?.data ||
                    driverResponse;

                setVehicles(
                    Array.isArray(vehicleData)
                        ? vehicleData
                        : vehicleData?.content || []
                );

                setDrivers(
                    Array.isArray(driverData)
                        ? driverData
                        : driverData?.content || []
                );
            } catch (error) {
                console.error(
                    'Error loading trip form:',
                    error
                );
            }
        };

        loadData();
    }, []);

    const handleSubmit = async (event) => {
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
                vehicleId: parseInt(
                    vehicleId,
                    10
                ),

                driverId: parseInt(
                    driverId,
                    10
                )
            });

            if (onRefresh) {
                onRefresh();
            }

            if (onClose) {
                onClose();
            }
        } catch (error) {
            alert(
                'Error dispatching trip: ' +
                    (
                        error.response?.data?.message ||
                        error.message
                    )
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>Dispatch Vehicle</h2>

                    <button
                        type="button"
                        className="close-button"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
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
                                        {
                                            vehicle.licensePlate
                                        }
                                    </option>
                                )
                            )}
                        </select>
                    </div>

                    <div className="form-group">
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
                                        {
                                            driver.user
                                                ?.username
                                        }
                                    </option>
                                )
                            )}
                        </select>
                    </div>

                    <div className="modal-actions">
                        <button
                            type="button"
                            className="secondary-button"
                            onClick={onClose}
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