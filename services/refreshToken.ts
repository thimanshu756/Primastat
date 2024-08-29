// services/refreshAccessToken.ts
import { setAuthToken as setAxiosAuthToken } from '@/utils/axios';

const refreshAccessToken = async (): Promise<void> => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (!refreshToken) {
      throw new Error('No refresh token found');
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/es/refresh`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${refreshToken}`,
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(`Refresh token error: ${data.error || 'Unknown error'}`);
    }

    if (data.accessToken) {
      localStorage.setItem('authToken', data.accessToken);
      setAxiosAuthToken(data.accessToken); // Update axios auth token

      if (data.refreshToken) {
        localStorage.setItem('refreshToken', data.refreshToken);
      }
    } else {
      throw new Error('No access token returned');
    }
  } catch (error) {
    console.error('Failed to refresh token:', error);
    throw error;
  }
};

export default refreshAccessToken;
