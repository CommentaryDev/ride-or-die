import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperAll from '@/components/gear/SwiperAll';
export const dynamic = 'force-dynamic'
const AllGear = async () => {
  const res = await fetch(`http://localhost:3000/api/gear/getAllGear`,{ 
    method: 'POST', 
    cache: 'no-cache'
  });
  const gear = await res.json();
  return (
    <section className='py-8'>
      <div className='container mx-auto'>
        <h2 className='text-center'>All Gear</h2>
        <p className='text-center mb-[30px]'>
          The World's Prenium Brands In One Destination
        </p>
        <SwiperAll gear={gear} />
      </div>
    </section>
  );
};
export default AllGear;
