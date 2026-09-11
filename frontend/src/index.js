import React from 'react';

import {
    createRoot
} from 'react-dom/client';

import {
    Provider
} from 'react-redux';

import App from './App';

import {
    store
} from './store';

import {
    NotificationProvider
} from './components/common/NotificationStack';

// CSS IMPORTS
import './index.css';
import './App.css';

import './fleetfocus-dark.css';

const root =
    createRoot(
        document.getElementById('root')
    );

root.render(
    <React.StrictMode>

        <Provider store={store}>

            <NotificationProvider>

                <App />

            </NotificationProvider>

        </Provider>

    </React.StrictMode>
);