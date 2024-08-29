import axios from 'axios';
import refreshAccessToken from '@/services/refreshToken';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL, // Use the environment variable
});

export const setAuthToken = (token: string | null): void => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

// Handle automatic token refresh on 401 Unauthorized response
axiosInstance.interceptors.response.use(
  response => response, // Simply return the response for successful requests
  async error => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // Prevent infinite loops

      try {
        await refreshAccessToken();

        const accessToken = localStorage.getItem('authToken');
        if (accessToken) {
          setAuthToken(accessToken); // Update axiosInstance with the new token
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`; // Set token to the retry request
          return axiosInstance(originalRequest); // Retry the original request with the new token
        }
      } catch (refreshError) {
        // Handle failed refresh (e.g., redirect to login)
        console.error('Failed to refresh token:', refreshError);
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors
    return Promise.reject(error);
  }
);

export default axiosInstance;
