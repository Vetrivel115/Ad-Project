import React from 'react';

import {
    useDispatch,
    useSelector
} from 'react-redux';

import {
    Link,
    useNavigate
} from 'react-router-dom';

import {
    logout
} from '../../store/slices/authSlice';

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(
        (state) => state.auth.user
    );

    if (!user) {
        return null;
    }

    const role = user.role;

    const showMaintenance =
        role === 'FLEET_MANAGER' ||
        role === 'MAINTENANCE_TECH';

    const handleLogout = () => {
        dispatch(logout());

        navigate('/login');
    };

    return (
        <nav className="navbar">

            <div className="navbar-brand">
                FleetFocus
            </div>

            <div className="navbar-links">

                <Link to="/">
                    Dashboard
                </Link>

                <Link to="/vehicles">
                    Vehicles
                </Link>

                <Link to="/trips">
                    Trips
                </Link>

                {showMaintenance && (
                    <Link to="/maintenance">
                        Maintenance
                    </Link>
                )}

            </div>

            <div className="navbar-user">

                <span>
                    Welcome back, {user.username}!
                </span>

                <button
                    type="button"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

        </nav>
    );
}

export default Navbar;