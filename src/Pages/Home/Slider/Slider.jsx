import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import './styles.css';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';
import { Autoplay, EffectCards } from 'swiper/modules';

export default function Slider() {
    return (
        <>
            <Swiper
                effect={'cards'}
                grabCursor={true}
                modules={[EffectCards,Autoplay]}
                className="mySwiper"
                loop={true}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
            >
                <SwiperSlide><img className='w-full h-full' src="https://i.ibb.co.com/vqmQySb/download-1.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img className='w-full h-full' src="https://i.ibb.co.com/CMW88LJ/kaptai-lake-2493134-640.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img className='w-full h-full' src="https://i.ibb.co.com/CMW88LJ/kaptai-lake-2493134-640.jpg" alt="" /></SwiperSlide>
                <SwiperSlide><img className='w-full h-full' src="https://i.ibb.co.com/BT7KSpH/deer-3673017-640.jpg" alt="" /></SwiperSlide>
            </Swiper>
        </>
    )
}
