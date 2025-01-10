import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {Autoplay, Navigation, Pagination} from "swiper/modules";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function Banner () {
    return (
        <Swiper
            spaceBetween={0}
            slidesPerView={1}
            centeredSlides={true}
            autoplay={{
                delay: 5000,
                disableOnInteraction: false,
            }}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation, Autoplay]}
            style={{ maxWidth: '650px' }}
        >
            <SwiperSlide>
                <img src="/images/img_banner_1.png" alt="Banner 1" />
            </SwiperSlide>
            <SwiperSlide>
                <img src="/images/img_banner_2.png" alt="Banner 2" />
            </SwiperSlide>
            <style>
                {`
                .swiper-button-prev, .swiper-button-next { color: #fff; }
                .swiper-button-prev::after, .swiper-button-next::after {  font-size: 18px; }
                .swiper-button-prev { left: 10px; }
                .swiper-button-next { right: 10px; }
                .swiper-button-prev:hover, .swiper-button-next:hover { color:#333 }
                .swiper-pagination-bullet {background-color: rgba(0,0,0,0.4)}
                .swiper-pagination-bullet-active { background-color: rgba(255,255,255,0.8)}
               `}
            </style>
        </Swiper>
    );
};

export default Banner;
