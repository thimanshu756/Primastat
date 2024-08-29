import React from 'react'
import whiteLogoImg from "@/public/Landing_Page_Assets/logo.svg"
import Image from 'next/image'
import HomeButton from '../Common/HomeButton'
import Link from 'next/link'
const Footer = () => {
    const handleSubmit=(e)=>{
        e.preventDefault();
        alert("Hii")
    }
  return (
    <div className=' mt-20'>
        <div className=' flex justify-center items-center'>
        <Image src={whiteLogoImg} alt='Primastat' />
        </div>
        <div className='flex justify-center items-center mt-10 gap-3'>
            <input type="text" placeholder='work@email.com' className='bg-[#1A1A23] px-3 w-[350px] h-[49px] rounded-xl'/>
            <HomeButton name='Try It' handlefunction={handleSubmit}/>     
         </div>
         <div className='mt-10 text-white flex items-center justify-evenly'>
            <Link href='/' >Home</Link>
            <Link href='/' >About Us</Link>
            <Link href='/' >Case Study</Link>
            <Link href='/' >Contact Us</Link>
         </div>
         <div className=' border-t-[0.5px] border-[#B1B1B1] h-1 md:mx-32 mt-20 mb-2'></div>
         <div className=' text-[#B1B1B1] flex flex-col md:flex-row text-center justify-between md:mx-32 py-4'>
            <div>
                <p>© Primastat Services Pvt. Ltd.</p>
            </div>
            <div className=' py-2 text-center'>
            <p>Terms of Service | Privacy Policy</p>
            </div>
         </div>
    </div>
  )
}

export default Footer