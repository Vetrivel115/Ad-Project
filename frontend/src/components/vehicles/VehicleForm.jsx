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


    const [success, setSuccess] =
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
                    vehicle.status || 'AVAILABLE',

                currentMileage:
                    vehicle.currentMileage ?? ''

            });

        } else {

            setFormData({

                vin: '',

                licensePlate: '',

                model: '',

                status: 'AVAILABLE',

                currentMileage: ''

            });

        }

        setError('');

        setSuccess('');

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

        setSuccess('');

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

            } else {

                response =
                    await vehicleService.create(
                        vehicleData
                    );

            }


            /*
             * Display exact backend
             * confirmation response.
             */

            const successMessage =

                typeof response === 'string'

                    ? response

                    : response?.message ||
                      (
                          vehicle
                              ? 'Vehicle updated successfully.'
                              : 'Vehicle created successfully.'
                      );


            setSuccess(
                successMessage
            );


            onSuccess(
                successMessage
            );

        }

        catch (requestError) {

            console.error(
                'Vehicle save error:',
                requestError
            );


            const errorData =
                requestError.response?.data;


            if (
                typeof errorData ===
                'string'
            ) {

                setError(
                    errorData
                );

            } else {

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
            className="
                vehicle-form-modal
            "
        >


            <div
                className="
                    vehicle-form-overlay
                "
                onClick={
                    loading
                        ? undefined
                        : onClose
                }
            ></div>


            <form
                className="
                    vehicle-form-card
                "
                onSubmit={
                    handleSubmit
                }
            >


                <div
                    className="
                        vehicle-form-header
                    "
                >

                    <div>

                        <h2>

                            {
                                vehicle
                                    ? 'Edit Vehicle'
                                    : 'Register New Vehicle'
                            }

                        </h2>


                        <p>

                            {
                                vehicle
                                    ? 'Update vehicle information'
                                    : 'Add a new vehicle to your fleet'
                            }

                        </p>

                    </div>


                    <button
                        type="button"
                        className="
                            form-close-button
                        "
                        onClick={
                            onClose
                        }
                        disabled={
                            loading
                        }
                    >
                        ✕
                    </button>

                </div>


                {error && (

                    <div
                        className="
                            error-message
                        "
                        role="alert"
                    >

                        ⚠ {error}

                    </div>

                )}


                {success && (

                    <div
                        className="
                            success-message
                        "
                        role="alert"
                    >

                        {success}

                    </div>

                )}


                <div
                    className="
                        form-group
                    "
                >

                    <label
                        htmlFor="vin"
                    >
                        VIN
                    </label>


                    <input
                        id="vin"
                        type="text"
                        name="vin"
                        placeholder="
                            17-character VIN
                        "
                        maxLength="17"
                        required
                        value={
                            formData.vin
                        }
                        onChange={
                            handleChange
                        }
                        disabled={
                            loading
                        }
                    />

                </div>


                <div
                    className="
                        form-group
                    "
                >

                    <label
                        htmlFor="
                            licensePlate
                        "
                    >
                        License Plate
                    </label>


                    <input
                        id="licensePlate"
                        type="text"
                        name="
                            licensePlate
                        "
                        placeholder="
                            TN-01-AB-1234
                        "
                        required
                        value={
                            formData.licensePlate
                        }
                        onChange={
                            handleChange
                        }
                        disabled={
                            loading
                        }
                    />

                </div>


                <div
                    className="
                        form-group
                    "
                >

                    <label
                        htmlFor="model"
                    >
                        Vehicle Model
                    </label>


                    <input
                        id="model"
                        type="text"
                        name="model"
                        placeholder="
                            e.g. Volvo FH 16
                        "
                        required
                        value={
                            formData.model
                        }
                        onChange={
                            handleChange
                        }
                        disabled={
                            loading
                        }
                    />

                </div>


                <div
                    className="
                        form-group
                    "
                >

                    <label
                        htmlFor="status"
                    >
                        Status
                    </label>


                    <select
                        id="status"
                        name="status"
                        value={
                            formData.status
                        }
                        onChange={
                            handleChange
                        }
                        disabled={
                            loading
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
                            value="
                                UNDER_MAINTENANCE
                            "
                        >
                            UNDER MAINTENANCE
                        </option>

                    </select>

                </div>


                <div
                    className="
                        form-group
                    "
                >

                    <label
                        htmlFor="
                            currentMileage
                        "
                    >
                        Current Mileage (km)
                    </label>


                    <input
                        id="
                            currentMileage
                        "
                        type="number"
                        name="
                            currentMileage
                        "
                        placeholder="
                            e.g. 25000
                        "
                        min="0"
                        required
                        value={
                            formData.currentMileage
                        }
                        onChange={
                            handleChange
                        }
                        disabled={
                            loading
                        }
                    />

                </div>


                <div
                    className="
                        vehicle-form-actions
                    "
                >

                    <button
                        type="button"
                        className="
                            cancel-button
                        "
                        onClick={
                            onClose
                        }
                        disabled={
                            loading
                        }
                    >
                        Cancel
                    </button>


                    <button
                        type="submit"
                        className="
                            submit-button
                        "
                        disabled={
                            loading
                        }
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