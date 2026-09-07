import React from 'react';

import {
    BrowserRouter,
    Navigate,
    Route,
    Routes
} from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Login from './components/Login';

import VehicleList from
    './components/vehicles/VehicleList';

import ProtectedRoute from
    './components/ProtectedRoute';

function Dashboard() {
    return (
        <div>
            <h1>
                FleetFocus Dashboard
            </h1>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route
                    path="/login"
                    element={
                        <Login />
                    }
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
                    path="*"
                    element={
                        <Navigate
                            to="/"
                        />
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;