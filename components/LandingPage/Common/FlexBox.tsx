import React from 'react';
import DetailsCard from './DetailsCard';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const FlexBox = ({ texts, images, width }) => {
  return (
    <>
      <div className="block md:hidden px-2">
        <div className="flex flex-col gap-5">
          <div>
            <Swiper
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper"
            >
              {texts.map((text, index) => (
                <SwiperSlide key={index}>
                  <DetailsCard key={index} text={text} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div>
            <Swiper
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper"
            >
              {images.map((image, index) => (
                <SwiperSlide key={index} className="w-full">
                  <div className="relative h-[400px] w-full">
                    <Image
                      src={image}
                      alt={`image-${index}`}
                      layout="fill"  // or the appropriate layout like "responsive" if fill isn't working as expected
                      priority={index === 0}  // prioritize loading the first image
                      quality={100}  // adjust quality if needed, though SVGs aren't lossy
                    />

                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
      {/* medium screen */}
      <div className="hidden md:block px-7">
        <div className="flex flex-row justify-between gap-5">
          <div className="flex flex-col gap-4">
            {texts.map((text, index) => (
              <DetailsCard key={index} text={text} />
            ))}
          </div>
          <div className=" w-[60%]">
            <Swiper
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper"
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={image}
                    alt={`image-${index}`}
                    layout="fill"  // or the appropriate layout like "responsive" if fill isn't working as expected
                    priority={index === 0}  // prioritize loading the first image
                    quality={100}  // adjust quality if needed, though SVGs aren't lossy
                  />

                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlexBox;
