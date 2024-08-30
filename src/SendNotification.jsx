import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import AuthContext from './Context/AuthContext';

function SendNotification() {
    const { authState } = useContext(AuthContext);

    const sendNotification = async (payload) => {
        console.log(authState.token)
        try {
            const response = await axios.post(
                'https://fcm.googleapis.com/v1/projects/myproject-b5ae1/messages:send',
                {
                    // to: authState.token,
                    // notification: {
                    //     title: payload.title,
                    //     body: payload.body,
                    //     click_action: payload.clickAction,
                    // },
                    // data: payload.data,

                 
                        "message":{
                           "token":'BFSxjvP6e1f3aPaE6KhR4izey4zKE9iLCHEXMoEKFJDqUP3L7esYA8BOjC6JQ_Qr-bvOq1uXHLpD2B0uiYx3hAM',
                           "notification":{
                             "body":"This is an FCM notification message!",
                             "title":"FCM Message"
                           }
                        }
                    
                },
                {
                    headers: {
                        Authorization:  `Bearear BFSxjvP6e1f3aPaE6KhR4izey4zKE9iLCHEXMoEKFJDqUP3L7esYA8BOjC6JQ_Qr-bvOq1uXHLpD2B0uiYx3hAM`, // Replace with your actual Server Key
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log('Notification sent:', response.data);
        } catch (error) {
            console.error('Error sending notification:', error);
        }
    };

    // Example usage:
    useEffect(() => {
        const notificationPayload = {
            title: 'Hello!',
            body: 'This is a test notification',
            clickAction: 'https://yourwebsite.com',
            data: {
                additionalData: 'Some data',
            },
            
        };
        sendNotification(notificationPayload);
    }, []);

    return null;
}

export default SendNotification;
