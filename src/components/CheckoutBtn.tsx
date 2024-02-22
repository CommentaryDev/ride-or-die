import { useShoppingCart } from "use-shopping-cart";
//Component the displays a checkout button and take care of taking the customer to the stripe checkout page using redirectToCheckout stripe function
const CheckoutBtn = () => {
  const { redirectToCheckout } = useShoppingCart();
  const handleCheckout = async () => {
    try {
      const res = await redirectToCheckout();
      if (res?.error) {
        console.log("theres", res);
      }
    } catch (error) {
      console.log("err", error);
    }
  };
  
  return (
    <button className="btn btn-primary w-full" onClick={handleCheckout}>
      Proceed to checkout
    </button>
  );
};
export default CheckoutBtn;
