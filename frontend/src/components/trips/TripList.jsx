import React, {
    useCallback,
    useEffect,
    useState
} from 'react';

import { useSelector } from 'react-redux';

import tripService from '../../services/tripService';

import TripForm from './TripForm';

import './TripForm.css';


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


    /*
     * Fetch all trips.
     */
    const fetchTrips = useCallback(
        async () => {

            try {

                setLoading(true);


                const response =
                    await tripService.getAll();


                /*
                 * Support both:
                 *
                 * Array response:
                 * [
                 *   {...},
                 *   {...}
                 * ]
                 *
                 * And Spring Page response:
                 * {
                 *   content: [...]
                 * }
                 */
                const data =
                    response?.data ||
                    response;


                setTrips(
                    Array.isArray(data)
                        ? data
                        : data?.content || []
                );

            }

            catch (error) {

                console.error(
                    'Error fetching trips:',
                    error
                );

                setTrips([]);

            }

            finally {

                setLoading(false);

            }

        },
        []
    );


    /*
     * Load trips when component opens.
     */
    useEffect(() => {

        fetchTrips();

    }, [fetchTrips]);


    /*
     * Users allowed to dispatch vehicles.
     */
    const canDispatch =
        user?.role === 'FLEET_MANAGER' ||
        user?.role === 'DISPATCHER';


    /*
     * End a trip.
     */
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


        const distanceValue =
            Number(distance);


        if (
            Number.isNaN(distanceValue) ||
            distanceValue < 0
        ) {

            alert(
                'Please enter a valid distance.'
            );

            return;

        }


        try {

            await tripService.end(
                tripId,
                distanceValue
            );


            /*
             * Refresh trips after ending.
             */
            await fetchTrips();

        }

        catch (error) {

            alert(

                'Error ending trip: ' +

                (
                    error.response?.data?.message ||

                    error.response?.data ||

                    error.message ||

                    'Unknown error'
                )

            );

        }

    };


    /*
     * Loading screen.
     */
    if (
        loading &&
        trips.length === 0
    ) {

        return (

            <div className="page-loading">

                Loading Trips...

            </div>

        );

    }


    return (

        <div className="trip-container">


            {/* PAGE HEADER */}

            <div className="page-header">

                <h1>
                    Fleet Trips
                </h1>


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



            {/* TRIPS TABLE */}

            <div className="table-wrapper">

                <table className="trip-table">

                    <thead>

                        <tr>

                            <th>
                                Trip ID
                            </th>

                            <th>
                                Vehicle
                            </th>

                            <th>
                                Driver
                            </th>

                            <th>
                                Start Time
                            </th>

                            <th>
                                Status
                            </th>

                            <th>
                                Distance
                            </th>

                            <th>
                                Actions
                            </th>

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

                            trips.map(
                                (trip) => (

                                    <tr
                                        key={trip.id}
                                    >

                                        {/* TRIP ID */}

                                        <td>

                                            TRIP-
                                            {trip.id}

                                        </td>



                                        {/* VEHICLE */}

                                        <td>

                                            {
                                                trip.vehicle
                                                    ?.licensePlate ||
                                                '-'
                                            }

                                        </td>



                                        {/* DRIVER */}

                                        <td>

                                            {
                                                trip.driver
                                                    ?.user
                                                    ?.username ||

                                                trip.driver
                                                    ?.username ||

                                                '-'
                                            }

                                        </td>



                                        {/* START TIME */}

                                        <td>

                                            {
                                                trip.startTime
                                                    ? new Date(
                                                        trip.startTime
                                                    ).toLocaleString()

                                                    : '-'
                                            }

                                        </td>



                                        {/* STATUS */}

                                        <td>

                                            <span
                                                className={`trip-status ${String(
                                                    trip.status
                                                ).toLowerCase()}`}
                                            >

                                                {
                                                    trip.status
                                                }

                                            </span>

                                        </td>



                                        {/* DISTANCE */}

                                        <td>

                                            {
                                                trip.distanceCovered ||
                                                0
                                            }
                                            km

                                        </td>



                                        {/* ACTION */}

                                        <td>

                                            {trip.status ===
                                                'ACTIVE' &&
                                                canDispatch && (

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

                                )
                            )

                        )}

                    </tbody>

                </table>

            </div>



            {/* DISPATCH FORM */}

            {showForm && (

                <TripForm

                    onClose={() =>
                        setShowForm(false)
                    }

                    onRefresh={
                        fetchTrips
                    }

                />

            )}

        </div>

    );

}


export default TripList;