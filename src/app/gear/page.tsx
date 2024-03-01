import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperTrends from '@/components/gear/SwiperTrends';
export const dynamic = 'force-dynamic'
const Gear = async () => {
  const res = await fetch(`${process.env.API_URL}/api/gear/getTrendingGear`,{ 
    method: 'POST', 
    cache: 'no-cache'
  });
  const gear = await res.json();

  return (
    <section className='py-8'>
      <div className='container mx-auto'>
        <h2 className='text-center'>Most Trending Gear</h2>
        <p className='text-center mb-[30px]'>
          The World's Prenium Brands In One Destination
        </p>
        <SwiperTrends gear={gear} />
        <Link href='/gear/all'>
          <button className='btn btn-accent mx-auto'>See all gear</button>
        </Link>
      </div>
    </section>
  );
};
export default Gear;
