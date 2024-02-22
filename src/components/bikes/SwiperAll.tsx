'use client'
import {Pagination} from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/pagination';
import Link from "next/link";
import { Swiper ,SwiperSlide } from 'swiper/react';
import BikeCard from './BikeCard';
const Test = ({test} : any) => {
    console.log(test);
  return (
    <div className="grid sm:grid-rows-1 md:grid-rows-2 grid-rows-4 grid-flow-col gap-4">
        {test.map((bike : any) => {
          return (
           <BikeCard bike={bike} />
         )
        })}
    </div>
  )
}
export default Test