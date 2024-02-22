
import Image from "next/image";
import AddToCartBtn from "@/components/AddToCartBtn";
import Link from "next/link";
import { Bike, Clock, PackageCheck,RefreshCw, ChevronLeft,} from 'lucide-react'
import { FaMotorcycle } from "react-icons/fa";
import BackButton from "@/components/BackButton";

const PiecesDetails = async ({params}:any) => {
    const res = await fetch('http://localhost:3000/api/pieces/getPiece',{
        method : "POST",
        body: JSON.stringify(params.id),
        headers: {
            'Content-Type': 'application/json',
          },
    })
    const piece = await res.json();
  return (
    <section className="pt-24 pb-32">
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-14">
          {/* img */}
          <div className="xl:flex-1 h-[460px] bg-primary/5 xl:w-[700px] xl:h-[540px] flex justify-center items-center">
            <Image
              src={piece[0].imageURL as string}
              width={473}
              height={290}
              priority
              alt=''
              />
          </div>
          {/* text */}
          <div className=" flex-1 flex flex-col justify-center items-start gap-10">
            <BackButton/>
            <div className="flex flex-col gap-6 items-start">
              <div>
                <h3>{piece[0].name}</h3>
                <p className="text-lg font-semibold">A partir de  {piece[0].price}€</p>
              </div>
              <p></p>
              <AddToCartBtn 
              text="Add to cart" 
              btnStyles="btn btn-accent"
              price_id={piece[0].price_id}
              name={piece[0].name}
              currency='EUR'
              description={piece[0].desc}
              images={piece[0].imageURL}
              price={piece[0].price}
              />
            </div>
            {/* info */}
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <PackageCheck size={20} className="text-accent"/>
                <p>Free shipping on orders over 130€</p>
              </div>
              <div className="flex gap-2">
                <RefreshCw size={20} className="text-accent"/>
                <p>Free return for 30 days</p>
              </div>
              <div className="flex gap-2">
                <FaMotorcycle size={20} className="text-accent"/>
                <p>The bikes are fully assembled and benefit from transport insurance</p>
              </div>
              <div className="flex gap-2">
                <Clock size={20} className="text-accent"/>
                <p>Fast delivery</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default PiecesDetails