'use client'

import { CartProvider as CProvider } from "use-shopping-cart";
//stripe information like the mode,language, success and error redirections, currency and informations to collect from customer 
const CartProvider = ({children}:any) => {
  return (
    <CProvider
        mode="payment"
        cartMode="client-only"
        stripe={process.env.NEXT_PUBLIC_STRIPE_KEY as string} 
        successUrl="http://ride-or-die.benjaminroche.fr/stripe/success"
        cancelUrl="http://ride-or-die.benjaminroche.fr/stripe/error"
        language="en-US"
        currency="EUR"
        billingAddressCollection={true}
        shouldPersist={true}
    >
    {children}
    </CProvider>
  )
}
export default CartProvider