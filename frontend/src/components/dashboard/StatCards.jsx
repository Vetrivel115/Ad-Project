import React from 'react';
import './dashboard.css';

function StatCard({ vehicles = [] }) {
    const stats = [
        {
            label: 'Total Fleet',
            value: vehicles.length,
            color: '#2563eb'
        },
        {
            label: 'On Trip',
            value: vehicles.filter(
                (vehicle) => vehicle.status === 'ON_TRIP'
            ).length,
            color: '#10b981'
        },
        {
            label: 'Maintenance',
            value: vehicles.filter(
                (vehicle) => vehicle.status === 'UNDER_MAINTENANCE'
            ).length,
            color: '#f59e0b'
        },
        {
            label: 'Available',
            value: vehicles.filter(
                (vehicle) => vehicle.status === 'AVAILABLE'
            ).length,
            color: '#16a34a'
        }
    ];

    return (
        <div className="stat-cards">
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className="stat-card"
                    style={{
                        borderLeft: `5px solid ${stat.color}`
                    }}
                >
                    <span className="stat-label">
                        {stat.label}
                    </span>

                    <span className="stat-value">
                        {stat.value}
                    </span>
                </div>
            ))}
        </div>
    );
}

export default StatCard;