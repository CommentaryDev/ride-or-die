import { useShoppingCart } from "use-shopping-cart";
import { useSession } from 'next-auth/react';
import prisma from "@/lib/prisma";
import { useRouter } from "next/navigation";
//Component the displays a checkout button and take care of taking the customer to the stripe checkout page using redirectToCheckout stripe function
const CheckoutBtn = () => {
  const { redirectToCheckout } = useShoppingCart();
  const { data: session } = useSession();
  const router = useRouter();
  const handleCheckout = async () => {
    if(!session){
      console.log("You're not connected")
      router.push("https://ride-or-die.benjaminroche.fr/api/auth/signin");
    }
    /*if(session?.user){
      const user= await prisma.user.findFirst({
      where: {
        email: session?.user?.email,
      }
    })*/
      if(session?.user?.email){
        try {
        const res = await redirectToCheckout("cus_PgptKJDyQAzLkl");

        } catch (error) {
          console.log("err checkout", error);
        }
      }
  };
  
  return (
    <button className="btn btn-primary w-full" onClick={handleCheckout}>
      Proceed to checkout
    </button>
  );
};
export default CheckoutBtn;
