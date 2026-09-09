import React, {
    useEffect,
    useState
} from 'react';

import monitoringService from '../../services/monitoringService';

import LiveFleet from './LiveFleet';

import './dashboard.css';


function Dashboard() {

    const [fleet, setFleet] =
        useState([]);

    const [loading, setLoading] =
        useState(true);


    useEffect(() => {

        let mounted = true;


        const fetchDashboardData =
            async () => {

                try {

                    const response =
                        await monitoringService
                            .getLiveFleet();


                    if (!mounted) {
                        return;
                    }


                    const data =
                        response?.data ||
                        response ||
                        [];


                    setFleet(
                        Array.isArray(data)
                            ? data
                            : []
                    );

                } catch (error) {

                    console.error(
                        'Error loading dashboard:',
                        error
                    );

                } finally {

                    if (mounted) {

                        setLoading(
                            false
                        );

                    }

                }

            };


        fetchDashboardData();


        return () => {

            mounted = false;

        };

    }, []);


    if (loading) {

        return (

            <div className="page-loading">

                Loading Fleet Dashboard...

            </div>

        );

    }


    const totalVehicles =
        fleet.length;


    const normalizeStatus =
        (status) => {

            return String(
                status || ''
            )
                .toUpperCase()
                .replace(
                    /-/g,
                    '_'
                )
                .replace(
                    / /g,
                    '_'
                );

        };


    const availableVehicles =
        fleet.filter(
            (vehicle) => {

                const status =
                    normalizeStatus(
                        vehicle.status
                    );

                return (
                    status ===
                        'AVAILABLE' ||
                    status ===
                        'IDLE'
                );

            }
        ).length;


    const onTripVehicles =
        fleet.filter(
            (vehicle) => {

                const status =
                    normalizeStatus(
                        vehicle.status
                    );

                return (
                    status ===
                        'ON_TRIP' ||
                    status ===
                        'IN_TRANSIT'
                );

            }
        ).length;


    const maintenanceVehicles =
        fleet.filter(
            (vehicle) => {

                const status =
                    normalizeStatus(
                        vehicle.status
                    );

                return (
                    status ===
                        'UNDER_MAINTENANCE' ||
                    status ===
                        'MAINTENANCE'
                );

            }
        ).length;


    const getPercentage =
        (value) => {

            if (
                totalVehicles === 0
            ) {

                return 0;

            }


            return (
                value /
                totalVehicles
            ) * 100;

        };


    const availablePercentage =
        getPercentage(
            availableVehicles
        );


    const tripPercentage =
        getPercentage(
            onTripVehicles
        );


    const maintenancePercentage =
        getPercentage(
            maintenanceVehicles
        );


    const radius = 70;

    const circumference =
        2 *
        Math.PI *
        radius;


    const availableDash =
        (
            availablePercentage /
            100
        ) *
        circumference;


    const tripDash =
        (
            tripPercentage /
            100
        ) *
        circumference;


    const maintenanceDash =
        (
            maintenancePercentage /
            100
        ) *
        circumference;


    return (

        <div>

            {/* =========================
                PAGE HEADER
            ========================= */}

            <div className="dashboard-header">

                <div>

                    <h1>
                        FleetFocus Dashboard
                    </h1>

                    <p>
                        Monitor and manage your
                        fleet operations in one place.
                    </p>

                </div>

            </div>



            {/* =========================
                STATISTICS CARDS
            ========================= */}

            <div className="stat-cards">


                <div className="stat-card">

                    <span className="stat-label">
                        Total Vehicles
                    </span>

                    <span className="stat-value">
                        {totalVehicles}
                    </span>

                </div>



                <div className="stat-card">

                    <span className="stat-label">
                        Available Vehicles
                    </span>

                    <span className="stat-value">
                        {availableVehicles}
                    </span>

                </div>



                <div className="stat-card">

                    <span className="stat-label">
                        Vehicles On Trip
                    </span>

                    <span className="stat-value">
                        {onTripVehicles}
                    </span>

                </div>



                <div className="stat-card">

                    <span className="stat-label">
                        Under Maintenance
                    </span>

                    <span className="stat-value">
                        {maintenanceVehicles}
                    </span>

                </div>


            </div>



            {/* =========================
                FLEET STATUS OVERVIEW
            ========================= */}

            <div className="status-donut-container">

                <h2>
                    Fleet Status Overview
                </h2>


                <div className="donut-content">


                    {/* DONUT CHART */}

                    <svg
                        className="status-donut"
                        width="220"
                        height="220"
                        viewBox="0 0 180 180"
                    >

                        {/* Background Circle */}

                        <circle
                            cx="90"
                            cy="90"
                            r={radius}
                            fill="transparent"
                            stroke="#e5e7eb"
                            strokeWidth="18"
                        />


                        {/* Available */}

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


                        {/* On Trip */}

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


                        {/* Maintenance */}

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
                                -(
                                    availableDash +
                                    tripDash
                                )
                            }
                            strokeLinecap="round"
                        />


                        {/* Center Text */}

                        <text
                            x="90"
                            y="84"
                            textAnchor="middle"
                            fontSize="30"
                            fontWeight="700"
                            fill="#1e293b"
                        >
                            {totalVehicles}
                        </text>


                        <text
                            x="90"
                            y="108"
                            textAnchor="middle"
                            fontSize="12"
                            fill="#64748b"
                        >
                            Vehicles
                        </text>

                    </svg>



                    {/* LEGEND */}

                    <div className="donut-legend">


                        <div className="legend-item">

                            <span
                                className="
                                    dot
                                    available
                                "
                            />

                            <span>
                                Available:
                                {' '}
                                <strong>
                                    {availableVehicles}
                                </strong>
                            </span>

                        </div>



                        <div className="legend-item">

                            <span
                                className="
                                    dot
                                    on-trip
                                "
                            />

                            <span>
                                On Trip:
                                {' '}
                                <strong>
                                    {onTripVehicles}
                                </strong>
                            </span>

                        </div>



                        <div className="legend-item">

                            <span
                                className="
                                    dot
                                    maintenance
                                "
                            />

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



            {/* =========================
                LIVE FLEET MONITORING
            ========================= */}

            <div
                style={{
                    marginTop: '25px'
                }}
            >

                <LiveFleet />

            </div>


        </div>

    );

}


export default Dashboard;