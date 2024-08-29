'use client';

import { useAuthActions } from '@/hooks/useAuth';
import LogoutIcon from '@/public/logout.svg';
import Image from 'next/image';


const Logout = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const { logout } = useAuthActions();
  return (
    <div
      className={`menu-item flex pl-4  items-center cursor-pointer 
hover:text-blue-500
  `}
      onClick={e => {
        logout();
      }}
    >
      <div className="icon h-6 w-6 mr-2 flex items-center justify-center">
        <Image src={LogoutIcon} alt='logout Icon'  height="24" width="24"/>
      </div>
      <div
        className={`${
          isCollapsed && 'hidden'
        } title capitalize transition-opacity duration-200`}
      >
        Logout
      </div>
    </div>
  );
};

export default Logout;
