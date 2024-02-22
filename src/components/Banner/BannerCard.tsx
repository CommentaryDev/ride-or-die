'use client'

import AddToCartBtn from "../AddToCartBtn";
import Image from "next/image";
import Link from "next/link";
import { CgEye, CgShoppingBag } from 'react-icons/cg';

const BannerCard = ({id,name , desc, img, path}:any) => {
  return (
    <div className="group" key={id}>
        <div className="border h-[760px] mb-5 p-4 overflow-hidden relative">
            <div className="bg-primary/5 w-full h-full group-hover:bg-primary/10 transition-all duration-300 flex justify-center items-center">
                <Link href={path} >
                <Image 
                    src={img}
                    fill
                    alt=''
                />
                </Link>
            </div>
            {/* btn group */ }
            <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center gap-[10px] opacity-0 group-hover:opacity-100 transition-all duration-300">
                
                
            </div>
        </div>
        <div className="inline-flex space-between gap-4">
            <h4 className="mb-1">{name}</h4>
            <p className="mb-1">{desc}</p>
        </div>
        
    </div>
  )
}
export default BannerCard