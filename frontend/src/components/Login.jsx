import React, { useState } from 'react';

import {
    useDispatch,
    useSelector
} from 'react-redux';

import { useNavigate } from 'react-router-dom';

import {
    login
} from '../store/slices/authSlice';

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

            <form onSubmit={handleSubmit}>

                <h1>FleetFocus Login</h1>

                {error && (
                    <div className="error-msg">
                        {error}
                    </div>
                )}

                <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    required
                    onChange={(event) =>
                        setUsername(event.target.value)
                    }
                />

                <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    required
                    onChange={(event) =>
                        setPassword(event.target.value)
                    }
                />

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? 'Logging In...'
                        : 'Login'}
                </button>

            </form>

        </div>
    );
}

export default Login;