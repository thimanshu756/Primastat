import React from 'react'
import { CiSearch } from "react-icons/ci";

const DashNav = () => {
    return (
        <div>
        <div className='flex items-center justify-between mb-5  '>
            <div className="relative ">
                <input type="text"
                    className="pl-10 pr-4 py-2 border rounded-3xl bg-[#F0F0F5] md:w-[300px]"
                    placeholder="Search your Workspace" />
                <div className="absolute inset-y-0 left-0 pl-3  
                    flex items-center  
                    pointer-events-none">
                    <CiSearch className='text-[#878C96] h-6 w-6'/>
                </div>
            </div>
            <div>
                <button className=' bg-gray-800 text-white p-2 rounded-md hover:scale-110 transition-all duration-200' >+ Add Dataset</button>
            </div>
        </div>
        <div className=' border-[0.5px] mb-7'>
        </div>
        </div>
    )
}

export default DashNav