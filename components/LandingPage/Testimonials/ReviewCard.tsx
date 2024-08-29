import Image from 'next/image'
import React from 'react'

const ReviewCard = ({title,designation,review,image}) => {
  return (
    <div className=' bg-[#000917] rounded-lg flex gap-3 flex-col md:w-[407px] p-4'>
        <div className=' text-[#B4B5B9]'>
            {review}
        </div>
        <div className=' flex items-center justify-evenly '>
        <Image src={image} alt={title}/>
        <div >
           <p className='text-[#FFFFFF]'> {title}</p>
           <p className=' text-[#B4B5B9]'>{designation}</p>
        </div>
        </div>
    </div>
  )
}
 
export default ReviewCard;