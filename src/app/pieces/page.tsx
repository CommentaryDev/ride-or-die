

import {Pagination} from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/pagination';
import Link from "next/link";
import { Swiper ,SwiperSlide } from 'swiper/react';
import SwiperTrends from '@/components/pieces/SwiperTrends';

const Pieces = async () => {
    const res = await fetch('http://localhost:3000/api/pieces/getTrendingPieces')
    const piece = await res.json()
  return (
    <section className="py-8">
      <div className="container mx-auto">
        <h2 className="text-center">Most Trending Pieces</h2>
        <p className="text-center mb-[30px]">
          The World's Prenium Brands In One Destination
        </p>
        <SwiperTrends piece={piece}/>
        <Link href='/pieces/all'>
          <button className="btn btn-accent mx-auto">See all pieces</button>
        </Link>
      </div>
    </section>

 
  )
}
export default Pieces
