import React, {
    createContext,
    useContext,
    useState
} from 'react';

const NotificationContext =
    createContext();

export function NotificationProvider({
    children
}) {
    const [
        notifications,
        setNotifications
    ] = useState([]);

    const addNotification = (
        message,
        type = 'success'
    ) => {
        const id =
            Date.now() +
            Math.random();

        const notification = {
            id,
            message,
            type
        };

        setNotifications(
            (previous) => [
                ...previous,
                notification
            ]
        );

        setTimeout(() => {
            setNotifications(
                (previous) =>
                    previous.filter(
                        (item) =>
                            item.id !== id
                    )
            );
        }, 5000);
    };

    const removeNotification = (id) => {
        setNotifications(
            (previous) =>
                previous.filter(
                    (item) =>
                        item.id !== id
                )
        );
    };

    return (
        <NotificationContext.Provider
            value={{
                addNotification
            }}
        >

            {children}

            <div
                className="notification-stack"
            >

                {notifications.map(
                    (notification) => (
                        <div
                            key={
                                notification.id
                            }
                            className={
                                `notification ${notification.type}`
                            }
                        >

                            <span>
                                {notification.message}
                            </span>

                            <button
                                onClick={() =>
                                    removeNotification(
                                        notification.id
                                    )
                                }
                            >
                                X
                            </button>

                        </div>
                    )
                )}

            </div>

        </NotificationContext.Provider>
    );
}

export function useNotification() {
    return useContext(
        NotificationContext
    );
}

export default NotificationProvider;