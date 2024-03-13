'use client';
import { BsSearch } from 'react-icons/bs';
import { ImCart } from 'react-icons/im';
import { FiMenu } from 'react-icons/fi';
import Link from 'next/link';
import { CgShoppingBag } from 'react-icons/cg';
import CartSideBar from './CartSideBar';
import { useShoppingCart } from 'use-shopping-cart';

import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '../components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { useSession } from 'next-auth/react';
export default function Navbar() {
  const { data: session, status } = useSession();
  const links = [
    { id: '1', name: 'Home', href: '/' },
    { id: '2', name: 'Bikes', href: '/bikes' },
    { id: '3', name: 'Pieces', href: '/pieces' },
    { id: '4', name: 'Gear', href: '/gear' },
    { id: '5', name: 'Take care of your bike', href: '/maintenance' },
  ];
  const { cartCount, handleCartClick } = useShoppingCart();
  return (
    <div className='w-full h-12 lg:h-24 border-b-[1px] border-gray-500 text-black lg:text-white bg-[#6D6D64] shadow-lg sticky top-0 py-8 z-40'>
      <div className='max-w-screen-2xl h-full mx-auto px-4 flex items-center justify-between'>
        <Link href='/'>
          <h1 className='text-2xl uppercase font-bold'>Ride Or Die</h1>
        </Link>
        <ul className='hidden lg:inline-flex items-center gap-8 uppercase text-lg font-semibold'>
          {/* Mapping over the links const */}
          {links.map((link) => (
            <li key={link.id} className='navbarLi'>
              <Link key={link.id} href={link.href} className=''>
                {link.name}
              </Link>
            </li>
          ))}
          {/* Search component that pops a window to input*/}
          <div className='hidden lg:inline-flex gap-8 items-center'>
            <Dialog>
              <DialogTrigger asChild>
                {/*<BsSearch className="text-xl hover:text-hoverColor cursor-pointer" />*/}
              </DialogTrigger>
              <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader></DialogHeader>
                <div className='grid gap-4 py-4'>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Input
                      id='search'
                      placeholder='Search...'
                      className='col-span-3'
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type='submit'>Search</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </ul>

        <div className='flex items-center justify-between gap-4'>
          {/* Cart component to display current number of items in the bag and display the cart onClick */}
          <div
            onClick={() => handleCartClick()}
            className='relative cursor-pointer'
          >
            <CgShoppingBag className='text-[26px]' />
            <div className='bg-accent w-[18px] h-[18px] absolute -right-1 -bottom-1 rounded-full text-white flex items-center justify-center text-sm font-medium'>
              {cartCount}
            </div>
          </div>
          {/* Avatar icon that display menu onClick */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src='https://www.moto-net.com/image/22071' />
                <AvatarFallback>IG</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {session ? (
              <>
              <DropdownMenuItem>
                 <Link href='/orders'>Check orders</Link>
               </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href='/api/auth/signout'>Se Déconnecter</Link>
                </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem>
                  <Link href='/api/auth/signin'>Se Connecter</Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className='inline-flex lg:hidden'>
            <FiMenu className='text-3xl' />
          </div>
        </div>
        {/* important component to display the shopping cart( triggered by clicking the cart icon)*/}
        <CartSideBar />
      </div>
    </div>
  );
}
