import React from 'react';

import {
    useDispatch,
    useSelector
} from 'react-redux';

import {
    NavLink,
    useLocation,
    useNavigate
} from 'react-router-dom';

import {
    logout
} from '../../store/slices/authSlice';

import './Navbar.css';


function Navbar() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const user = useSelector(
        (state) => state.auth.user
    );

    const role = user?.role;

    const showMaintenance =
        role === 'FLEET_MANAGER' ||
        role === 'MAINTENANCE_TECH';

    const showDrivers =
        role === 'FLEET_MANAGER' ||
        role === 'DISPATCHER';

    const pageNames = {
        '/': 'Dashboard',
        '/vehicles': 'Vehicles',
        '/trips': 'Trips',
        '/maintenance': 'Maintenance',
        '/drivers': 'Drivers'
    };

    const pageName =
        pageNames[location.pathname] || 'Dashboard';

    const handleLogout = () => {

        localStorage.clear();

        dispatch(
            logout()
        );

        navigate('/login');
    };

    return (

        <nav className="navbar">

            <aside className="navbar-sidebar">

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

                    <div className="navbar-navigation">

                        <div className="nav-section-label">
                            MAIN
                        </div>

                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive
                                    ? 'nav-link active'
                                    : 'nav-link'
                            }
                            end
                        >
                            <span className="nav-icon">▦</span>
                            <span className="nav-label">
                                Dashboard
                            </span>
                        </NavLink>

                        <div className="nav-section-label">
                            FLEET
                        </div>

                        <NavLink
                            to="/vehicles"
                            className={({ isActive }) =>
                                isActive
                                    ? 'nav-link active'
                                    : 'nav-link'
                            }
                        >
                            <span className="nav-icon">▣</span>
                            <span className="nav-label">
                                Vehicles
                            </span>
                        </NavLink>

                        <NavLink
                            to="/trips"
                            className={({ isActive }) =>
                                isActive
                                    ? 'nav-link active'
                                    : 'nav-link'
                            }
                        >
                            <span className="nav-icon">↗</span>
                            <span className="nav-label">
                                Trips
                            </span>
                        </NavLink>

                        {showDrivers && (
                            <NavLink
                                to="/drivers"
                                className={({ isActive }) =>
                                    isActive
                                        ? 'nav-link active'
                                        : 'nav-link'
                                }
                            >
                                <span className="nav-icon">◉</span>
                                <span className="nav-label">
                                    Drivers
                                </span>
                            </NavLink>
                        )}

                        {showMaintenance && (
                            <>
                                <div className="nav-section-label">
                                    OPERATIONS
                                </div>

                                <NavLink
                                    to="/maintenance"
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'nav-link active'
                                            : 'nav-link'
                                    }
                                >
                                    <span className="nav-icon">⚙</span>
                                    <span className="nav-label">
                                        Maintenance
                                    </span>
                                </NavLink>
                            </>
                        )}

                    </div>

                )}

                {user && (
                    <div className="navbar-bottom">

                        <div className="sidebar-status">
                            <span className="sidebar-status-dot" />
                            <div>
                                <strong>System Online</strong>
                                <span>All services operational</span>
                            </div>
                        </div>

                        <div className="sidebar-user">
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
                                    {role?.replace(/_/g, ' ')}
                                </span>
                            </div>
                        </div>

                    </div>
                )}

            </aside>

            {user && (

                <header className="navbar-topbar">

                    <div className="topbar-page">
                        <span className="topbar-overline">
                            FLEET OPERATIONS
                        </span>
                        <strong>{pageName}</strong>
                    </div>

                    <div className="topbar-actions">

                        <span className="topbar-status">
                            <span className="sidebar-status-dot" />
                            Live
                        </span>

                        <div className="sidebar-user topbar-user">
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
                                    {role?.replace(/_/g, ' ')}
                                </span>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="logout-button"
                            onClick={handleLogout}
                        >
                            ↪
                            Logout
                        </button>

                    </div>

                </header>

            )}

        </nav>

    );
}

export default Navbar;
