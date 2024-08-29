import Image from 'next/image'
import React from 'react'

const AskCard = ({title,description,image}) => {
  return (
    <div className=' border flex flex-col  gap-2 items-center opacity-100 p-4 w-[250px] rounded-lg bg-[#F0F0F5]'>
         <Image src={image} alt='image'/>
         <h1 className=' font-semibold'>{title}</h1>
         <p className='text-[#878C96]'>{description}</p>
    </div>
  )
}

export default AskCard