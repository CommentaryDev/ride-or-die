

import {Pagination} from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/pagination';
import Link from "next/link";
import { Swiper ,SwiperSlide } from 'swiper/react';
import SwiperTrends from '@/components/bikes/SwiperTrends';
import { useRouter } from 'next/navigation';
export const dynamic = 'force-dynamic'
export default async function Bikes()  {
    const res = await fetch('http://localhost:3000/api/bikes/getTrendingBikes',{ cache: 'force-cache' });
    const test = await res.json();
  return (
    <section className="py-8">
      <div className="container mx-auto">
        <h2 className="text-center">Most Trending Bikes</h2>
        <p className="text-center mb-[30px]">
          The World's Prenium Brands In One Destination
        </p>
        <SwiperTrends test={test}/>
        <Link href='/bikes/all'>
          <button className="btn btn-accent mx-auto">See all bikes</button>
        </Link>
      </div>
    </section>

 
  )
}