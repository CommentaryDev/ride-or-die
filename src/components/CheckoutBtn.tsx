import { useShoppingCart } from "use-shopping-cart";
import { useSession } from "next-auth/react";
import prisma from "@/lib/prisma";
import { useRouter } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
export const dynamic = "force-dynamic";
//Component the displays a checkout button and take care of taking the customer to the stripe checkout page using redirectToCheckout stripe function
const CheckoutBtn = () => {
  const { cartDetails } = useShoppingCart();
  const { data: session } = useSession();
  const router = useRouter();
  
  const handleCheckout = async () => {
    //Return to login because not connected
    if (!session) {
      console.log("You're not connected");
      router.push(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signin`);
    }
    
    //else create stripe checkout using API
    try {
      console.log("cartDetailsBTN",cartDetails)
      const checkoutData = {
        cartDetails: cartDetails,
        email: session?.user?.email // assuming userEmail is the variable containing the user's email
      };
      
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_TEST_STRIPE_PUBLISHABLE_KEY as string
      );

      if (!stripe) throw new Error("Stripe failed to initialize.");
      const checkoutResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stripe/createCheckout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutData),
      });

      const { sessionId } = await checkoutResponse.json();
      const stripeError = await stripe.redirectToCheckout({ sessionId });

      if (stripeError) {
        console.error(stripeError);
      }
    } catch (error) {
      console.error(error);
    }
  };
  /*if(session?.user){
      const user= await prisma.user.findFirst({
      where: {
        email: session?.user?.email,
      }
    })
      if(session?.user?.email){
        try {
        const res = await redirectToCheckout({clientReferenceId: cusID});

        } catch (error) {
          console.log("err checkout", error);
        }
      }*/

  return (
    <button className="btn btn-primary w-full" onClick={handleCheckout}>
      Proceed to checkout
    </button>
  );
};
export default CheckoutBtn;
