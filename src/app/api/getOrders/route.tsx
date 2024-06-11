import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
        const body = await req.json();
        console.log(body);  
        try{
            const orders= await prisma.order.findMany({
                where: {
                    user_id: body,
                }
              })
              
        return NextResponse.json(orders);
    } catch (err) {
        console.error(err);
        return NextResponse.error();
      }
  
}