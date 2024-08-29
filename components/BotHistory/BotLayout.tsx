"use client"
import { useEffect } from 'react';
import CollapseIconSrc from '../../public/collapse.svg';
import { useRecoilState } from 'recoil';
import { isCollapsedState } from '@/app/recoilContextProvider';
import Image from 'next/image';
import BotSideBar from './BotSideBar/BotSideBar';

const BotLayout = ({ children }:any) => {

  const [isCollapsed, setIsCollapsed]=useRecoilState(isCollapsedState);
  useEffect(() => {
          setIsCollapsed(isCollapsed);
  }, [isCollapsed]);

  const toggleCollapse = (e:any) => {
    e.preventDefault();
    setIsCollapsed(!isCollapsed); 
  };

  return (
    <>
    <div className="flex">
      <div
        className={`fixed top-0 left-0 z-40 h-screen transition-width duration-300 ${
          isCollapsed ? 'w-16' : 'w-64'
        } overflow-hidden bg-white `}
      >
        <span
          onClick={toggleCollapse}
          className={`bg-gray-200 p-2 rounded-full focus:outline-none transition-transform absolute top-1/2 z-10 right-0 cursor-pointer transform -translate-y-1/2 duration-300 ${
            isCollapsed ? 'rotate-180' : 'rotate-0'
          }`}
          aria-label="Collapse sidebar" 
        >
         
          {/* <CollapseIconSrc alt="collapse" width={20} height={20} /> */}
          <Image src={CollapseIconSrc} width={20} height={20} alt='collapse' />

        </span>
            <BotSideBar isCollapsed={isCollapsed} />
      </div>
      <div className={`flex-1 ${isCollapsed ? 'ml-16' : 'ml-64'} p-4`}>
        {children}
      </div>
    </div></>
  );
};

export default BotLayout;
