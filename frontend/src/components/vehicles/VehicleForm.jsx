import React, {
    useEffect,
    useState
} from 'react';

import vehicleService
    from '../../services/vehicleService';


function VehicleForm({
    vehicle = null,
    onClose = () => {}
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


    /*
     * When editing an existing vehicle,
     * populate the form with its data.
     */
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

    }, [vehicle]);


    /*
     * Handle input changes.
     */
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


    /*
     * Submit the vehicle form.
     */
    const handleSubmit = async (event) => {

        event.preventDefault();

        setError('');

        setLoading(true);


        try {

            /*
             * Convert mileage to a number.
             */
            const vehicleData = {

                ...formData,

                currentMileage:
                    Number(
                        formData.currentMileage
                    )

            };


            /*
             * EDIT VEHICLE
             */
            if (vehicle?.id) {

                await vehicleService.update(
                    vehicle.id,
                    vehicleData
                );

            }

            /*
             * CREATE VEHICLE
             */
            else {

                await vehicleService.create(
                    vehicleData
                );

            }


            /*
             * Close the modal.
             * VehicleList will reload vehicles.
             */
            onClose();

        }

        catch (requestError) {

            console.error(
                'Vehicle save error:',
                requestError
            );


            setError(

                requestError.response?.data?.message ||

                requestError.response?.data ||

                requestError.message ||

                'Error saving vehicle'

            );

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
            ></div>


            <form
                className="vehicle-form-card"
                onSubmit={handleSubmit}
            >


                {/* HEADER */}

                <div
                    className="vehicle-form-header"
                >

                    <div>

                        <h2>

                            {vehicle
                                ? 'Edit Vehicle'
                                : 'Register New Vehicle'}

                        </h2>


                        <p>

                            {vehicle
                                ? 'Update vehicle information'
                                : 'Add a new vehicle to your fleet'}

                        </p>

                    </div>


                    <button
                        type="button"
                        className="form-close-button"
                        onClick={onClose}
                    >

                        ✕

                    </button>

                </div>



                {/* ERROR */}

                {error && (

                    <div
                        className="error-message"
                    >

                        ⚠ {error}

                    </div>

                )}



                {/* VIN */}

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
                        maxLength="17"
                        required
                        value={formData.vin}
                        onChange={handleChange}
                    />

                </div>



                {/* LICENSE PLATE */}

                <div
                    className="form-group"
                >

                    <label>

                        License Plate

                    </label>


                    <input
                        type="text"
                        name="licensePlate"
                        placeholder="TN-01-AB-1234"
                        required
                        value={
                            formData.licensePlate
                        }
                        onChange={handleChange}
                    />

                </div>



                {/* MODEL */}

                <div
                    className="form-group"
                >

                    <label>

                        Vehicle Model

                    </label>


                    <input
                        type="text"
                        name="model"
                        placeholder="e.g. Volvo FH 16"
                        required
                        value={
                            formData.model
                        }
                        onChange={handleChange}
                    />

                </div>



                {/* STATUS */}

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
                        onChange={handleChange}
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



                {/* MILEAGE */}

                <div
                    className="form-group"
                >

                    <label>

                        Current Mileage (km)

                    </label>


                    <input
                        type="number"
                        name="currentMileage"
                        placeholder="e.g. 25000"
                        min="0"
                        required
                        value={
                            formData.currentMileage
                        }
                        onChange={handleChange}
                    />

                </div>



                {/* ACTIONS */}

                <div
                    className="vehicle-form-actions"
                >

                    <button
                        type="button"
                        className="cancel-button"
                        onClick={onClose}
                        disabled={loading}
                    >

                        Cancel

                    </button>


                    <button
                        type="submit"
                        className="submit-button"
                        disabled={loading}
                    >

                        {loading
                            ? 'Saving...'
                            : vehicle
                                ? 'Update Vehicle'
                                : 'Register Vehicle'}

                    </button>

                </div>


            </form>

        </div>

    );

}


export default VehicleForm;