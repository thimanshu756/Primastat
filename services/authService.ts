"use client"
import axios from 'axios';


async function authenticateUser(credentials :any, setAuthToken : (x:any)=>void, setRefreshToken:(x:any)=>void) {

  try {
    const formData = new FormData();

    for (const key in credentials) {
      if (credentials.hasOwnProperty(key)) {
        formData.append(key, credentials[key]);
      }
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/es/login`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    if (response.data.accessToken) {
      localStorage.setItem('authToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);

      setAuthToken(response.data.accessToken);
      setRefreshToken(response.data.refreshToken);
      return true;
    }
    return false;
  } catch (error) {
    console.log("error -->",error);
    
    throw new Error('Authentication failed');
  }
}



async function authenticateSSOUser(ssoData :any, setAuthToken : (x:any)=>void, setRefreshToken : (x:any)=>void) {

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/es/authenticate_sso_user`,
      ssoData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    
    
    if (response.data.accessToken) {
      localStorage.setItem('authToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      setAuthToken(response.data.accessToken);
      setRefreshToken(response.data.refreshToken);
      return response.data;
    }
    return null;
  } catch (error) {

    throw new Error('SSO Authentication failed');
  }
}

export { authenticateUser, authenticateSSOUser };
