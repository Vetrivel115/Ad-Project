import React, {
    useEffect,
    useState
} from 'react';

import {
    useDispatch
} from 'react-redux';

import vehicleService from '../../services/vehicleService';

import {
    fetchVehicles
} from '../../store/slices/vehicleSlice';

function VehicleForm({
    vehicle = null,
    onClose = () => {},
    editMode = false,
    vehicleId = null
}) {
    const dispatch = useDispatch();

    const [formData, setFormData] =
        useState({
            vin: '',
            licensePlate: '',
            model: '',
            status: 'AVAILABLE',
            currentMileage: ''
        });

    const [message, setMessage] =
        useState('');

    const [error, setError] =
        useState('');

    useEffect(() => {
        if (vehicle) {
            setFormData({
                vin: vehicle.vin || '',
                licensePlate:
                    vehicle.licensePlate || '',
                model:
                    vehicle.model || '',
                status:
                    vehicle.status || 'AVAILABLE',
                currentMileage:
                    vehicle.currentMileage || ''
            });

            return;
        }

        if (vehicleId) {
            vehicleService
                .getById(vehicleId)
                .then((data) => {
                    setFormData({
                        vin: data.vin || '',
                        licensePlate:
                            data.licensePlate || '',
                        model:
                            data.model || '',
                        status:
                            data.status ||
                            'AVAILABLE',
                        currentMileage:
                            data.currentMileage || ''
                    });
                })
                .catch(() => {
                    setError(
                        'Error loading vehicle'
                    );
                });
        }
    }, [vehicle, vehicleId]);

    const handleChange = (event) => {
        const {
            name,
            value
        } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setMessage('');
        setError('');

        try {
            let response;

            const shouldUpdate =
                Boolean(vehicle) ||
                Boolean(editMode && vehicleId);

            if (shouldUpdate) {
                const id =
                    vehicle?.id || vehicleId;

                response =
                    await vehicleService.update(
                        id,
                        formData
                    );
            } else {
                response =
                    await vehicleService.create(
                        formData
                    );
            }

            if (
                typeof response === 'string'
            ) {
                setMessage(response);
            } else if (
                response?.message
            ) {
                setMessage(
                    response.message
                );
            } else {
                setMessage(
                    shouldUpdate
                        ? 'Vehicle updated successfully'
                        : 'Vehicle created successfully'
                );
            }

            dispatch(
                fetchVehicles({
                    page: 0,
                    size: 10
                })
            );

            onClose();

        } catch (requestError) {

            if (
                requestError.response?.status === 409
            ) {
                setError(
                    requestError.response?.data
                        ?.message ||
                    'VIN already exists'
                );

                return;
            }

            setError(
                requestError.response?.data
                    ?.message ||
                requestError.message ||
                'Error saving vehicle'
            );
        }
    };

    const isVehiclePropEdit =
        Boolean(vehicle);

    return (
        <div className="vehicle-form-modal">

            <form onSubmit={handleSubmit}>

                <h2>
                    {isVehiclePropEdit
                        ? 'Edit Vehicle'
                        : 'Register New Vehicle'}
                </h2>

                {message && (
                    <div className="success-message">
                        {message}
                    </div>
                )}

                {error && (
                    <div
                        className="error-message"
                        style={{
                            color: 'red'
                        }}
                    >
                        {error}
                    </div>
                )}

                <input
                    name="vin"
                    placeholder="17-character VIN"
                    maxLength="17"
                    required
                    value={formData.vin}
                    onChange={handleChange}
                />

                <input
                    name="licensePlate"
                    type="text"
                    placeholder="ABC-1234"
                    required
                    value={
                        formData.licensePlate
                    }
                    onChange={handleChange}
                />

                <input
                    name="model"
                    placeholder="e.g. Volvo FH 16"
                    required
                    value={formData.model}
                    onChange={handleChange}
                />

                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                >
                    <option value="AVAILABLE">
                        AVAILABLE
                    </option>

                    <option value="ON_TRIP">
                        ON_TRIP
                    </option>

                    <option value="UNDER_MAINTENANCE">
                        UNDER_MAINTENANCE
                    </option>
                </select>

                <input
                    name="currentMileage"
                    type="number"
                    value={
                        formData.currentMileage
                    }
                    onChange={handleChange}
                />

                <button type="submit">

                    {isVehiclePropEdit
                        ? 'Update Vehicle'
                        : 'Register Vehicle'}

                </button>

                <button
                    type="button"
                    onClick={onClose}
                >
                    Cancel
                </button>

            </form>

        </div>
    );
}

export default VehicleForm;