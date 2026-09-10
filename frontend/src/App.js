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

    return (

        <>

            {/* Show Navbar on all pages except Login */}
            {location.pathname !== '/login' && (
                <Navbar />
            )}

            <Routes>

                {/* ================= LOGIN ================= */}

                <Route
                    path="/login"
                    element={
                        <Login />
                    }
                />


                {/* ================= DASHBOARD ================= */}

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />


                {/* ================= VEHICLES ================= */}

                <Route
                    path="/vehicles"
                    element={
                        <ProtectedRoute>
                            <VehicleList />
                        </ProtectedRoute>
                    }
                />


                {/* ================= TRIPS ================= */}

                <Route
                    path="/trips"
                    element={
                        <ProtectedRoute>
                            <TripList />
                        </ProtectedRoute>
                    }
                />


                {/* ================= MAINTENANCE ================= */}

                <Route
                    path="/maintenance"
                    element={
                        <ProtectedRoute>
                            <MaintenanceList />
                        </ProtectedRoute>
                    }
                />


                {/* ================= DRIVERS ================= */}

                <Route
                    path="/drivers"
                    element={
                        <ProtectedRoute>
                            <DriverList />
                        </ProtectedRoute>
                    }
                />


                {/* ================= UNKNOWN ROUTE ================= */}

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/"
                        />
                    }
                />

            </Routes>

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