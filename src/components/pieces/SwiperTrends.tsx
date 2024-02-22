'use client'
import {Pagination} from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/pagination';
import Link from "next/link";
import { Swiper ,SwiperSlide } from 'swiper/react';
import PieceCard from './PieceCard';
const SwiperTrends = ({piece} : any) => {
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
        {piece.map((piece : any) => {
          return <SwiperSlide key={piece.id_product}>
           <PieceCard piece={piece} />
          </SwiperSlide>
        })}
      </Swiper>
  )
}
export default SwiperTrends