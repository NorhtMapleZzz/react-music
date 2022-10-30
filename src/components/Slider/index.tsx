import { memo, useEffect, useState } from 'react';
import "swiper/swiper.min.css";
import Swiper from "swiper";

interface Props {
  bannerList: any[]
}

function Slider(props: Props) {
  const [sliderSwiper, setSliderSwiper] = useState<Swiper>(null);
  const { bannerList } = props;

  useEffect(() => {
    if (bannerList.length && !sliderSwiper) {
      let newSliderSwiper = new Swiper(".slider-container", {
        loop: true,
        autoplay: {delay: 3000, disableOnInteraction: false},
        pagination: {el:'.swiper-pagination'}
      })
      setSliderSwiper(newSliderSwiper)
    }
  }, [bannerList.length, sliderSwiper])

  return (
    <div className='slider-wrapper'>
      <div className='slider-container'>
        <div className="swiper-wrapper">
          { bannerList.map((slider, index) => (
            <div className="swiper-slide" key={index}>
              <div className="slider-nav">
                <img className='w-full h-full' src={slider.imageUrl} alt="推荐" />
              </div>
            </div>
          ))}
        </div>
        <div className="swiper-pagination"></div>
      </div>
      <div className="before"></div>
    </div>
  )
}

export default memo(Slider)