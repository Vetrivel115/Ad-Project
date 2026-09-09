import React, { useState } from 'react';

import {
    useDispatch,
    useSelector
} from 'react-redux';

import {
    useNavigate
} from 'react-router-dom';

import {
    login
} from '../store/slices/authSlice';

import './Login.css';


function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        loading,
        error
    } = useSelector(
        (state) => state.auth
    );

    const [username, setUsername] =
        useState('');

    const [password, setPassword] =
        useState('');


    const handleSubmit = async (event) => {

        event.preventDefault();

        const result = await dispatch(
            login({
                username,
                password
            })
        );

        if (!login.rejected.match(result)) {

            navigate('/');

        }
    };


    return (

        <div className="login-page">

            {/* Left branding section */}

            <div className="login-brand">

                <div className="brand-content">

                    <div className="brand-logo">
                        🚚
                    </div>

                    <h1>
                        FleetFocus
                    </h1>

                    <p className="brand-tagline">
                        Smart Fleet Management.
                        Better Decisions.
                    </p>

                    <div className="brand-features">

                        <div className="brand-feature">

                            <span>📍</span>

                            <div>
                                <h3>
                                    Live Tracking
                                </h3>

                                <p>
                                    Monitor your fleet in real time
                                </p>
                            </div>

                        </div>


                        <div className="brand-feature">

                            <span>🔧</span>

                            <div>
                                <h3>
                                    Maintenance Management
                                </h3>

                                <p>
                                    Keep every vehicle healthy
                                </p>
                            </div>

                        </div>


                        <div className="brand-feature">

                            <span>📊</span>

                            <div>
                                <h3>
                                    Fleet Analytics
                                </h3>

                                <p>
                                    Make better operational decisions
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

            </div>


            {/* Right login section */}

            <div className="login-container">

                <form
                    className="login-card"
                    onSubmit={handleSubmit}
                >

                    <div className="login-header">

                        <div className="mobile-logo">
                            🚚
                        </div>

                        <h2>
                            Welcome Back
                        </h2>

                        <p>
                            Sign in to manage your fleet
                        </p>

                    </div>


                    {error && (

                        <div className="error-msg">
                            ⚠ {error}
                        </div>

                    )}


                    <div className="input-group">

                        <label>
                            Username
                        </label>

                        <input
                            type="text"
                            placeholder="Enter your username"
                            value={username}
                            required
                            onChange={(event) =>
                                setUsername(
                                    event.target.value
                                )
                            }
                        />

                    </div>


                    <div className="input-group">

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            required
                            onChange={(event) =>
                                setPassword(
                                    event.target.value
                                )
                            }
                        />

                    </div>


                    <button
                        className="login-button"
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? 'Logging In...'
                            : 'Login to FleetFocus'}

                    </button>


                    <p className="login-footer">

                        FleetFocus Management System

                    </p>

                </form>

            </div>

        </div>

    );

}


export default Login;