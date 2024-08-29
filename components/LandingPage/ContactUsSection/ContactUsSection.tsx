import React from 'react'
import "./style.css"
import GradientText from '../Common/GradientText'
import HomeButton from '../Common/HomeButton'
import macImg from "@/public/Landing_Page_Assets/Laptop.svg"
import Boltshift from "@/public/Landing_Page_Assets/CompaniesLogo/Boltshift.svg"
import Feather from "@/public/Landing_Page_Assets/CompaniesLogo/Feather.svg"
import Global from "@/public/Landing_Page_Assets/CompaniesLogo/Global.svg"
import LightBox from "@/public/Landing_Page_Assets/CompaniesLogo/LightBox.svg"
import Image from 'next/image'
const ContactUsSection = () => {
    const handleContact = (e: any) => {
        alert("Handling contactUs");
    }
    return (
        <div className='containerr w-[100%] '>
            <div className=' relative top-20'>
                <div className='  lg:w-[840px] mx-auto flex flex-col items-center gap-5 '>
                    <div className=' text-center'>
                        <GradientText text='Unlock the Power' /> {" "} <span className=' text-white text-3xl'>of Your Data <br />
                            with Just a Conversation</span>
                    </div>
                    <p className='  textt text-center   inline-block text-transparent bg-clip-text'>Transform complex databases into actionable insights using simple English queries. Nova turns your <br /> words into stunning visualizations, no SQL required.</p>
                    <HomeButton name='Contact us' handlefunction={handleContact} />
                </div>
                <div className=' mt-14'>
                <Image src={macImg} height={400} className=' mx-auto' alt='MacImg' loading='lazy'/>
                </div>
                {/* <div className=' bg-black  '>
                <p className=' text-[#606066] text-center'>Trusted by 4,000+ companies</p>
                <div className=' flex items-center gap-1 justify-evenly px-1 lg:w-[80%] mx-auto mt-10 mb-10'>
                    <Image src={Boltshift} alt='Boltshift'/>
                    <Image src={LightBox} alt='Boltshift'/>
                    <Image src={Feather} alt='Boltshift'/>
                    <Image src={Global} alt='Boltshift'/>
                </div>
            </div> */}
            </div>
        </div>
    )
}








export default ContactUsSection