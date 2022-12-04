import { memo, useEffect, useState } from 'react';

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from 'swiper';
import "swiper/css";
import "swiper/css/pagination"
interface Props {
  bannerList: { imageUrl: string}[]
}

function Slider(props: Props) {
  
  const { bannerList } = props;

  return (
    <div className='slider-wrapper'>
      <div className='slider-container'>
        <div className="swiper-wrapper">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={10}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 1000,
              disableOnInteraction: false
            }}
            pagination={{ el: '.swiper-pagination', clickable: true}}
          >
            {bannerList.map((slider, index) => (
              <SwiperSlide key={index}>
                <img className='w-full h-full' src={slider.imageUrl} alt="推荐" />
              </SwiperSlide>
            ))}
          </Swiper>
          
        </div>
        <div className="swiper-pagination"></div>
      </div>
      <div className="before"></div>
    </div>
  )
}

export default memo(Slider)