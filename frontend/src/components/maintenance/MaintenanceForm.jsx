import React, {
    useEffect,
    useState
} from 'react';

import vehicleService from '../../services/vehicleService';
import userService from '../../services/userService';
import maintenanceService from '../../services/maintenanceService';

import './maintenance.css';

function MaintenanceForm({
    onClose,
    onRefresh
}) {
    const [vehicles, setVehicles] = useState([]);
    const [technicians, setTechnicians] =
        useState([]);

    const [vehicleId, setVehicleId] =
        useState('');

    const [technicianId, setTechnicianId] =
        useState('');

    const [serviceDate, setServiceDate] =
        useState(
            new Date()
                .toISOString()
                .split('T')[0]
        );

    const [description, setDescription] =
        useState('');

    const [cost, setCost] =
        useState('');

    const [loading, setLoading] =
        useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [
                    vehicleResponse,
                    technicianResponse
                ] = await Promise.all([
                    vehicleService.getAll(0, 100),
                    userService.getTechnicians()
                ]);

                const vehicleData =
                    vehicleResponse?.data ||
                    vehicleResponse;

                const technicianData =
                    technicianResponse?.data ||
                    technicianResponse;

                setVehicles(
                    vehicleData?.content ||
                        vehicleData ||
                        []
                );

                setTechnicians(
                    Array.isArray(technicianData)
                        ? technicianData
                        : technicianData?.content || []
                );
            } catch (error) {
                console.error(
                    'Error loading form data:',
                    error
                );
            }
        };

        loadData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);

        try {
            await maintenanceService.log({
                vehicle: {
                    id: Number(vehicleId)
                },

                systemUser: {
                    id: parseInt(technicianId)
                },

                serviceDate,
                description,
                cost: parseFloat(cost)
            });

            if (onRefresh) {
                onRefresh();
            }

            if (onClose) {
                onClose();
            }
        } catch (error) {
            alert(
                'Error logging maintenance: ' +
                    (
                        error.response?.data?.message ||
                        error.message
                    )
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>Log Maintenance</h2>

                    <button
                        type="button"
                        className="close-button"
                        onClick={onClose}
                    >
                        ×
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>
                            Vehicle
                        </label>

                        <select
                            value={vehicleId}
                            onChange={(event) =>
                                setVehicleId(
                                    event.target.value
                                )
                            }
                            required
                        >
                            <option value="">
                                Select Vehicle
                            </option>

                            {vehicles.map(
                                (vehicle) => (
                                    <option
                                        key={vehicle.id}
                                        value={vehicle.id}
                                    >
                                        {vehicle.licensePlate}{' '}
                                        ({vehicle.model})
                                    </option>
                                )
                            )}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>
                            Technician
                        </label>

                        <select
                            value={technicianId}
                            onChange={(event) =>
                                setTechnicianId(
                                    event.target.value
                                )
                            }
                            required
                        >
                            <option value="">
                                Select Technician
                            </option>

                            {technicians.map(
                                (technician) => (
                                    <option
                                        key={technician.id}
                                        value={technician.id}
                                    >
                                        {
                                            technician.username
                                        }
                                    </option>
                                )
                            )}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>
                            Service Date
                        </label>

                        <input
                            type="date"
                            value={serviceDate}
                            onChange={(event) =>
                                setServiceDate(
                                    event.target.value
                                )
                            }
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            Description
                        </label>

                        <textarea
                            placeholder="What was fixed?"
                            value={description}
                            onChange={(event) =>
                                setDescription(
                                    event.target.value
                                )
                            }
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>
                            Cost
                        </label>

                        <input
                            type="number"
                            step="0.01"
                            value={cost}
                            onChange={(event) =>
                                setCost(
                                    event.target.value
                                )
                            }
                            required
                        />
                    </div>

                    <div className="modal-actions">
                        <button
                            type="button"
                            className="secondary-button"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="primary-button"
                            disabled={loading}
                        >
                            {loading
                                ? 'Saving...'
                                : 'Save Record'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default MaintenanceForm;