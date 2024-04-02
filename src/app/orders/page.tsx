import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Image from "next/image";
export const dynamic = 'force-dynamic'
export default async function Orders () {
    const session = await getServerSession(authOptions);
    const user = await prisma.user.findFirst({
        where: {
            email: session?.user?.email
        }
    })
    const orders= await prisma.order.findMany({
        where: {
          user_id: user?.id as string,
        }
      })
      return (
        <div className="container mx-auto p-4">
    {orders.length > 0 ? (
        await Promise.all(orders.map(async (order: any) => {
            const lines = await prisma.orderLine.findMany({
                where: {
                    id_order: order.id_order
                }
            });
            return (
                <div key={order.id_order} className="my-4 border border-gray-300 p-4">
                    <h1 className="text-xl font-bold mb-2">Order ID: {order.id_order}</h1>
                    <div className="grid grid-cols-3 gap-2">
                        {lines.map(async (line: any) => {
                            const product = await prisma.products.findFirst({
                                where: {
                                    price_id: line.stripe_id,
                                }
                            });
                            return (
                                <div key={line.id_orderline} className="border border-gray-200 p-2">
                                    <h2 className="text-lg font-semibold">{line.product_name}</h2>
                                    <p>Quantity: {line.quantity}</p>
                                    <p>Total: ${line.lineTotal}</p>
                                    {/*product && product.imageURL && (
                                        <Image src={product.imageURL} alt={line.product_name} className="w-full h-auto" />
                                    )*/}
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }))
    ) : (
        <h1 className="text-xl font-bold">No orders</h1>
    )}
</div>
      )
}