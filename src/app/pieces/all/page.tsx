import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperAll from '@/components/pieces/SwiperAll';
export const dynamic = 'force-dynamic'
const AllPieces = async () => {
  const res = await fetch(`${process.env.API_URL}/api/pieces/getAllPieces`,{ 
    method: 'POST', 
    cache: 'no-cache'
  });
  const piece = await res.json();
  return (
    <section className='py-8'>
      <div className='container mx-auto'>
        <h2 className='text-center'>All Pieces</h2>
        <p className='text-center mb-[30px]'>
          The World's Prenium Brands In One Destination
        </p>
        <SwiperAll piece={piece} />
      </div>
    </section>
  );
};
export default AllPieces;
