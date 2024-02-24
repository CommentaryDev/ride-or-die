'use client'
import {Pagination} from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/pagination';
import Link from "next/link";
import { Swiper ,SwiperSlide } from 'swiper/react';
import BikeCard from './BikeCard';
export const dynamic = 'force-dynamic'
const SwiperTrends = ({test} : any) => {
  return (
    <Swiper slidesPerView={1} spaceBetween={30} breakpoints={{ 
        640 : {slidesPerView: 1},
        768 : {slidesPerView: 2},
        960 : {slidesPerView: 3},
        1440 : {slidesPerView: 4},
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className='trending-bike-slider mb-8'>
        {test.map((bike : any) => {
          return <SwiperSlide key={bike.id_product}>
           <BikeCard bike={bike} />
          </SwiperSlide>
        })}
      </Swiper>
  )
}
export default SwiperTrends