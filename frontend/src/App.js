import React from 'react';

import {
    BrowserRouter,
    Navigate,
    Route,
    Routes,
    useLocation
} from 'react-router-dom';

import DriverList from
    './components/drivers/DriverList';

import Navbar from
    './components/layout/Navbar';

import Login from
    './components/Login';

import Dashboard from
    './components/dashboard/Dashboard';

import VehicleList from
    './components/vehicles/VehicleList';

import TripList from
    './components/trips/TripList';

import MaintenanceList from
    './components/maintenance/MaintenanceList';

import ProtectedRoute from
    './components/ProtectedRoute';


function AppContent() {

    const location = useLocation();
    const isLogin = location.pathname === '/login';

    return (

        <>

            {!isLogin && <Navbar />}

            <main
                className={
                    isLogin
                        ? 'app-main app-main-login'
                        : 'app-main'
                }
            >

                <Routes>

                    <Route
                        path="/login"
                        element={<Login />}
                    />

                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/vehicles"
                        element={
                            <ProtectedRoute>
                                <VehicleList />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/trips"
                        element={
                            <ProtectedRoute>
                                <TripList />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/maintenance"
                        element={
                            <ProtectedRoute>
                                <MaintenanceList />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/drivers"
                        element={
                            <ProtectedRoute>
                                <DriverList />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="*"
                        element={<Navigate to="/" />}
                    />

                </Routes>

            </main>

        </>

    );
}


function App() {

    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}


export default App;
