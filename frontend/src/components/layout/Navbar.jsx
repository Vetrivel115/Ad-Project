import React from 'react';

import {
    useDispatch,
    useSelector
} from 'react-redux';

import {
    NavLink,
    useNavigate
} from 'react-router-dom';

import {
    logout
} from '../../store/slices/authSlice';

import './Navbar.css';


function Navbar() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const user = useSelector(
        (state) => state.auth.user
    );

    const role = user?.role;

    const showMaintenance =
        role === 'FLEET_MANAGER' ||
        role === 'MAINTENANCE_TECH';

    const showDrivers =
        role === 'FLEET_MANAGER';


    const handleLogout = () => {

        localStorage.clear();

        dispatch(
            logout()
        );

        navigate(
            '/login'
        );
    };


    return (

        <nav className="navbar">

            <div className="navbar-brand">

                <div className="navbar-logo">
                    🚚
                </div>

                <div className="brand-text">

                    <span className="brand-name">
                        FleetFocus
                    </span>

                    <span className="brand-subtitle">
                        Fleet Management
                    </span>

                </div>

            </div>


            {user && (

                <>

                    <div className="navbar-links">

                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive
                                    ? 'nav-link active'
                                    : 'nav-link'
                            }
                        >
                            Dashboard
                        </NavLink>


                        <NavLink
                            to="/vehicles"
                            className={({ isActive }) =>
                                isActive
                                    ? 'nav-link active'
                                    : 'nav-link'
                            }
                        >
                            Vehicles
                        </NavLink>


                        <NavLink
                            to="/trips"
                            className={({ isActive }) =>
                                isActive
                                    ? 'nav-link active'
                                    : 'nav-link'
                            }
                        >
                            Trips
                        </NavLink>


                        {showMaintenance && (

                            <NavLink
                                to="/maintenance"
                                className={({ isActive }) =>
                                    isActive
                                        ? 'nav-link active'
                                        : 'nav-link'
                                }
                            >
                                Maintenance
                            </NavLink>

                        )}


                        {showDrivers && (

                            <NavLink
                                to="/drivers"
                                className={({ isActive }) =>
                                    isActive
                                        ? 'nav-link active'
                                        : 'nav-link'
                                }
                            >
                                Drivers
                            </NavLink>

                        )}

                    </div>


                    <div className="navbar-user">

                        <div className="user-profile">

                            <div className="user-avatar">

                                {user.username
                                    ?.charAt(0)
                                    ?.toUpperCase()}

                            </div>


                            <div className="user-info">

                                <span className="user-name">
                                    {user.username}
                                </span>

                                <span className="user-role">

                                    {role
                                        ?.replace(
                                            /_/g,
                                            ' '
                                        )}

                                </span>

                            </div>

                        </div>


                        <button
                            type="button"
                            className="logout-button"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>

                    </div>

                </>

            )}

        </nav>

    );

}


export default Navbar;