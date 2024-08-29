import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { usePathname } from 'next/navigation'

interface MenuItemProps {
  Icon: React.ElementType; // Using ElementType to represent any component passed as a prop
  title: string;
  link?: string;
  disable?: boolean; // Making disable optional
  isCollapsed: boolean;
  onclick?: ()=>void
}

const MenuItem: React.FC<MenuItemProps> = ({
  Icon,
  title,
  link,
  disable = false, // Default value for disable is false
  isCollapsed,
  onclick
}) => {
   const router=useRouter();
   const pathname = usePathname();
   
  return (
    <div className={` font-montserrat font-medium relative ${link==pathname ? "bg-[#1E2837] text-white":"bg-white hover:bg-gray-100 "}  rounded-3xl`}>
      <a
        href={disable ? '#' : link}
        className={`menu-item my-1 flex py-4 pl-4 pr-6 items-center cursor-pointer ${
          disable ? 'cursor-not-allowed opacity-50' : ` ${ link!=pathname && 'hover:text-blue-500'}`
        }`}
      >
        <div className="icon h-6 w-6 mr-2 flex items-center justify-center">
          <Icon className='h-6 w-6' />
        </div>
        <div
          className={`${
            isCollapsed && 'hidden'
          } title capitalize transition-opacity duration-200`}
        >
          {title}
        </div>
      </a>
    </div>
  );
};

export default MenuItem;
