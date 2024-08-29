import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { AuthToken } from '@/app/recoilContextProvider';
import Image from 'next/image';
import logo from "@/public/Landing_Page_Assets/logo.svg";
import HomeButton from './Common/HomeButton';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const authToken = useRecoilValue(AuthToken);
  const router = useRouter();

  useEffect(() => {
    // Prefetch routes for faster navigation
    router.prefetch('/dashboard');
    router.prefetch('/signIn');
  }, [router]);

  const handleDashBoard = (e) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    router.push('/signIn');
  };

  return (
    <div className='bg-[#000000] w-full h-[100px] flex items-center justify-between sm:px-5 lg:px-[100px]'>
      <div>
        <Image
          src={logo}
          alt='Primastat'
          className='h-[43px] w-[184.23px]'
          priority // Ensure the logo loads immediately
        />
      </div>
      <div>
        {!authToken ? (
          <HomeButton name='Login' handlefunction={handleLogin} />
        ) : (
          <HomeButton name='Dashboard' handlefunction={handleDashBoard} />
        )}
      </div>
    </div>
  );
};

export default Navbar;
