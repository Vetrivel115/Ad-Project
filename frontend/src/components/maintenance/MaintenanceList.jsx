import React, {
    useCallback,
    useEffect,
    useState
} from 'react';

import { useSelector } from 'react-redux';

import maintenanceService from '../../services/maintenanceService';

import MaintenanceForm from './MaintenanceForm';

import './MaintenanceLis.css';

function MaintenanceList() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] =
        useState(true);

    const [showForm, setShowForm] =
        useState(false);

    const user = useSelector(
        (state) => state.auth.user
    );

    const fetchLogs = useCallback(
        async () => {
            try {
                setLoading(true);

                const response =
                    await maintenanceService.getAll();

                const data =
                    response?.data ||
                    response;

                setLogs(
                    Array.isArray(data)
                        ? data
                        : data?.content || []
                );
            } catch (error) {
                console.error(
                    'Error fetching maintenance logs:',
                    error
                );
            } finally {
                setLoading(false);
            }
        },
        []
    );

    useEffect(() => {
        fetchLogs();
    }, [fetchLogs]);

    const canLogMaintenance =
        user?.role === 'FLEET_MANAGER' ||
        user?.role === 'MAINTENANCE_TECH';

    if (
        loading &&
        logs.length === 0
    ) {
        return (
            <div className="page-loading">
                Loading Service Records...
            </div>
        );
    }

    return (
        <div className="maintenance-container">
            <div className="page-header">
                <h1>Maintenance Logs</h1>

                {canLogMaintenance && (
                    <button
                        className="primary-button"
                        onClick={() =>
                            setShowForm(true)
                        }
                    >
                        + Log Maintenance
                    </button>
                )}
            </div>

            <div className="table-wrapper">
                <table className="maintenance-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Vehicle</th>
                            <th>Technician</th>
                            <th>Description</th>
                            <th>Cost</th>
                        </tr>
                    </thead>

                    <tbody>
                        {logs.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="empty-row"
                                >
                                    No maintenance records found.
                                </td>
                            </tr>
                        ) : (
                            logs.map((log) => (
                                <tr key={log.id}>
                                    <td>
                                        {log.serviceDate
                                            ? new Date(
                                                  log.serviceDate
                                              ).toLocaleDateString()
                                            : '-'}
                                    </td>

                                    <td>
                                        {
                                            log.vehicle
                                                ?.licensePlate
                                        }
                                    </td>

                                    <td>
                                        {
                                            log.systemUser
                                                ?.username
                                        }
                                    </td>

                                    <td>
                                        {log.description}
                                    </td>

                                    <td className="cost-value">
                                        $
                                        {Number(
                                            log.cost || 0
                                        ).toFixed(2)}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {showForm && (
                <MaintenanceForm
                    onClose={() =>
                        setShowForm(false)
                    }
                    onRefresh={fetchLogs}
                />
            )}
        </div>
    );
}

export default MaintenanceList;