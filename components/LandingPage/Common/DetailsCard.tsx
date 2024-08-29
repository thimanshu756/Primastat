import React from 'react'
interface DetailsCard{
    text:string
}
const DetailsCard = ({text}) => {
  return (
    <div className="">
  <div className=" lg:w-[387px] rounded-2xl bg-gradient-to-r from-[#0FACFE]  to-[#A20CFF] p-[0.07rem] md:gradient-shadow ">
    <div className="flex flex-col py-4  gap-3 h-full w-full  rounded-2xl  bg-black  ">
    <p className="px-8 text-xl text-left font-poppins  text-white">{text.title}</p>
    <p className='px-8 font-poppins'>{text.description}</p>
    </div>
  </div>
  </div>
  )
}

export default DetailsCard