'use client'
import {Pagination , Navigation} from 'swiper/modules'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Link from "next/link";
import { Swiper ,SwiperSlide } from 'swiper/react';
import BannerCard from '@/components/Banner/BannerCard';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router= useRouter()
  function handleClick(path: any) {
    router.push(path)
  }
 
  const items = [
    { id: "1", name: "Bikes" ,desc: "Bikes from all brands, all in one place. Get one now !",img:"/moto.png", path:"/bikes"},
    { id: "2", name: "Gear",desc: "Gear from all brands, all in one place. Get geared up now !",img:"/gear.jpg",path:"/gear"},
    { id: "3", name: "Pieces",desc: "Pieces for all brands, all in one place. Tune up your bike !",img:"/pieces.jpg",path:"/pieces"},
  ];
  return (
    <Swiper slidesPerView={1} spaceBetween={30} 
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className=''>
      {items.map((item : any) => {
        return <SwiperSlide key={item.id} onClick={()=> handleClick(item.path)}>
         <BannerCard id={item.id} name={item.name} desc = {item.desc} img={item.img} path={item.path} />
        </SwiperSlide>
      })}
    </Swiper>
  );
}
