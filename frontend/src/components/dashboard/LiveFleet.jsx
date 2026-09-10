import React, {
    useEffect,
    useState
} from 'react';

import monitoringService from '../../services/monitoringService';

import './dashboard.css';

function LiveFleet() {
    const [fleet, setFleet] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        const fetchLiveFleet = async () => {
            try {
                const response =
                    await monitoringService.getLiveFleet();

                if (mounted) {
                    const data =
                        response?.data ||
                        response ||
                        [];

                    setFleet(
                        Array.isArray(data)
                            ? data
                            : []
                    );
                }
            } catch (error) {
                console.error(
                    'Error loading live fleet:',
                    error
                );
            } finally {
                if (mounted) {
                    setLoading(false);
                }
            }
        };

        fetchLiveFleet();

        const interval = setInterval(
            fetchLiveFleet,
            5000
        );

        return () => {
            mounted = false;
            clearInterval(interval);
        };
    }, []);

    if (loading) {
        return (
            <div className="live-loading">
                Initializing Live Tracking...
            </div>
        );
    }

    return (
        <div className="live-fleet-container">
            <div className="live-fleet-header">
                <h1>
                    Live Fleet Monitoring
                </h1>

                <div className="live-indicator">
                    <span className="pulse"></span>
                    LIVE
                </div>
            </div>

            <div className="table-wrapper">
                <table className="live-fleet-table">
                    <thead>
                        <tr>
                            <th>Vehicle</th>
                            <th>Status</th>
                            <th>Speed</th>
                            <th>Location</th>
                            <th>Fuel</th>
                        </tr>
                    </thead>

                    <tbody>
                        {fleet.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="empty-row"
                                >
                                    No live fleet data available.
                                </td>
                            </tr>
                        ) : (
                            fleet.map((vehicle) => {
                                const fuelLevel =
                                    Number(
                                        vehicle.fuelLevel ?? 0
                                    );

                                const latitude =
                                    vehicle.latitude ??
                                    vehicle.lat;

                                const longitude =
                                    vehicle.longitude ??
                                    vehicle.lon;

                                const speed =
                                    Number(
                                        vehicle.speed ?? 0
                                    );

                                const lastUpdate =
                                    vehicle.lastUpdate ||
                                    vehicle.updatedAt;

                                return (
                                    <tr
                                        key={
                                            vehicle.id ||
                                            vehicle.vehicleId ||
                                            vehicle.licensePlate
                                        }
                                    >
                                        <td>
                                            <strong>
                                                {
                                                    vehicle.licensePlate
                                                }
                                            </strong>

                                            <div className="vehicle-model">
                                                {vehicle.model}
                                            </div>
                                        </td>

                                        <td>
                                            <span
                                                className={`status-badge ${String(
                                                    vehicle.status
                                                )
                                                    .toLowerCase()
                                                    .replace(
                                                        /_/g,
                                                        '-'
                                                    )}`}
                                            >
                                                {vehicle.status}
                                            </span>
                                        </td>

                                        <td
                                            className={
                                                speed > 100
                                                    ? 'text-emphasis'
                                                    : ''
                                            }
                                        >
                                            {speed.toFixed(1)} km/h
                                        </td>

                                        <td>
                                            {latitude !== undefined &&
                                            longitude !== undefined
                                                ? `${Number(
                                                      latitude
                                                  ).toFixed(
                                                      4
                                                  )}, ${Number(
                                                      longitude
                                                  ).toFixed(
                                                      4
                                                  )}`
                                                : 'Offline'}
                                        </td>

                                        <td>
                                            <div className="fuel-text">
                                                {fuelLevel}%
                                            </div>

                                            <div className="capacity-bar">
                                                <div
                                                    className="capacity-bar-fill"
                                                    style={{
                                                        width: `${Math.min(
                                                            Math.max(
                                                                fuelLevel,
                                                                0
                                                            ),
                                                            100
                                                        )}%`,
                                                        backgroundColor:
                                                            fuelLevel <= 20
                                                                ? '#ef4444'
                                                                : '#10b981'
                                                    }}
                                                ></div>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default LiveFleet;