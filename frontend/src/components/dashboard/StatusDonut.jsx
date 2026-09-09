import React from 'react';

import '../components/dashboard/dashboard.css';

function StatusDonut({ vehicles = [] }) {
    if (vehicles.length === 0) {
        return null;
    }

    const total = vehicles.length;

    const onTrip =
        vehicles.filter(
            (vehicle) => vehicle.status === 'ON_TRIP'
        ).length;

    const maintenance =
        vehicles.filter(
            (vehicle) => vehicle.status === 'UNDER_MAINTENANCE'
        ).length;

    const available =
        vehicles.filter(
            (vehicle) => vehicle.status === 'AVAILABLE'
        ).length;

    const onTripPercentage =
        (onTrip / total) * 100;

    const maintenancePercentage =
        (maintenance / total) * 100;

    const availablePercentage =
        (available / total) * 100;

    return (
        <div className="status-donut-container">
            <h2>Vehicle Status Distribution</h2>

            <div className="donut-content">
                <svg
                    width="150"
                    height="150"
                    viewBox="0 0 42 42"
                    className="status-donut"
                >
                    <circle
                        cx="21"
                        cy="21"
                        r="15.9155"
                        fill="transparent"
                        stroke="#e5e7eb"
                        strokeWidth="4"
                    />

                    {onTripPercentage > 0 && (
                        <circle
                            cx="21"
                            cy="21"
                            r="15.9155"
                            fill="transparent"
                            stroke="#10b981"
                            strokeWidth="4"
                            strokeDasharray={`${onTripPercentage} ${100 - onTripPercentage}`}
                            strokeDashoffset="25"
                        />
                    )}

                    {maintenancePercentage > 0 && (
                        <circle
                            cx="21"
                            cy="21"
                            r="15.9155"
                            fill="transparent"
                            stroke="#f59e0b"
                            strokeWidth="4"
                            strokeDasharray={`${maintenancePercentage} ${100 - maintenancePercentage}`}
                            strokeDashoffset={`${25 - onTripPercentage}`}
                        />
                    )}

                    {availablePercentage > 0 && (
                        <circle
                            cx="21"
                            cy="21"
                            r="15.9155"
                            fill="transparent"
                            stroke="#2563eb"
                            strokeWidth="4"
                            strokeDasharray={`${availablePercentage} ${100 - availablePercentage}`}
                            strokeDashoffset={`${25 - onTripPercentage - maintenancePercentage}`}
                        />
                    )}

                    <text
                        x="21"
                        y="20"
                        textAnchor="middle"
                        fontSize="6"
                        fontWeight="bold"
                    >
                        {total}
                    </text>

                    <text
                        x="21"
                        y="25"
                        textAnchor="middle"
                        fontSize="3"
                    >
                        Vehicles
                    </text>
                </svg>

                <div className="donut-legend">
                    <div className="legend-item">
                        <span className="dot on-trip"></span>
                        On Trip ({onTrip})
                    </div>

                    <div className="legend-item">
                        <span className="dot maintenance"></span>
                        Maintenance ({maintenance})
                    </div>

                    <div className="legend-item">
                        <span className="dot available"></span>
                        Available ({available})
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StatusDonut;