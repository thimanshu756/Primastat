'use client';
import { useRouter } from 'next/navigation';
import { useSetRecoilState } from 'recoil';
import { signOut } from 'next-auth/react';
import { AuthToken, RefreshToken } from '@/app/recoilContextProvider';

export const useAuthActions = () => {
  const setAuthToken = useSetRecoilState(AuthToken);
  const setRefreshToken = useSetRecoilState(RefreshToken);
  const router = useRouter();

  const logout = () => {
    // Clear tokens from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');

    // Reset Recoil state
    setAuthToken(null);
    setRefreshToken(null);

    // Sign out from NextAuth
    signOut();

    // Redirect to the login page
    router.push('/signIn');
  };

  return { logout };
};




