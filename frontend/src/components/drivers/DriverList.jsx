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

    const formatStatus = (status) => {

        if (!status) {
            return 'UNKNOWN';
        }

        return status.replace('_', ' ');
    };

    if (loading) {
        return (
            <div className="drivers-container">
                <div className="drivers-loading">
                    Loading Drivers...
                </div>
            </div>
        );
    }

    return (
        <div className="drivers-container">

            {/* PAGE HEADER */}
            <div className="page-header">

                <h1>Driver Management</h1>

            </div>

            {/* DRIVER TABLE */}
            {drivers.length === 0 ? (

                <div className="no-drivers">
                    <div>👨‍✈️</div>

                    <h3>
                        No Drivers Found
                    </h3>

                    <p>
                        No drivers are currently
                        registered in the system.
                    </p>
                </div>

            ) : (

                <table className="drivers-table">

                    <thead>
                        <tr>
                            <th>Driver</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>

                        {drivers.map((driver) => (

                            <tr key={driver.id}>

                                <td>
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
                                                ID #{driver.id}
                                            </small>

                                        </div>

                                    </div>
                                </td>

                                <td>
                                    <span className="driver-email">
                                        {driver.email || '--'}
                                    </span>
                                </td>

                                <td>

                                    <span className="role-badge">
                                        {driver.role || 'DRIVER'}
                                    </span>

                                </td>

                                <td>

                                    <span
                                        className={`status-badge status-${(
                                            driver.status ||
                                            'UNKNOWN'
                                        ).toLowerCase()}`}
                                    >
                                        {formatStatus(driver.status)}
                                    </span>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            )}

        </div>
    );
}

export default DriverList;