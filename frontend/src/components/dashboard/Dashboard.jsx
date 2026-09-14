import React, {
    useEffect,
    useMemo,
    useState
} from 'react';

import monitoringService from '../../services/monitoringService';

import api from '../../services/api';

import LiveFleet from './LiveFleet';

import './dashboard.css';


function Dashboard() {

    const [fleet, setFleet] =
        useState([]);

    const [drivers, setDrivers] =
        useState([]);

    const [loading, setLoading] =
        useState(true);


    useEffect(() => {

        let mounted = true;

        const fetchDashboardData =
            async () => {

                try {

                    const [
                        fleetResponse,
                        driversResponse
                    ] = await Promise.all([

                        monitoringService
                            .getLiveFleet(),

                        api.get('/users/drivers')

                    ]);

                    if (!mounted) {
                        return;
                    }

                    const fleetData =
                        fleetResponse?.data ||
                        fleetResponse ||
                        [];

                    const driverData =
                        driversResponse?.data?.content ||
                        driversResponse?.data ||
                        [];

                    setFleet(
                        Array.isArray(fleetData)
                            ? fleetData
                            : []
                    );

                    setDrivers(
                        Array.isArray(driverData)
                            ? driverData
                            : []
                    );

                } catch (error) {

                    console.error(
                        'Error loading dashboard:',
                        error
                    );

                } finally {

                    if (mounted) {

                        setLoading(false);

                    }

                }

            };

        fetchDashboardData();

        return () => {

            mounted = false;

        };

    }, []);


    const normalizeStatus =
        (status) => {

            return String(status || '')
                .toUpperCase()
                .replace(/-/g, '_')
                .replace(/ /g, '_');

        };


    const totalVehicles =
        fleet.length;

    const availableVehicles =
        fleet.filter((vehicle) => {

            const status =
                normalizeStatus(vehicle.status);

            return (
                status === 'AVAILABLE' ||
                status === 'IDLE'
            );

        }).length;

    const onTripVehicles =
        fleet.filter((vehicle) => {

            const status =
                normalizeStatus(vehicle.status);

            return (
                status === 'ON_TRIP' ||
                status === 'IN_TRANSIT'
            );

        }).length;

    const maintenanceVehicles =
        fleet.filter((vehicle) => {

            const status =
                normalizeStatus(vehicle.status);

            return (
                status === 'UNDER_MAINTENANCE' ||
                status === 'MAINTENANCE'
            );

        }).length;


    const driverStats = useMemo(() => {

        const stats = {
            available: 0,
            onTrip: 0,
            offDuty: 0,
            unknown: 0
        };

        drivers.forEach((driver) => {

            const status =
                normalizeStatus(driver.status);

            if (status === 'AVAILABLE') {
                stats.available += 1;
            } else if (status === 'ON_TRIP') {
                stats.onTrip += 1;
            } else if (status === 'OFF_DUTY') {
                stats.offDuty += 1;
            } else {
                stats.unknown += 1;
            }

        });

        return stats;

    }, [drivers]);


    const alerts = useMemo(() => {

        const result = [];

        fleet.forEach((vehicle) => {

            const status =
                normalizeStatus(vehicle.status);

            const fuelLevel =
                Number(vehicle.fuelLevel);

            const speed =
                Number(vehicle.speed);

            const vehicleName =
                vehicle.licensePlate ||
                vehicle.model ||
                `Vehicle #${vehicle.vehicleId || vehicle.id || ''}`;

            if (
                status === 'UNDER_MAINTENANCE' ||
                status === 'MAINTENANCE'
            ) {

                result.push({
                    type: 'danger',
                    title: 'Maintenance required',
                    detail: vehicleName
                });

            }

            if (
                !Number.isNaN(fuelLevel) &&
                fuelLevel > 0 &&
                fuelLevel <= 20
            ) {

                result.push({
                    type: 'warning',
                    title: 'Low fuel',
                    detail: `${vehicleName} • ${fuelLevel}% remaining`
                });

            }

            if (
                !Number.isNaN(speed) &&
                speed > 100
            ) {

                result.push({
                    type: 'info',
                    title: 'Speed alert',
                    detail: `${vehicleName} • ${speed.toFixed(1)} km/h`
                });

            }

        });

        return result.slice(0, 5);

    }, [fleet]);


    const getPercentage =
        (value) => {

            if (totalVehicles === 0) {
                return 0;
            }

            return (
                value / totalVehicles
            ) * 100;

        };

    const availablePercentage =
        getPercentage(availableVehicles);

    const tripPercentage =
        getPercentage(onTripVehicles);

    const maintenancePercentage =
        getPercentage(maintenanceVehicles);

    const radius = 70;

    const circumference =
        2 * Math.PI * radius;

    const availableDash =
        (availablePercentage / 100) * circumference;

    const tripDash =
        (tripPercentage / 100) * circumference;

    const maintenanceDash =
        (maintenancePercentage / 100) * circumference;


    if (loading) {

        return (

            <div className="page-loading">
                Loading Fleet Dashboard...
            </div>

        );

    }


    return (

        <div>

            <div className="dashboard-header">

                <div>

                    <span className="dashboard-eyebrow">
                        FLEET OPERATIONS
                    </span>

                    <h1>
                        Dashboard
                    </h1>

                    <p>
                        Monitor and manage your
                        fleet operations in one place.
                    </p>

                </div>

            </div>


            <div className="stat-cards">

                <div className="stat-card">
                    <span className="stat-icon">🚚</span>
                    <span className="stat-label">
                        Total Vehicles
                    </span>
                    <span className="stat-value">
                        {totalVehicles}
                    </span>
                </div>

                <div className="stat-card">
                    <span className="stat-icon">✓</span>
                    <span className="stat-label">
                        Available Vehicles
                    </span>
                    <span className="stat-value">
                        {availableVehicles}
                    </span>
                </div>

                <div className="stat-card">
                    <span className="stat-icon">↗</span>
                    <span className="stat-label">
                        Vehicles On Trip
                    </span>
                    <span className="stat-value">
                        {onTripVehicles}
                    </span>
                </div>

                <div className="stat-card">
                    <span className="stat-icon">🔧</span>
                    <span className="stat-label">
                        Under Maintenance
                    </span>
                    <span className="stat-value">
                        {maintenanceVehicles}
                    </span>
                </div>

            </div>


            <div className="dashboard-grid top-grid">

                <div className="status-donut-container">

                    <div className="section-heading">
                        <div>
                            <h2>Fleet Status Overview</h2>
                            <p>
                                Current vehicle distribution
                            </p>
                        </div>
                    </div>

                    <div className="donut-content">

                        <svg
                            className="status-donut"
                            width="220"
                            height="220"
                            viewBox="0 0 180 180"
                        >

                            <circle
                                cx="90"
                                cy="90"
                                r={radius}
                                fill="transparent"
                                stroke="#1f2937"
                                strokeWidth="18"
                            />

                            <circle
                                cx="90"
                                cy="90"
                                r={radius}
                                fill="transparent"
                                stroke="#10b981"
                                strokeWidth="18"
                                strokeDasharray={
                                    `${availableDash} ${circumference}`
                                }
                                strokeLinecap="round"
                            />

                            <circle
                                cx="90"
                                cy="90"
                                r={radius}
                                fill="transparent"
                                stroke="#2563eb"
                                strokeWidth="18"
                                strokeDasharray={
                                    `${tripDash} ${circumference}`
                                }
                                strokeDashoffset={
                                    -availableDash
                                }
                                strokeLinecap="round"
                            />

                            <circle
                                cx="90"
                                cy="90"
                                r={radius}
                                fill="transparent"
                                stroke="#f59e0b"
                                strokeWidth="18"
                                strokeDasharray={
                                    `${maintenanceDash} ${circumference}`
                                }
                                strokeDashoffset={
                                    -(availableDash + tripDash)
                                }
                                strokeLinecap="round"
                            />

                            <text
                                x="90"
                                y="84"
                                textAnchor="middle"
                                fontSize="30"
                                fontWeight="700"
                                fill="#f8fafc"
                            >
                                {totalVehicles}
                            </text>

                            <text
                                x="90"
                                y="108"
                                textAnchor="middle"
                                fontSize="12"
                                fill="#94a3b8"
                            >
                                Vehicles
                            </text>

                        </svg>

                        <div className="donut-legend">

                            <div className="legend-item">
                                <span className="dot available" />
                                <span>
                                    Available:
                                    {' '}
                                    <strong>
                                        {availableVehicles}
                                    </strong>
                                </span>
                            </div>

                            <div className="legend-item">
                                <span className="dot on-trip" />
                                <span>
                                    On Trip:
                                    {' '}
                                    <strong>
                                        {onTripVehicles}
                                    </strong>
                                </span>
                            </div>

                            <div className="legend-item">
                                <span className="dot maintenance" />
                                <span>
                                    Maintenance:
                                    {' '}
                                    <strong>
                                        {maintenanceVehicles}
                                    </strong>
                                </span>
                            </div>

                        </div>

                    </div>

                </div>


                <div className="driver-status-card">

                    <div className="section-heading">
                        <div>
                            <h2>Driver Availability</h2>
                            <p>
                                Current driver workforce
                            </p>
                        </div>

                        <span className="section-count">
                            {drivers.length} total
                        </span>
                    </div>

                    <div className="driver-status-list">

                        <div className="driver-status-item">
                            <div className="driver-status-label">
                                <span className="status-dot available-dot" />
                                Available
                            </div>
                            <strong>
                                {driverStats.available}
                            </strong>
                        </div>

                        <div className="driver-status-item">
                            <div className="driver-status-label">
                                <span className="status-dot trip-dot" />
                                On Trip
                            </div>
                            <strong>
                                {driverStats.onTrip}
                            </strong>
                        </div>

                        <div className="driver-status-item">
                            <div className="driver-status-label">
                                <span className="status-dot off-duty-dot" />
                                Off Duty
                            </div>
                            <strong>
                                {driverStats.offDuty}
                            </strong>
                        </div>

                        {driverStats.unknown > 0 && (
                            <div className="driver-status-item">
                                <div className="driver-status-label">
                                    <span className="status-dot unknown-dot" />
                                    Not Available
                                </div>
                                <strong>
                                    {driverStats.unknown}
                                </strong>
                            </div>
                        )}

                    </div>

                    <div className="driver-status-summary">

                        <span>
                            Ready for dispatch
                        </span>

                        <strong>
                            {driverStats.available}
                        </strong>

                    </div>

                </div>

            </div>


            <div className="dashboard-grid lower-grid">

                <div className="alerts-card">

                    <div className="section-heading">
                        <div>
                            <h2>Active Alerts</h2>
                            <p>
                                Items that may need attention
                            </p>
                        </div>

                        <span className="alert-count">
                            {alerts.length}
                        </span>
                    </div>

                    <div className="alerts-list">

                        {alerts.length === 0 ? (

                            <div className="empty-dashboard-state">
                                <span>✓</span>
                                <div>
                                    <strong>
                                        No active alerts
                                    </strong>
                                    <p>
                                        Fleet operations look healthy.
                                    </p>
                                </div>
                            </div>

                        ) : (

                            alerts.map((alert, index) => (

                                <div
                                    className="alert-item"
                                    key={`${alert.title}-${index}`}
                                >

                                    <span
                                        className={`alert-icon ${alert.type}`}
                                    >
                                        {alert.type === 'danger'
                                            ? '!' 
                                            : alert.type === 'warning'
                                                ? '⚠'
                                                : '↗'}
                                    </span>

                                    <div>
                                        <strong>
                                            {alert.title}
                                        </strong>
                                        <p>
                                            {alert.detail}
                                        </p>
                                    </div>

                                </div>

                            ))

                        )}

                    </div>

                </div>

                <div className="fleet-health-card">

                    <div className="section-heading">
                        <div>
                            <h2>Fleet Health</h2>
                            <p>
                                Quick operational snapshot
                            </p>
                        </div>
                    </div>

                    <div className="health-item">
                        <div>
                            <span>
                                Vehicle Availability
                            </span>
                            <strong>
                                {totalVehicles > 0
                                    ? `${Math.round(
                                          availablePercentage
                                      )}%`
                                    : '0%'}
                            </strong>
                        </div>
                        <div className="health-bar">
                            <div
                                className="health-bar-fill available-fill"
                                style={{
                                    width: `${Math.min(
                                        availablePercentage,
                                        100
                                    )}%`
                                }}
                            />
                        </div>
                    </div>

                    <div className="health-item">
                        <div>
                            <span>
                                Vehicles On Trip
                            </span>
                            <strong>
                                {totalVehicles > 0
                                    ? `${Math.round(
                                          tripPercentage
                                      )}%`
                                    : '0%'}
                            </strong>
                        </div>
                        <div className="health-bar">
                            <div
                                className="health-bar-fill trip-fill"
                                style={{
                                    width: `${Math.min(
                                        tripPercentage,
                                        100
                                    )}%`
                                }}
                            />
                        </div>
                    </div>

                    <div className="health-item">
                        <div>
                            <span>
                                Maintenance Load
                            </span>
                            <strong>
                                {totalVehicles > 0
                                    ? `${Math.round(
                                          maintenancePercentage
                                      )}%`
                                    : '0%'}
                            </strong>
                        </div>
                        <div className="health-bar">
                            <div
                                className="health-bar-fill maintenance-fill"
                                style={{
                                    width: `${Math.min(
                                        maintenancePercentage,
                                        100
                                    )}%`
                                }}
                            />
                        </div>
                    </div>

                </div>

            </div>


            <LiveFleet />

        </div>

    );

}


export default Dashboard;
