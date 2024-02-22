'use client';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import PieceCard from './PieceCard';
const SwiperAll = ({ piece }: any) => {
  return (
    <div className='grid sm:grid-rows-1 md:grid-rows-2 grid-rows-4 grid-flow-col gap-4'>
      {piece.map((piece: any) => {
        return <PieceCard piece={piece} />;
      })}
    </div>
  );
};
export default SwiperAll;
