'use client';

import AddToCartBtn from '../AddToCartBtn';
import Image from 'next/image';
import Link from 'next/link';
import { CgEye, CgShoppingBag } from 'react-icons/cg';

const GearCard = ({ gear }: any) => {
  return (
    <div className='group' key={gear.id}>
      <div className='border h-[328px] mb-5 p-4 overflow-hidden relative'>
        <div className='bg-primary/5 w-full h-full group-hover:bg-primary/10 transition-all duration-300 flex justify-center items-center'>
          {/*Render the image only if imageURL not empty*/}
          {gear.imageURL && (
            <Image src={gear.imageURL} width={240} height={147} alt='' />
          )}
        </div>
        {/* btn group */}
        <div className='absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center gap-[10px] opacity-0 group-hover:opacity-100 transition-all duration-300'>
          <AddToCartBtn
            price_id={gear.price_id}
            btnStyles='btn-icon btn-accent'
            icon={<CgShoppingBag />}
            name={gear.name}
            currency='USD'
            description={gear.description}
            images={gear.imageURL}
            price={gear.price}
          />
          <Link href={`/gear/${gear.id_product}`}>
            <button className='btn-icon btn-primary'>
              <CgEye />
            </button>
          </Link>
        </div>
      </div>
      <h4 className='mb-1'>{gear.name}</h4>
      <div className='text-lg font-bold text-accent'>
        A partir de {gear.price} €
      </div>
    </div>
  );
};
export default GearCard;
