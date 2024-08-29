'use client';
// import MenuItem from './components/menuItem';
import MenuItem from './menuItem'
import Logo from '@/public/logo.png';
import { AiOutlineHome } from "react-icons/ai";
import { BsDatabaseAdd } from "react-icons/bs";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { TbBasketDollar } from "react-icons/tb";

import Image from 'next/image';
import Link from 'next/link';
import Logout from './logout';
import { useState } from 'react';
import AllDbModal from '@/components/Modals/AllDbModal';


function SidebarComp({ isCollapsed }: { isCollapsed: boolean }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div
      className={` h-[100%]  shadow-2xl border-2 border-gray-200 transform perspective-3d `}
    >
      <Link href="/dashboard">
        <div className={`logo text-left p-4 cursor-pointer`}>
          <Image src={Logo} alt="logo" height={150} width={150} />
        </div>
      </Link>
      <div
        className={`menu-items flex flex-col justify-between  h-[100%] pb-20`}
      >
        <ul className={`items-list ${isCollapsed ? "px-0":"px-5"}`}>
          <MenuItem
            Icon={AiOutlineHome}
            title={'Home'}
            link={'/dashboard'}
            isCollapsed={isCollapsed}
          />
          <button onClick={(e) => {
            e.preventDefault()
            console.log("clicked");
            handleOpen()
          }} className=' w-full'>

            <MenuItem
              Icon={BsDatabaseAdd}
              title={'Create DataSet'}
              isCollapsed={isCollapsed}
            />
          </button>
          <MenuItem
            Icon={IoChatboxEllipsesOutline}
            title={'Talk'}
            link={'/BotHistory'}
            isCollapsed={isCollapsed}
          />
            <MenuItem
            Icon={TbBasketDollar}
            title={'Pricing'}
            link={'/pricing'}
            isCollapsed={isCollapsed}
          />
        </ul>
        <Logout isCollapsed={isCollapsed} />
      </div>
      <AllDbModal open={open} handleClose={handleClose} />
    </div>
  );
}

export default SidebarComp;
