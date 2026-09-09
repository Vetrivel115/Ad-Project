import React, {
    useCallback,
    useEffect,
    useState
} from 'react';

import { useSelector } from 'react-redux';

import tripService from '../../services/tripService';

import TripForm from './TripForm';

import './trips.css';

function TripList() {
    const [trips, setTrips] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [showForm, setShowForm] =
        useState(false);

    const user = useSelector(
        (state) => state.auth.user
    );

    const fetchTrips = useCallback(
        async () => {
            try {
                setLoading(true);

                const response =
                    await tripService.getAll();

                const data =
                    response?.data ||
                    response;

                setTrips(
                    Array.isArray(data)
                        ? data
                        : data?.content || []
                );
            } catch (error) {
                console.error(
                    'Error fetching trips:',
                    error
                );
            } finally {
                setLoading(false);
            }
        },
        []
    );

    useEffect(() => {
        fetchTrips();
    }, [fetchTrips]);

    const canDispatch =
        user?.role === 'FLEET_MANAGER' ||
        user?.role === 'DISPATCHER';

    const handleEndTrip = async (
        tripId
    ) => {
        const distance =
            window.prompt(
                'Enter distance covered (km):',
                '0'
            );

        if (distance === null) {
            return;
        }

        try {
            await tripService.end(
                tripId,
                parseFloat(distance)
            );

            fetchTrips();
        } catch (error) {
            alert(
                'Error ending trip: ' +
                    (
                        error.response?.data?.message ||
                        error.message
                    )
            );
        }
    };

    if (
        loading &&
        trips.length === 0
    ) {
        return (
            <div className="page-loading">
                Loading Journeys...
            </div>
        );
    }

    return (
        <div className="trip-container">
            <div className="page-header">
                <h1>Fleet Trips</h1>

                {canDispatch && (
                    <button
                        className="primary-button"
                        onClick={() =>
                            setShowForm(true)
                        }
                    >
                        + Dispatch Vehicle
                    </button>
                )}
            </div>

            <div className="table-wrapper">
                <table className="trip-table">
                    <thead>
                        <tr>
                            <th>Trip ID</th>
                            <th>Vehicle</th>
                            <th>Driver</th>
                            <th>Start Time</th>
                            <th>Status</th>
                            <th>Distance</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {trips.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="empty-row"
                                >
                                    No trips found.
                                </td>
                            </tr>
                        ) : (
                            trips.map((trip) => (
                                <tr key={trip.id}>
                                    <td>
                                        TRIP-{trip.id}
                                    </td>

                                    <td>
                                        {
                                            trip.vehicle
                                                ?.licensePlate
                                        }
                                    </td>

                                    <td>
                                        {
                                            trip.driver
                                                ?.user
                                                ?.username
                                        }
                                    </td>

                                    <td>
                                        {trip.startTime
                                            ? new Date(
                                                  trip.startTime
                                              ).toLocaleString()
                                            : '-'}
                                    </td>

                                    <td>
                                        <span
                                            className={`trip-status ${String(
                                                trip.status
                                            ).toLowerCase()}`}
                                        >
                                            {trip.status}
                                        </span>
                                    </td>

                                    <td>
                                        {
                                            trip.distanceCovered ||
                                            0
                                        }
                                        km
                                    </td>

                                    <td>
                                        {trip.status ===
                                            'ACTIVE' && (
                                            <button
                                                className="end-trip-button"
                                                onClick={() =>
                                                    handleEndTrip(
                                                        trip.id
                                                    )
                                                }
                                            >
                                                End Trip
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {showForm && (
                <TripForm
                    onClose={() =>
                        setShowForm(false)
                    }
                    onRefresh={fetchTrips}
                />
            )}
        </div>
    );
}

export default TripList;