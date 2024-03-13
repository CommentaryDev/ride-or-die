import { useSession } from "next-auth/react";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
export default async function Orders () {
    const session = await getServerSession(authOptions);
    const orders= await prisma.order.findMany({
        where: {
          user_id: session?.user?.email as string,
        }
      })
      console.log(orders)
  return (
    <div>Orders</div>
  )
}