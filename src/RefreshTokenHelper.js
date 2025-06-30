import axios from 'axios';
import { BASE_URL } from './Config';

export const refreshAccessToken = async (authState, updateAccessToken, logout, toast) => {
  try {
    const refreshResponse = await axios.post(`${BASE_URL}/token/newAccessToken`, {
      refreshToken: authState.refreshToken,
    });

    const newAccessToken = refreshResponse.data.accessToken;

    updateAccessToken(newAccessToken, authState); 
    authState.accessToken = newAccessToken;

    return newAccessToken;
  } catch (refreshError) {
    console.error('Failed to refresh token:', refreshError);
    toast.error('Session Expired');
    logout();
    throw refreshError;
  }
};
