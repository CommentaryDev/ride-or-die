'use client'
import {Pagination} from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/pagination';
import Link from "next/link";
import { Swiper ,SwiperSlide } from 'swiper/react';
import BikeCard from './BikeCard';
const Test = ({test} : any) => {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-cols-1 grid-flow-row gap-4">
        {test.map((bike : any) => {
          return (
           <BikeCard bike={bike} />
         )
        })}
    </div>
  )
}
export default Test