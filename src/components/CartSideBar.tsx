'use client'

import { Sheet,SheetClose,SheetContent,SheetHeader,SheetTitle} from '../components/ui/sheet'
import { useShoppingCart } from 'use-shopping-cart'
import { ScrollArea } from './ui/scroll-area'
import CartItem from './CartItem'
import CheckoutBtn from './CheckoutBtn'
//The Cart Side Bar that permit the customer to see what he got in his bag
const CartSideBar = () => {
    const {cartCount ,cartDetails,shouldDisplayCart,handleCartClick,totalPrice} = useShoppingCart()
  return (
    //Using react state to set the Side bar open or not( using stripe functions)
    <Sheet open={shouldDisplayCart} onOpenChange={()=> handleCartClick()}>
        <SheetContent>
            <SheetHeader>
                <SheetTitle className='text-left mb-12'>
                    {/* Display the items number on top */}
                    My Shopping Cart({cartCount})
                </SheetTitle>
            </SheetHeader>
            <>
                {cartCount === 0 ? //displayed if there is 0 items in the bag, it will be hard to display items that aren't there would it?
                (<div className='flex flex-col items-center justify-center w-full h-[760px]'>
                    <h5 className='text-black/50'>Your cart is empty</h5>
                </div>
                ) : (
                    //maping over all the items and making it scrollable with ScrollArea component from MUI or shadcn
                <ScrollArea className='h-[70vh] xl:h-[74vh] pr-4 mb-4'>
                    {cartDetails && 
                    Object.entries(cartDetails).map(([key, item]):any => {
                    return <CartItem item={item} key={key}/>;
                })}
                </ScrollArea>
                )}
            </>
            {cartCount as number> 0 && ( //Calculate the total only if the number of items is greater than 0 otherwise the total of 0 isn't display (aesthetic purposes)
            <div>
                <div className='flex justify-between font-semibold'>
                    <div className='uppercase mb-5'>Total</div>
                    <div>{totalPrice}€</div>
                </div> 
                {/*Button that takes us to stripe checkout */}
                <CheckoutBtn />
            </div>)}
        </SheetContent>
    </Sheet>
  )
}
export default CartSideBar