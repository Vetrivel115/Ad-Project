import React, {
    useEffect,
    useState
} from 'react';

import vehicleService
    from '../../services/vehicleService';

import './VehicleForm.css';


function VehicleForm({
    vehicle = null,
    onClose = () => {},
    onSuccess = () => {}
}) {

    const [formData, setFormData] =
        useState({
            vin: '',
            licensePlate: '',
            model: '',
            status: 'AVAILABLE',
            currentMileage: ''
        });


    const [error, setError] =
        useState('');


    const [loading, setLoading] =
        useState(false);


    useEffect(() => {

        if (vehicle) {

            setFormData({
                vin:
                    vehicle.vin || '',

                licensePlate:
                    vehicle.licensePlate || '',

                model:
                    vehicle.model || '',

                status:
                    vehicle.status ||
                    'AVAILABLE',

                currentMileage:
                    vehicle.currentMileage ??
                    ''
            });

        }

        else {

            setFormData({
                vin: '',
                licensePlate: '',
                model: '',
                status: 'AVAILABLE',
                currentMileage: ''
            });

        }

    }, [vehicle]);


    const handleChange = (
        event
    ) => {

        const {
            name,
            value
        } = event.target;


        setFormData(
            (previous) => ({

                ...previous,

                [name]: value

            })
        );

    };


    const handleSubmit = async (
        event
    ) => {

        event.preventDefault();

        setError('');

        setLoading(true);


        try {

            const vehicleData = {

                ...formData,

                currentMileage:
                    Number(
                        formData.currentMileage
                    )

            };


            let response;


            if (vehicle?.id) {

                response =
                    await vehicleService.update(
                        vehicle.id,
                        vehicleData
                    );

            }

            else {

                response =
                    await vehicleService.create(
                        vehicleData
                    );

            }


            /*
             * Pass exact backend
             * success response.
             */
            onSuccess(
                response
            );


            onClose();

        }

        catch (
            requestError
        ) {

            const errorData =
                requestError.response?.data;


            if (
                typeof errorData ===
                'string'
            ) {

                setError(
                    errorData
                );

            }

            else {

                setError(

                    errorData?.message ||

                    requestError.message ||

                    'Error saving vehicle'

                );

            }

        }

        finally {

            setLoading(false);

        }

    };


    return (

        <div
            className="vehicle-form-modal"
        >


            <div
                className="vehicle-form-overlay"
                onClick={onClose}
            />


            <form
                className="vehicle-form-card"
                onSubmit={handleSubmit}
            >


                <div
                    className="vehicle-form-header"
                >

                    <div>

                        <h2>

                            {
                                vehicle
                                    ? 'Edit Vehicle'
                                    : 'Register New Vehicle'
                            }

                        </h2>

                    </div>


                    <button
                        type="button"
                        onClick={onClose}
                    >
                        ✕
                    </button>

                </div>


                {error && (

                    <div
                        className="error-message"
                    >

                        {error}

                    </div>

                )}


                <div
                    className="form-group"
                >

                    <label>
                        VIN
                    </label>


                    <input
                        type="text"
                        name="vin"
                        placeholder="17-character VIN"
                        required
                        value={formData.vin}
                        onChange={handleChange}
                    />

                </div>


                <div
                    className="form-group"
                >

                    <label>
                        License Plate
                    </label>


                    <input
                        type="text"
                        name="licensePlate"
                        placeholder="ABC-1234"
                        required
                        value={
                            formData.licensePlate
                        }
                        onChange={
                            handleChange
                        }
                    />

                </div>


                <div
                    className="form-group"
                >

                    <label>
                        Vehicle Model
                    </label>


                    <input
                        type="text"
                        name="model"
                        required
                        value={
                            formData.model
                        }
                        onChange={
                            handleChange
                        }
                    />

                </div>


                <div
                    className="form-group"
                >

                    <label>
                        Status
                    </label>


                    <select
                        name="status"
                        value={
                            formData.status
                        }
                        onChange={
                            handleChange
                        }
                    >

                        <option
                            value="AVAILABLE"
                        >
                            AVAILABLE
                        </option>


                        <option
                            value="ON_TRIP"
                        >
                            ON TRIP
                        </option>


                        <option
                            value="UNDER_MAINTENANCE"
                        >
                            UNDER MAINTENANCE
                        </option>

                    </select>

                </div>


                <div
                    className="form-group"
                >

                    <label>
                        Current Mileage (km)
                    </label>


                    <input
                        type="number"
                        name="currentMileage"
                        min="0"
                        required
                        value={
                            formData.currentMileage
                        }
                        onChange={
                            handleChange
                        }
                    />

                </div>


                <div
                    className="vehicle-form-actions"
                >

                    <button
                        type="button"
                        onClick={onClose}
                    >
                        Cancel
                    </button>


                    <button
                        type="submit"
                        disabled={loading}
                    >

                        {
                            loading
                                ? 'Saving...'
                                : vehicle
                                    ? 'Update Vehicle'
                                    : 'Register Vehicle'
                        }

                    </button>

                </div>

            </form>

        </div>

    );

}


export default VehicleForm;