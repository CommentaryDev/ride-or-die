'use client';

import AddToCartBtn from '../AddToCartBtn';
import Image from 'next/image';
import Link from 'next/link';
import { CgEye, CgShoppingBag } from 'react-icons/cg';
export const dynamic = 'force-dynamic'
const BikeCard = ({ bike }: any) => {
  return (
    <div className='group' key={bike.id}>
      <div className='border h-[328px] mb-5 p-4 overflow-hidden relative'>
        <div className='bg-primary/5 w-full h-full group-hover:bg-primary/10 transition-all duration-300 flex justify-center items-center'>
          {/*Render the image only if imageURL not empty*/}
          {bike.imageURL && (
            <Image src={bike.imageURL} width={240} height={147} alt='' />
          )}
        </div>
        {/* btn group */}
        <div className='absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center gap-[10px] opacity-0 group-hover:opacity-100 transition-all duration-300'>
          <AddToCartBtn
            price_id={bike.price_id}
            btnStyles='btn-icon btn-accent'
            icon={<CgShoppingBag />}
            name={bike.name}
            currency='USD'
            description={bike.desc}
            images={bike.imageURL}
            price={bike.price}
          />
          <Link href={`/bikes/${bike.id_product}`}>
            <button className='btn-icon btn-primary'>
              <CgEye />
            </button>
          </Link>
        </div>
      </div>
      <h4 className='mb-1'>{bike.name}</h4>
      <div className='text-lg font-bold text-accent'>
        A partir de {bike.price} €
      </div>
    </div>
  );
};
export default BikeCard;
