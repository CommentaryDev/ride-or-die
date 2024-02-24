

import {Pagination} from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/pagination';
import Link from "next/link";
import { Swiper ,SwiperSlide } from 'swiper/react';
import SwiperTrends from '@/components/bikes/SwiperTrends';
export const dynamic = 'force-dynamic'
import { revalidatePath } from "next/cache";
export default async function Bikes()  {
  async function revalidateNumber() {
    "use server";
    revalidatePath("/bikes");
  }
    const res = await fetch('http://localhost:3000/api/bikes/getTrendingBikes',{ next: { revalidate: 30 } })
    const test = await res.json()
  return (
    <section className="py-8">
      <div className="container mx-auto">
        <h2 className="text-center">Most Trending Bikes</h2>
        <p className="text-center mb-[30px]">
          The World's Prenium Brands In One Destination
        </p>
        <form action={revalidateNumber}>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Invalidate cache</button>
        </form>
        <SwiperTrends test={test}/>
        <Link href='/bikes/all'>
          <button className="btn btn-accent mx-auto">See all bikes</button>
        </Link>
      </div>
    </section>

 
  )
}