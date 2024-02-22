'use client'
import {Pagination} from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/pagination';
import Link from "next/link";
import { Swiper ,SwiperSlide } from 'swiper/react';
import GearCard from './GearCard';
const Test = ({gear} : any) => {
  return (
    <div className="grid sm:grid-rows-1 md:grid-rows-2 grid-rows-4 grid-flow-col gap-4">
        {gear.map((gear : any) => {
          return (
           <GearCard gear={gear} />
         )
        })}
    </div>
  )
}
export default Test