import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import './DriverList.css';

function DriverList() {
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDrivers();
    }, []);

    const loadDrivers = async () => {
        try {
            const response = await api.get('/users/drivers');

            const data =
                response.data?.content ||
                response.data ||
                [];

            setDrivers(
                Array.isArray(data) ? data : []
            );
        } catch (error) {
            console.error(
                'Failed to load drivers:',
                error
            );
            setDrivers([]);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="drivers-page">
                <div className="drivers-loading">
                    Loading Drivers...
                </div>
            </div>
        );
    }

    return (
        <div className="drivers-page">

            <div className="drivers-header">
                <div>
                    <span className="drivers-label">
                        FLEET MANAGEMENT
                    </span>

                    <h1>Driver Management</h1>

                    <p>
                        View and monitor registered
                        fleet drivers.
                    </p>
                </div>

                <div className="driver-count">
                    <strong>
                        {drivers.length}
                    </strong>

                    <span>
                        Total Drivers
                    </span>
                </div>
            </div>


            <div className="drivers-card">

                <div className="drivers-card-header">
                    <h2>Drivers</h2>

                    <span>
                        {drivers.length} registered
                    </span>
                </div>


                {drivers.length === 0 ? (

                    <div className="no-drivers">
                        <div>👨‍✈️</div>
                        <h3>No Drivers Found</h3>
                        <p>
                            No drivers are currently
                            registered in the system.
                        </p>
                    </div>

                ) : (

                    <div className="drivers-table">

                        <div className="drivers-table-head">
                            <span>DRIVER</span>
                            <span>EMAIL</span>
                            <span>ROLE</span>
                            <span>STATUS</span>
                        </div>

                        {drivers.map((driver) => (

                            <div
                                className="driver-row"
                                key={driver.id}
                            >

                                <div className="driver-name">

                                    <div className="driver-avatar">
                                        {(
                                            driver.username ||
                                            'D'
                                        )
                                            .charAt(0)
                                            .toUpperCase()}
                                    </div>

                                    <div>
                                        <strong>
                                            {
                                                driver.username ||
                                                'Unknown'
                                            }
                                        </strong>

                                        <small>
                                            ID #
                                            {driver.id}
                                        </small>
                                    </div>

                                </div>

                                <span className="driver-email">
                                    {driver.email || '--'}
                                </span>

                                <span>
                                    <span className="role-badge">
                                        {driver.role ||
                                            'DRIVER'}
                                    </span>
                                </span>

                                <span>
    <span
        className={`status-badge status-${(
            driver.status || 'UNKNOWN'
        ).toLowerCase()}`}
    >
        {(driver.status || 'UNKNOWN').replace('_', ' ')}
    </span>
</span>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}

export default DriverList;