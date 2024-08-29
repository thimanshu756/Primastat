
import React from 'react'
import Navbar from './Navbar';
import ContactUsSection from './ContactUsSection/ContactUsSection';
import KeyFeatures from './KeyFeatures/KeyFeatures';
import UseCases from './useCases/UseCases';
import HowWorks from './Works/HowWorks';
import Testimonials from './Testimonials/Testimonials';
import TryIt from './TryIt/TryIt';
import Footer from './Footer/Footer';

const HomePage = () => {
  return (
    <div className=' bg-black'>
        <Navbar/>
        <ContactUsSection/>
        <KeyFeatures/>
        <HowWorks/>
        <UseCases/>
        {/* <Testimonials/> */}
        <TryIt/>
        <Footer/>
    </div>
  )
}

export default HomePage;