import React, { createContext, useEffect, useContext } from 'react';
import socket from './Socket';
import AuthContext from './AuthContext';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const { authState } = useContext(AuthContext);

    useEffect(() => {
        if (authState?.accessToken) {
            if (!socket.auth) socket.auth = {};
            socket.auth.token = authState.accessToken;

            socket.connect();

            socket.on('connect', () => {
                console.log('Socket connected:', socket.id);
            });

            socket.on('disconnect', () => {
                console.log('Socket disconnected');
            });
        }

        return () => {
            socket.disconnect();
        };
    }, [authState?.accessToken]);


    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
