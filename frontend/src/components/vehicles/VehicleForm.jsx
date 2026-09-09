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


    /*
     * Populate form when editing.
     * Reset form when creating a new vehicle.
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
     * Submit form.
     */
    const handleSubmit = async (event) => {

        event.preventDefault();

        setError('');
        setLoading(true);

        try {

            const vehicleData = {

                ...formData,

                currentMileage:
                    Number(formData.currentMileage)

            };


            /*
             * Update existing vehicle.
             */
            if (vehicle?.id) {

                await vehicleService.update(
                    vehicle.id,
                    vehicleData
                );

            }

            /*
             * Create new vehicle.
             */
            else {

                await vehicleService.create(
                    vehicleData
                );

            }


            /*
             * Tell parent component that
             * the operation succeeded.
             */
            onSuccess();


            /*
             * Close popup.
             */
            onClose();

        }

        catch (requestError) {

            console.error(
                'Vehicle save error:',
                requestError
            );

            const errorData =
                requestError.response?.data;

            /*
             * Backend may return either:
             *
             * { message: "Error..." }
             *
             * or directly:
             *
             * "Error..."
             */
            if (
                typeof errorData === 'string'
            ) {

                setError(errorData);

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

        <div className="vehicle-form-modal">


            {/* BACKGROUND OVERLAY */}

            <div
                className="vehicle-form-overlay"
                onClick={onClose}
            ></div>



            {/* MODAL CARD */}

            <form
                className="vehicle-form-card"
                onSubmit={handleSubmit}
            >


                {/* HEADER */}

                <div className="vehicle-form-header">

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
                        disabled={loading}
                    >

                        ✕

                    </button>

                </div>



                {/* ERROR MESSAGE */}

                {error && (

                    <div className="error-message">

                        ⚠ {error}

                    </div>

                )}



                {/* VIN */}

                <div className="form-group">

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
                        disabled={loading}
                    />

                </div>



                {/* LICENSE PLATE */}

                <div className="form-group">

                    <label>

                        License Plate

                    </label>

                    <input
                        type="text"
                        name="licensePlate"
                        placeholder="TN-01-AB-1234"
                        required
                        value={formData.licensePlate}
                        onChange={handleChange}
                        disabled={loading}
                    />

                </div>



                {/* VEHICLE MODEL */}

                <div className="form-group">

                    <label>

                        Vehicle Model

                    </label>

                    <input
                        type="text"
                        name="model"
                        placeholder="e.g. Volvo FH 16"
                        required
                        value={formData.model}
                        onChange={handleChange}
                        disabled={loading}
                    />

                </div>



                {/* STATUS */}

                <div className="form-group">

                    <label>

                        Status

                    </label>

                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        disabled={loading}
                    >

                        <option value="AVAILABLE">

                            AVAILABLE

                        </option>

                        <option value="ON_TRIP">

                            ON TRIP

                        </option>

                        <option value="UNDER_MAINTENANCE">

                            UNDER MAINTENANCE

                        </option>

                    </select>

                </div>



                {/* MILEAGE */}

                <div className="form-group">

                    <label>

                        Current Mileage (km)

                    </label>

                    <input
                        type="number"
                        name="currentMileage"
                        placeholder="e.g. 25000"
                        min="0"
                        required
                        value={formData.currentMileage}
                        onChange={handleChange}
                        disabled={loading}
                    />

                </div>



                {/* ACTION BUTTONS */}

                <div className="vehicle-form-actions">


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