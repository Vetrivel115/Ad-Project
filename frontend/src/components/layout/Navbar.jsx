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


    if (!user) {
        return null;
    }


    const role = user.role;


    const showMaintenance =
        role === 'FLEET_MANAGER' ||
        role === 'MAINTENANCE_TECH';


    const handleLogout = () => {

        dispatch(
            logout()
        );

        navigate(
            '/login'
        );
    };


    return (

        <nav className="navbar">


            {/* ================= BRAND ================= */}

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



            {/* ================= NAVIGATION ================= */}

            <div className="navbar-links">


                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive
                            ? 'nav-link active'
                            : 'nav-link'
                    }
                >
                    <span className="nav-icon">
                        📊
                    </span>

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
                    <span className="nav-icon">
                        🚛
                    </span>

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
                    <span className="nav-icon">
                        🗺️
                    </span>

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
                        <span className="nav-icon">
                            🔧
                        </span>

                        Maintenance
                    </NavLink>

                )}


            </div>



            {/* ================= USER ================= */}

            <div className="navbar-user">


                <div className="user-profile">


                    <div className="user-avatar">

                        {user.username
                            ?.charAt(0)
                            ?.toUpperCase()
                        }

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
                                )
                            }

                        </span>

                    </div>


                </div>



                <button
                    type="button"
                    className="logout-button"
                    onClick={handleLogout}
                >

                    <span>
                        ↪
                    </span>

                    Logout

                </button>


            </div>


        </nav>

    );

}


export default Navbar;