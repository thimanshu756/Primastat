import React from 'react'
import reviewProfileImg from "@/public/Landing_Page_Assets/reviewProfile.svg"
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import ReviewCard from './ReviewCard';
import GradientText from '../Common/GradientText';

const sampleReviews=[
    {
        image:reviewProfileImg,
        title:"Camron Williamson",
        designation:"Co Founder of WC Foundation",
        review:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla."
    },
    {
        image:reviewProfileImg,
        title:"Camron ",
        designation:"Co Founder of WC Foundation",
        review:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla."
    },
    {
        image:reviewProfileImg,
        title:" Williamson",
        designation:"Co Founder of WC Foundation",
        review:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla."
    },
    {
        image:reviewProfileImg,
        title:"Camronnn ",
        designation:"Co Founder of WC Foundation",
        review:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla."
    },
    {
        image:reviewProfileImg,
        title:" Williamsonnn",
        designation:"Co Founder of WC Foundation",
        review:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla."
    }
]

const Testimonials = () => {
  return (
    <div>
          <div className=' relative  mb-20 left-[45%]'>
          <GradientText text='Testimonials'/>
          </div>
       <div className=' px-5'>
            <Swiper
        spaceBetween={30}
        centeredSlides={false} // Set this to false to align the slides normally
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
    
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        slidesPerView={1} // Default to 1 slide per view
        breakpoints={{
          // when window width is >= 640px
          640: {
            slidesPerView: 2, // Show 2 slides on smaller devices
            spaceBetween: 20,
          },
          // when window width is >= 1024px
          1024: {
            slidesPerView: 3, // Show 3 slides on larger screens
            spaceBetween: 30,
          },
        }}
      >

        {sampleReviews.map((review, index) => (
            <SwiperSlide key={index}>
                <ReviewCard 
                    title={review.title} 
                    designation={review.designation} 
                    image={review.image} 
                    review={review.review}
                />
            </SwiperSlide>
        ))}
      </Swiper>
       </div>
     
    </div>
  )
}

export default Testimonials
