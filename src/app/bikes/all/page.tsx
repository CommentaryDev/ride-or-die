

import {Pagination} from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/pagination';
import Link from "next/link";
import { Swiper ,SwiperSlide } from 'swiper/react';
import SwiperAll from '@/components/bikes/SwiperAll';
export const dynamic = 'force-dynamic'
const AllBikes = async () => {
    const res = await fetch(`${process.env.API_URL}/api/bikes/getAllBikes`,{ 
      method: 'POST', 
      cache: 'no-cache'
    })
    const test = await res.json()
  return (
    <section className="py-8">
      <div className="container mx-auto">
        <h2 className="text-center">All Bikes</h2>
        <p className="text-center mb-[30px]">
          The World's Prenium Brands In One Destination
        </p>
        <SwiperAll test={test}/>
      </div>
    </section>

 
  )
}
export default AllBikes
